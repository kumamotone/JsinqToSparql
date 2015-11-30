console.time('timer');
require('./jsinq');
require('./jsinq-query');

var querystr = ' \
  from product in $0 \
  select [ product.prdct, product.prdctlbl ]  \
';
  
console.log("LINQ Query:" + querystr);
var query = new jsinq.Query(querystr);
query.executeQuery(query,
function (values) {
  //console.log("Results:");
  for (var key in values) {
    console.log(key + ': ' + values[key]);
  }
  console.timeEnd('format');
  // console.timeEnd('timer');
});

// console.log(query.getQueryFunction().toString());
