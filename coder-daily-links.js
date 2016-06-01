var Express = require('express');
var Webtask = require('webtask-tools');
var app = Express();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

app.use(require('body-parser').json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
});

function handleError(res, err) {
  console.log(err);
  return res.json({
    error: true,
  });
}

app.get('/', (req, res, next) => {
  var topicId = req.query.topicId;

  if (!ObjectID.isValid(topicId)) {
    return handleError(res, 'non valid object id on topic id parameter: ', topicId);
  }

  MongoClient.connect(req.webtaskContext.data.MONGO_URL, function (connectErr, db) {
    if(connectErr){
        return handleError(res, connectErr);
    }

    db.collection('links').find({
      topicId: new ObjectID(topicId),
    }, (queryErr, result) => {
      if (queryErr){
        return handleError(res, queryErr);
      }

      result.toArray((toArrayErr, links) => {
        if (toArrayErr) {
          return handleError(res, toArrayErr);
        }

        return res.json(links);
      });
    });
  });
});

module.exports = Webtask.fromExpress(app);