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
  join paper in $1 on prof.paperID equals paper.paperID \
  select [prof.profID, prof.Name, paper.paperTitle]  \
  ';

  ViewDef.find({$or : [{viewname: "Prof"},{viewname: "Paper"}]}, function(err, docs) {
    // expectedresult = ' <http://profs.test/p1> Kitagawa KDE . <http://profs.test/p2> Amagasa KDE ';

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

