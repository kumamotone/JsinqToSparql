console.time('アプリを起動してからSPARQLクエリを実行するまでの時間(木のパース等にかかった時間)');

require('./jsinq');
require('./jsinq-query');
var fs = require('fs');

var querystr = ' \
  from product in $0 \
  select [product.prdct, product.prdctlbl, product.value2, product.text1, product.text2, product.text3, \
          product.pdate ]  \
';
  
console.log("===== Given LINQ Query ====")
console.log(querystr + "\n");
var query = new jsinq.Query(querystr);
query.executeQuery(query,
function (retval) {
  fs.writeFile('outputs/outputs.json', JSON.stringify(retval));
  console.timeEnd('SPARQLエンドポイントの返り値の処理の時間');
});
