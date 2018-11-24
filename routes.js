const mysql = require('mysql');
const generation = require('./src/app/generation');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'tfg'
});

module.exports = (app, currentSessionsBuffer, fs) => {
    function handleImages(req, res) {
        const imagePath = `${__dirname}/public/${req.originalUrl}`;

        if (req.method === "HEAD") {
            if (!fs.existsSync(imagePath)) {
                res.sendStatus(202);
            } else {
                res.sendStatus(200);
            }
        } else {
            res.sendFile(imagePath);
        }
    }

    const cachedImage = (req, res) => {
        res.setHeader('Cache-Control', 'max-age=259200');
        req.originalUrl = req.originalUrl.replace("/cached", "");
        handleImages(req, res);
    };

    const image = (req, res) =>  {
        res.setHeader('Cache-Control', 'no-cache, no-store');
        handleImages(req, res);
    };

    const cachedAsset = (req, res) => {
        const fileLocation = req.originalUrl.replace('/cached', '');
        res.setHeader('Cache-Control', 'max-age=259200');
        res.sendFile(`${__dirname}/public/${fileLocation}`);
    };

    const asset = (req, res) => {
        res.setHeader('Cache-Control', 'no-cache, no-store');
        res.sendFile(`${__dirname}/public/${req.originalUrl}`)
    };

    const search = (req, res) => {

        if (!fs.existsSync(`${__dirname}/public/images/searches/${encodeURIComponent(req.query.q)}/`)) {
            generation(req.query.q, res, (res) => {
                if (!fs.existsSync(`${__dirname}/public/images/searches/${encodeURIComponent(req.query.q)}/`)) {
                    // No results found for this keyword
                    res.sendFile(`${__dirname}/public/pages/search404.html`);
                } else {
                    res.sendFile(`${__dirname}/public/pages/react/searchReact.html`);
                }
            });
        } else {
            res.sendFile(__dirname + '/public/pages/react/searchReact.html');
        }
    };

    const statsReset = (req, res) => {
        const currentID = JSON.parse(req.cookies.stats).uid;

        currentSessionsBuffer[currentID] = {
            images: 0
        };

        connection.query(`DELETE FROM user_history WHERE user_id = "${currentID}"`,
            (error) => {
                if (error) {
                    console.log(error);
                } else {
                    res.sendStatus(200);
                }
            }
        );
    };

    const history = (req, res) => {
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
    };

    const getPageFromURL = url => {
        if (url.includes("stats")) return "Statistics";
        if (url.includes("settings")) return "Settings";
        if (url.includes("search")) return `Search: ${url.substring(url.indexOf('=') + 1)}`;
        return "Home";
    };

    const saveHistory = (req, res) => {
        const stats = JSON.parse(req.cookies.stats);
        const settings = JSON.parse(req.cookies.settings);
        const page = getPageFromURL(req.body.page);

        connection.query(
            `INSERT INTO user_history (user_id, avg_load_time, loads, images, bytes, bytesSavedByCompression, bytesSavedByCache, page) VALUES
        ("${stats.uid}", ${stats.averageLoadTime}, ${stats.numberOfLoads}, ${stats.images}, ${stats.bytes}, ${stats.bytesSavedByCompression}, ${stats.bytesSavedByCache}, "${decodeURIComponent(page)}")`,
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
    };

    const home = (req, res) => {
        res.sendFile(`${__dirname}/public/pages/react/indexReact.html`);
    };

    const _404 = (req, res) => {
        console.log(`404: ${req.originalUrl}`);
        res.status(404).send("Sorry can't find that!")
    };

    /* ASSETS */
    app.get('/cached/images/*', cachedImage);
    app.get('/cached/*', cachedAsset);
    app.get('/images/*', image);
    app.get('/pages/*', asset);
    app.get('/scripts/*', asset);
    app.get('/styles/*', asset);
    /* ROUTES */
    app.get('/search', search);
    app.get('/stats/reset', statsReset);
    app.get('/history', history);
    app.post('/savehistory', saveHistory);
    app.get('/', home);
    app.use(_404);
};