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
  from prof in $0 \
  join lab in $1  \
  on prof.labID equals lab.ID \
  join paper in $2 \
  on prof.paperID equals paper.ID \
  where lab.Name == "KDE" \
  select [prof.profID, prof.Name, lab.Name, paper.title]  \
  ';

    ViewDef.find({$or : [{viewname: "Prof"}, {viewname: "Lab"}, {viewname: "Paper"}]}, function(err, docs) {

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

