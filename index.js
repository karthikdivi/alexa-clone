const Datastore = require('@google-cloud/datastore');
const datastore = Datastore();

function record(req, res) {
  if (req.query && req.query.domain) {
    var domain = req.query.domain;
    var key = datastore.key(['alexa', domain]);
    datastore.get(key, function(err, doc) {
      if (err) {
        console.log(err);
        res.send(err)
      }
      console.log(doc);
      if (doc) {
        doc.count = doc.count + 1;
        datastore.save({ key: key, data: doc });
      } else {
        doc = {
          count: 1,
          domain: domain
        }
        datastore.save({ key: key, data: doc });
      }
      res.send(doc);
    });
  } else {
    res.send('Invalid request, Please provide domain in query param')
  }
}

function retrive(req, res) {
  if (req.query && req.query.domain) {
    var domain = req.query.domain;
    var key = datastore.key(['alexa', domain]);
    datastore.get(key, function(err, doc) {
      if (err) {
        res.status(500).send(err);
      }
      res.send(doc);
    });
  } else {
    res.send('Invalid request, Please provide domain in query param');
  }
}

function top(req, res) {
  var query = datastore.createQuery('alexa').order('count', { descending: true });
  datastore.runQuery(query).then(function(results) {
    res.send(results);
  });
}

exports.record = record;
exports.retrive = retrive;
exports.top = top;
