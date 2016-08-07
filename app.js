var express = require('express');
var nunjucks = require('nunjucks');
var app = express();

var PORT = process.env.PORT || 3000;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

var imageSearchRouter = require('./routes/imageSearchRoute')();
app.use('/', imageSearchRouter);

app.listen(PORT, function (err) {
    if (err) {
        console.log(err);
    }

    console.log('Server is running on port ' + PORT);
});

//TODO:
//1. Return json file based on Template example.
//2. Save query string to MongoDB.
//3. Create MongoDB at mLab.
//4. Deploy to Heroku.
