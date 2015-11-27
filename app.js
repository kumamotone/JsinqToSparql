console.time('timer');
require('./jsinq');
require('./jsinq-query');

  var querystr = ' \
    from product in $0 \
    join feature in $1  \
    on product.prdctft equals feature.ft \
    join producttype in $2  \
    on product.ptype equals producttype.pt \
    where product.value1 < 400 \
    select [product.prdct, product.prdctlbl, product.value2, product.text1, product.text2, product.text3, \
            product.pdate, feature.ft, feature.ftct, feature.fdate, producttype.ptlbl ]  \
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

