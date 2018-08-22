const app = require('express')();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require('fs');
const mysql = require('mysql');
const compression = require('compression');
const generation = require('./src/app/generation');

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

// ------------------------------------------- MIDDLEWARE -------------------------------------------
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

// Used for server-tracking stats like file sizes. This initializes a buffer that gets consulted later by /sync
app.use((req, res, next) => {
    const session = req.cookies.stats && JSON.parse(req.cookies.stats);
    if (req.method !== "HEAD" && session && !currentSessionsBuffer.hasOwnProperty(session.uid)) {
        currentSessionsBuffer[session.uid] = {
            images: 0
        }
    }
    next();
});

// Used to initialize the stats cookie
app.use((req, res, next) => {
    if (!req.cookies.stats) {
        console.log("No stats cookie: " + req.originalUrl);
        res.cookie("stats", JSON.stringify({
            uid: req.sessionID,
            averageLoadTime: 0,
            numberOfLoads: 0,
            images: 0,
            bytes: 0,
            bytesSavedByCompression: 0,
            bytesSavedByCache: 0,
            filesSavedByCache: 0
        }));
    }
    next();
});

// Used to initialize the settings cookie
app.use((req, res, next) => {
    if (!req.cookies.settings) {
        res.cookie("settings", JSON.stringify({
            cache: false,
            compression: false
        }));
    }
    next();
});

app.use(compression({
    threshold: 0,
    filter: (req) => {
        return req.cookies.settings ? JSON.parse(req.cookies.settings).compression : false;
    },
    level: 9
}));

function handleImages(req, res) {
    const imagePath = `${__dirname}/public/${req.originalUrl}`;

    if (req.method === "HEAD") {
        if (!fs.existsSync(imagePath)) {
            res.sendStatus(202);
        } else {
            res.sendStatus(200);
        }
    } else {
        const session = JSON.parse(req.cookies.stats);
        const sessionBuffer = currentSessionsBuffer[session.uid];

        sessionBuffer.images++;

        res.sendFile(imagePath);
    }
}

// ------------------------------------------- "STATIC" ROUTES -------------------------------------------
app.get('/cached/images/*', (req, res) => {
    res.setHeader('Cache-Control', 'max-age=259200');
    req.originalUrl = req.originalUrl.replace("/cached", "");
    handleImages(req, res);
});

app.get('/cached/*', (req, res) => {
   const fileLocation = req.originalUrl.replace('/cached', '');
   res.setHeader('Cache-Control', 'max-age=259200');
   res.sendFile(`${__dirname}/public/${fileLocation}`);
});

app.get('/public/*', (req, res) => {
    res.sendFile(`${__dirname}${req.originalUrl}`)
});

app.get('/images/*', (req, res) =>  {
    res.setHeader('Cache-Control', 'no-cache, no-store');
    handleImages(req, res);
});

app.get('/pages/*', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.sendFile(`${__dirname}/public/${req.originalUrl}`)
});

app.get('/scripts/*', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.sendFile(`${__dirname}/public/${req.originalUrl}`)
});

app.get('/styles/*', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.sendFile(`${__dirname}/public/${req.originalUrl}`)
});

// ------------------------------------------- ROUTES -------------------------------------------
app.get('/search', (req, res) => {
    if (!fs.existsSync(`${__dirname}/public/images/searches/${req.query.q}/`)) {
        generation(req.query.q, res, (res) => {
            if (!fs.existsSync(`${__dirname}/public/images/searches/${req.query.q}/`)) {
                // No results found for this keyword
                res.sendFile(`${__dirname}/public/pages/search404.html`);
            } else {
                res.sendFile(`${__dirname}/public/pages/react/searchReact.html`);
            }
        });
    } else {
        res.sendFile(__dirname + '/public/pages/react/searchReact.html');
    }
});

app.get('/stats/reset', (req, res) => {
    const currentID = JSON.parse(req.cookies.stats).uid;

    currentSessionsBuffer[currentID] = {
        images: 0
    };

    connection.query(`DELETE FROM user_history WHERE user_id = "${currentID}"`,
        (error, rows, fields) => {
            if (error) {
                console.log(error);
            }
        }
    );

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

app.get('/history', (req, res) => {
    const sessionId = JSON.parse(req.cookies.stats).uid;
    const stats = JSON.parse(req.cookies.stats);
    res.type("JSON");

    connection.query(`SELECT * FROM user_history WHERE user_id = "${sessionId}"`,
        (error, rows, fields) => {
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                stats.images = currentSessionsBuffer[stats.uid].images;
                res.cookie("stats", JSON.stringify(stats));
                res.send(rows);
            }
        }
    );
});

app.post('/savehistory', (req, res) => {
    const stats = JSON.parse(req.cookies.stats);
    // console.log(session);
    const settings = JSON.parse(req.cookies.settings);

    connection.query(
        `INSERT INTO user_history (user_id, avg_load_time, loads, images, bytes, bytesSavedByCompression, bytesSavedByCache) VALUES
        ("${stats.uid}", ${stats.averageLoadTime}, ${stats.numberOfLoads}, ${currentSessionsBuffer[stats.uid].images}, ${stats.bytes}, ${stats.bytesSavedByCompression}, ${stats.bytesSavedByCache})`,
        (error, rows) => {
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                connection.query(`INSERT INTO user_settings (history_id, compression, cache, user_id) VALUES
                    (${rows.insertId}, ${settings ? settings.compression : 0}, ${settings ? settings.cache : 0}, "${stats.uid}")`,
                    error => {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.sendStatus(200);
                        }
                    }
                );
            }
        }
    );
});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/pages/react/indexReact.html`);
});

app.listen(port, () => {
    console.log('App listening on port ' + port);
});

app.use((req, res) => {
    console.log(`404: ${req.originalUrl}`);
    res.status(404).send("Sorry can't find that!")
});