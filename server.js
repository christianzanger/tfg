const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const generation = require('./generation');

// Configure static assets for classic mode
// TODO: refactor /assets to /images
app.use("/assets", express.static(__dirname + '/public/assets'));
app.use("/images", express.static(__dirname + '/images/searches'));
app.use("/app", express.static(__dirname + '/src/app'));

app.get('/search', (req, res) => {
    generation(req.query.q);
    res.sendFile(__dirname + '/classic/search.html');
});

app.get('/statistics', (req, res) => {
    res.sendFile(__dirname + '/classic/statistics.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/classic/index.html');
});



app.listen(port, function(req, res){
    console.log('App listening on port ' + port);
});