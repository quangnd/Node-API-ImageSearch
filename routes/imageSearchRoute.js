var express = require('express');
var request = require('request');
var imageSearchRouter = express.Router();
var searchApi = require('../api/searchApi');
var client = searchApi(process.env.GOOGLE_CX, process.env.GOOGLE_API_KEY);

var router = function () {
    imageSearchRouter.route('/')
        .get(function (req, res) {
            res.render('index.html', { url: req.protocol + '://' + req.get('host') });
        });
    imageSearchRouter.route('/api/imagesearch')
        .get(function (req, res) {
            res.send('You must enter a query paramter');
        });

    imageSearchRouter.route('/api/imagesearch/:queryString')
        .get(function (req, res) {
            var query = req.params.queryString;
            var appUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
            var apiUrl = '';
            if (getParameterByName('offset', appUrl) === ''
                || getParameterByName('offset', appUrl) === null) {
                apiUrl = client.buildUrl(query);
            } else {
                apiUrl = client.buildUrl(query, getParameterByName('offset', appUrl));
            }
            console.log(apiUrl);

            var options = { uri: apiUrl, json: true };
            request(options, function (err, res, body) {
                if (err) {
                    console.log(err);
                }

                if (!err && res.statusCode === 200) {
                    cbDisplayJSON(body);
                }

            });

            function cbDisplayJSON(body) {
                res.send(body);
            }
        });


    return imageSearchRouter;
};

function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

module.exports = router;
