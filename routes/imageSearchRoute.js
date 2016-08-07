var express = require('express');
var request = require('request');
var mongodb = require('mongodb').MongoClient;
var imageSearchRouter = express.Router();
var searchApi = require('../api/searchApi');
var commonFuncs = require('../utilities/commons');

var client = searchApi(process.env.GOOGLE_CX, process.env.GOOGLE_API_KEY);
var dbUrl = 'mongodb://localhost:27017/imageSearchAPI';

var router = function () {
    imageSearchRouter.route('/')
        .get(function (req, res) {
            res.render('index.html', { url: commonFuncs.getUrl(req) });
        });

    imageSearchRouter.route('/api/imagesearch')
        .get(function (req, res) {
            res.send('You must enter a query paramter');
        });

    imageSearchRouter.route('/api/imagesearch/latest')
        .get(function (req, res) {
            
            mongodb.connect(dbUrl, function (err, db) {
                if (err) {
                    console.log(err);
                }

                var collection = db.collection('queryTerm');
                collection.find().sort({ _id: -1 }).limit(10).toArray(function (err, results) {
                    if (results) {
                        var json = [];
                        results.map(function (result) {
                            json.push({
                                term: result.term,
                                when: result.when
                            });
                        });

                        res.send(json);
                        db.close();
                    }
                });
            });

        });

    imageSearchRouter.route('/api/imagesearch/:queryString')
        .get(function (req, res) {
            var query = req.params.queryString;
            var appUrl = commonFuncs.getAppUrl(req);
            var apiUrl = '';
            if (commonFuncs.getParameterByName('offset', appUrl) === ''
                || commonFuncs.getParameterByName('offset', appUrl) === null) {
                apiUrl = client.buildUrl(query);
            } else {
                apiUrl = client.buildUrl(query, commonFuncs.getParameterByName('offset', appUrl));
            }
            //console.log(apiUrl);

            var options = { uri: apiUrl, json: true };
            request(options, function (err, res, body) {
                if (err) {
                    console.log(err);
                }

                if (res.statusCode === 200) {
                    cbDisplayJSON(body);

                    mongodb.connect(dbUrl, function (err, db) {
                        if (err) {
                            console.log(err);
                        }

                        var collection = db.collection('queryTerm');
                        var queryData = {
                            term: query,
                            when: commonFuncs.buildDateTime(),
                        };
                        collection.insert(queryData, function (err, result) {
                            if (err) {
                                console.log(err);
                            }

                            if (result) {
                                console.log(queryData);
                                db.close();
                            }
                        });
                    });
                }

            });

            function cbDisplayJSON(body) {
                var imgArr = [];
                body.items.map(function (item) {
                    imgArr.push({
                        url: item.link,
                        snippet: item.snippet,
                        thumbnail: item.image.thumbnailLink,
                        context: item.image.contextLink
                    });
                });
                res.send(imgArr);
            }
        });

    return imageSearchRouter;
};

module.exports = router;
