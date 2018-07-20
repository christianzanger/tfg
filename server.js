const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require('fs');
const mysql = require('mysql');
const compression = require('compression');
const generation = require('./src/app/generation');

const app = express();
const port = process.env.PORT || 3000;
const currentSessionsBuffer = {};
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'tfg'
});

// For root directory referencing
global.__basedir = __dirname;

// ------------- MIDDLEWARE -------------
// Disallow robots.txt (Express has a weird behavior where robots.txt assigns a new userSessionID)
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

// Middleware needs to be created after static files, or it will get called for each of the static files
app.use(cookieParser());
app.use(session({
    secret: 'thisisaveryrandomandtotallynotobviousstring',
    resave: false,
    saveUninitialized: true
}));

// Used for server-tracking stats like file sizes.
app.use((req, res, next) => {
    const session = req.cookies.stats && JSON.parse(req.cookies.stats);
    if (req.method !== "HEAD" && session && !currentSessionsBuffer.hasOwnProperty(session.uid)) {
        currentSessionsBuffer[session.uid] = {
            images: {
                numberOfImages: 0,
                downloadedBytes: 0
            }
        }
    }
    next();
});

// Used to initialize the stats cookie
app.use((req, res, next) => {
    if (!req.cookies.stats) {
        res.cookie("stats", JSON.stringify({
            uid: req.sessionID,
            averageLoadTime: 0,
            numberOfLoads: 0,
            images: {
                numberOfImages: 0,
                downloadedBytes: 0
            }
        }));
    }
    next();
});

app.use(compression({
    filter: (req) => {
        return req.cookies.settings ? JSON.parse(req.cookies.settings).settings.compression : false;
    }
}));

// ------------- STATIC ROUTES -------------
app.get('/public/*', (req, res) => {
    res.sendFile(`${__dirname}${req.originalUrl}`)
});

app.get('/images/*', (req, res) => {
    const imagePath = `${__dirname}/public/${req.originalUrl}`;

    if (req.method !== "HEAD") {
        const session = JSON.parse(req.cookies.stats);
        const sessionBuffer = currentSessionsBuffer[session.uid];
        sessionBuffer.images.numberOfImages++;
        sessionBuffer.images.downloadedBytes += fs.statSync(imagePath).size;
        console.log(sessionBuffer.images.numberOfImages);
    }
    res.sendFile(imagePath);
});

app.get('/pages/*', (req, res) => {
    res.sendFile(`${__dirname}/public/${req.originalUrl}`)
});

app.get('/scripts/*', (req, res) => {
    res.sendFile(`${__dirname}/public/${req.originalUrl}`)
});

app.get('/styles/*', (req, res) => {
    res.sendFile(`${__dirname}/public/${req.originalUrl}`)
});

// ------------- ROUTES -------------
app.get('/search', (req, res) => {
    if (!fs.existsSync(`${__dirname}/public/images/searches/${req.query.q}/`)) {
        generation(req.query.q, res, (res) => {
            if (!fs.existsSync(`${__dirname}/public/images/searches/${req.query.q}/`)) {
                // No results found for this keyword
                res.sendFile(`${__dirname}/public/pages/search404.html`);
            } else {
                res.sendFile(`${__dirname}/public/pages/search.html`);
            }
        });
    } else {
        res.sendFile(__dirname + '/public/pages/search.html');
    }
});

app.get('/sync', (req, res) => {
    const session = JSON.parse(req.cookies.stats);
    const sessionBuffer = currentSessionsBuffer[session.uid];
    currentSessionsBuffer
    res.type('json');
    res.send(JSON.stringify(sessionBuffer));
});

app.get('/stats/reset', (req, res) => {
    const currentID = JSON.parse(req.cookies.stats).uid;

    currentSessionsBuffer[currentID] = {
        images: {
            numberOfImages: 0,
            downloadedBytes: 0
        }
    };

    res.cookie('stats', JSON.stringify({
       uid: currentID,
       averageLoadTime: 0,
       numberOfLoads: 0,
       images: {
           numberOfImages: 0,
           downloadedBytes: 0
       }
    })).send();
});

app.post('/savehistory', (req, res) => {
    const session = JSON.parse(req.cookies.stats);
    const settings = JSON.parse(req.cookies.settings);
    const sessionImages = currentSessionsBuffer[session.uid];

    connection.query(
        `INSERT INTO user_history (user_id, avg_load_time, loads, images, bytes, compression) VALUES
        ("${req.sessionID}", ${session.averageLoadTime}, ${session.numberOfLoads}, ${sessionImages.images.numberOfImages}, ${sessionImages.images.downloadedBytes}, ${settings.settings.compression})`,
        (error, rows, fields) => {
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(200);
            }
        }
    );
});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/index.html`);
});

app.listen(port, () => {
    console.log('App listening on port ' + port);
});

app.use((req, res) => {
    console.log(`404: ${req.originalUrl}`);
    res.status(404).send("Sorry can't find that!")
});