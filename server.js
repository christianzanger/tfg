const express = require('express');
const app = express();

// Configure static assets for classic mode
app.use("/assets", express.static(__dirname + '/public/assets'));
app.use("/app", express.static(__dirname + '/src/app'));
app.use("/", express.static(__dirname + '/classic'));


app.listen(process.env.PORT || 3000, function(req, res){
    console.log('App listening on port ' + (process.env.PORT || 3000));
});