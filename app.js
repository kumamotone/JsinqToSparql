// jsinq をロード
require('./jsinq');
require('./jsinq-query');
var mongoose = require('mongoose');
// デバッグコード

var ViewDef = mongoose.model('viewdef', { 
  viewname: String,
    sparql: String,
    jsonschema: Object,
    endpoint: String
});

mongoose.connect('mongodb://localhost/');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

  // LINQコード
  var querystr = ' \
  from p in $0 \
  join f in $1  \
  on p.prdctFt equals f.ft \
  select [p.prdctlbl, f.ftlbl]  \
  ';

    ViewDef.find({$or : [{viewname: "Product"}, {viewname: "Feature"}]}, function(err, docs) {
    console.log("LINQ Query:" + querystr);
    var query = new jsinq.Query(querystr);

    query.executeQuery(query, docs,
    function (values) {
      console.log("Results:");
      for (var key in values) {
        console.log(key + ': ' + values[key]);
      }
    });
  db.close();
  // console.log(query.getQueryFunction().toString());
  });
});

