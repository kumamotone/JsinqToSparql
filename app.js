console.time('アプリを起動してからSPARQLクエリを実行するまでの時間(木のパース等にかかった時間)');

require('./jsinq');
require('./jsinq-query');
var fs = require('fs');

/* full query (using 3 tables) */
var querystr = ' \
    from product in $0 \
    join feature in $1  \
    on product.prdctft equals feature.ft \
    join producttype in $2  \
    on product.ptype equals producttype.pt \
    where product.value1 < 400 \
    select [product.prdct, product.prdctlbl, product.value2, product.text1, product.text2, product.text3, \
           product.pdate, feature.ft, feature.fdate, producttype.ptlbl ]  \
';

/* join 2 tables */
/*
var querystr = ' \
  from product in $0 \
  join producttype in $1  \
  on product.ptype equals producttype.pt \
  select [product.prdct, product.prdctlbl, product.value1, product.ptype, producttype.pt, producttype.ptlbl ]  \
';
*/

/* select only */
/*
var querystr = ' \
               from product in $0 \
               select [product.prdct, product.prdctlbl, product.value1, product.ptype ] \
               ';
*/


console.log("===== Given LINQ Query ====")
console.log(querystr + "\n");
var query = new jsinq.Query(querystr);
query.executeQuery(query,
function (retval) {
  fs.writeFile('outputs/outputs.json', JSON.stringify(retval));
  console.timeEnd('SPARQLエンドポイントの返り値の処理の時間');
});
