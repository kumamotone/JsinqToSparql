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
  from product in $0 \
  join feature in $1  \
  on product.prdctft equals feature.ft \
  select [product.prdctlbl, feature.ftct]  \
  ';

    ViewDef.find({$or : [{viewname: "Product"}, {viewname: "Feature"}]}, function(err, docs) {
    console.log("LINQ Query:" + querystr);
    console.time('timer');
    var query = new jsinq.Query(querystr);
    query.executeQuery(query, docs,
    function (values) {
      // console.log("Results:");
      for (var key in values) {
        // console.log(key + ': ' + values[key]);
      }
      console.timeEnd('timer');
    });
      db.close();
  // console.log(query.getQueryFunction().toString());
  });
});

