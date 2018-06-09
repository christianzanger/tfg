const express = require('express');
const generation = require('./generation');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
const defaultSessionStats = {
    averageLoadTime: 0,
    numberOfLoads: 0,
    images: {
        numberOfImages: 0,
        downloadedBytes: 0
    }
};

const currentSessions = {};

app.use(cookieParser());
app.use(session({
    secret: 'patatadelapatatadelapatata',
}));

// TODO: refactor /assets to /images
app.use("/assets", express.static(__dirname + '/public/assets'));
app.use("/app", express.static(__dirname + '/src/app'));


app.get('/search', (req, res) => {
    if (!fs.existsSync(`${__dirname}/images/searches/${req.query.q}/`)) {
        generation(req.query.q);
    }
    res.sendFile(__dirname + '/classic/search.html');
});

app.use((req, res, next) => {
    // console.log(req.sessionID);
    if (currentSessions.hasOwnProperty(req.sessionID)) {
        console.log(currentSessions);
    } else {
        currentSessions[req.sessionID] = {}
    }
    next();
});

/**
 * Called multiple times for every /search.
 */
app.get('/images/:location/:id', (req, res) => {
    const statsCookie = JSON.parse(req.cookies.stats);
    const imagePath = `${__dirname}/images/searches/${req.params.location}/${req.params.id}`;

    statsCookie.images.numberOfImages++;
    statsCookie.images.downloadedBytes += fs.statSync(imagePath).size;

    res.cookie("stats", JSON.stringify(statsCookie)).sendFile(imagePath);
});

app.get('/statistics', (req, res) => {
    res.sendFile(__dirname + '/classic/statistics.html');
});

app.get('/', (req, res) => {
    // console.log(req.cookies.stats);
    if (!req.cookies.stats) {
        res.cookie("stats", JSON.stringify(defaultSessionStats)).sendFile(__dirname + '/classic/index.html');
    } else {
        res.sendFile(__dirname + '/classic/index.html');
    }
});

app.listen(port, function(req, res){
    console.log('App listening on port ' + port);
});

app.use(function (req, res) {
    console.log(`404: ${req.originalUrl}`);
    res.status(404).send("Sorry can't find that!")
});