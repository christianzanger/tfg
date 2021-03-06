const https = require('https');
const fs = require('fs');
const key = fs.readFileSync('./secret/unsplash', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    return data.replace("\n", 'n');
});
const URL = `https://api.unsplash.com/search/photos?client_id=${key}&per_page=12&orientation=landscape&query=`.replace("\n", '');

/**
 * @param q search keyword
 * @param ClientRes Response for the client, not from any of the APIs
 * @param callback callback to decide which file to send if the keywords didn't show any results
 */
module.exports = (q, ClientRes, callback) => {
    https.get(URL + q, (res) => {
        let data = '';

        // A chunk of data has been received.
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const responseObj = JSON.parse(data);

            if (responseObj.total > 0) {
                fs.mkdir(`${__basedir}/public/images/searches/${encodeURIComponent(q)}`, (err) => {
                    if (err) return console.log(err);
                });

                responseObj.results.forEach((image, index) => {
                    // Get thumbnail image
                    https.get(image.urls.small, (res) => {
                        let data = '';
                        res.setEncoding('binary');

                        // A chunk of data has been received.
                        res.on('data', (chunk) => {
                            data += chunk;
                        });

                        res.on('end', () => {
                            fs.writeFile(`${__basedir}/public/images/searches/${encodeURIComponent(q)}/${index}.png`, data, 'binary', (err) => {
                                if(err) return console.log(err);
                            });
                        });
                    });
                });
            }

            callback(ClientRes);
        });
    }).on('error', (err) => {
        console.log("Unsplash API error: " + err.message);
    });
};