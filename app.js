console.time('トータル');
console.time('アプリを起動してからSPARQLクエリを実行するまでの時間(木のパース等にかかった時間)');

require('./jsinq');
require('./jsinq-query');
var fs = require('fs');

/* full query (using 3 tables) */
/*
var querystr = ' \
    from product in $0 \
    join producttype in $1 \
    on product.ptype equals producttype.pt \
    where product.value1 < 400 \
    select [product.prdct, product.prdctlbl, product.value2, product.ptype, \
           product.pdate, producttype.pt, producttype.ptlbl ]  \
';
*/

/* join 2 tables */

var querystr = ' \
  from product in $0 \
  join offer in $1 \
  on product.prdct equals offer.ofprdct \
   join feature in $2 \
  on product.prdctft equals feature.ft \
  join producttype in $3  \
  on product.ptype equals producttype.pt \
  join producer in $4 \
  on product.pd equals producer.pd \
 where product.value1 < 200 \
  where offer.ofdays > 5 \
  select [product.prdct, product.prdctlbl, product.value1, product.ptype, product.ptct, product.pdate, \
    feature.ft, feature.ftlbl, producttype.pt, producttype.ptlbl, producttype.ptdate, producer.pd, producer.pdcountry, offer.of, offer.ofdays, offer.ofdate ]  \
';


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
  console.timeEnd('トータル');
});
