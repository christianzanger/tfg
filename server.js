const express = require('express');
const app = express();
const fs = require('fs');

const port = process.env.PORT || 3000;
const currentSessionsBuffer = {};

// For root directory referencing
global.__basedir = __dirname;

// Disallow robots.txt (Express has a weird behavior where robots.txt assigns a new userSessionID)
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});

require('./middleware')(app, currentSessionsBuffer, express);
require('./routes')(app, currentSessionsBuffer, fs);

app.listen(port, () => {
    console.log('App listening on port ' + port);
});