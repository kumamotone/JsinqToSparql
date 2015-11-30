console.time('timer');
require('./jsinq');
require('./jsinq-query');
var fs = require('fs');

var querystr = ' \
  from product in $0 \
  select [product.prdct, product.prdctlbl, product.value2, product.text1, product.text2, product.text3, \
          product.pdate ]  \
';
  
console.log("LINQ Query:" + querystr);
var query = new jsinq.Query(querystr);
query.executeQuery(query,
function (retval) {
  fs.writeFile('outputs/outputs.json', JSON.stringify(retval));
  console.timeEnd('format');
});
