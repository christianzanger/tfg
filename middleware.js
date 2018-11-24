const cookieParser = require('cookie-parser');
const session = require('express-session');
const compression = require('compression');

module.exports = (app, currentSessionsBuffer, express) => {
    app.use(express.json());
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
                compression: false,
                tutorialStep: 1
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
};