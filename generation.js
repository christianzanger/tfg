const https = require('https');
const fs = require('fs');
const key = fs.readFileSync('./secret/unsplash', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    return data;
});
const URL = `https://api.unsplash.com/search/photos?client_id=${key}&per_page=12&query=`;
// TODO: remove debugging code
// console.log(`URL: ${URL}`);

module.exports = (q) => {
    fs.mkdir(`./images/searches/${q}`, (err) => {
        if (err) return console.log(err);
    });

    https.get(URL + q, (res) => {
        let data = '';

        // A chunk of data has been received.
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const responseObj = JSON.parse(data);
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
                        // console.log(`Image server ${index}: ${data.length}`);
                        fs.writeFile(`./images/searches/${q}/${index}.png`, data, 'binary', (err) => {
                            if(err) return console.log(err);
                        });
                    });
                });
            });
        });
    }).on('error', (err) => {
        console.log("Unsplash API error: " + err.message);
    });
};