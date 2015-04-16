// jsinq $B$r%m!<%I(B
require('./jsinq');
require('./jsinq-query');
var mongoose = require('mongoose');
// $B%G%P%C%0%3!<%I(B

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

  // LINQ$B%3!<%I(B
  var querystr = ' \
  from prof in $0 \
  join lab in $1 \
  on prof.labID equals lab.ID \
  where lab.Name == "KDE" \
  select [prof.profID, prof.Name, lab.Name]  \
  ';

  ViewDef.find({}, function(err, docs) {
    // expectedresult = ' <http://profs.test/p1> Kitagawa KDE . <http://profs.test/p2> Amagasa KDE ';

    console.log("LINQ Query:" + querystr);

    var query = new jsinq.Query(querystr);

    console.log("docs!!!!!!!!!!!!");
    console.log(JSON.stringify(docs));

    query.executeQuery(query, docs,
    function (values) {
      for (var key in values) {
        console.log(key + ': ' + values[key]);
      }
    });

  // console.log(query.getQueryFunction().toString());
  });
});

