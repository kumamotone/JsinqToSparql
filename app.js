console.time('timer');
// jsinq をロード
require('./jsinq');
require('./jsinq-query');
 /* 
  var SparqlParser = require('./SPARQL.js/').Parser;
  var parser = new SparqlParser();
  var parsedQuery = parser.parse(
  'PREFIX foaf:    <http://xmlns.com/foaf/0.1/>'+
  'SELECT ?name ?mbox'+
  '{  ?x foaf:name ?name .'+
  '  ?x foaf:mbox ?mbox .'+
  '  FILTER (?name > 50 ) }');
  
  console.log(parsedQuery);

 for( var i in parsedQuery.where ){
    if( parsedQuery.where[i].type == 'filter' ) { 
      exp = parsedQuery.where[i].expression;
      console.log(exp);
    }
  }
  
   parsedQuery.where.push({"type":"filter","expression":{"type":"operation","operator":"regex","args":["?name","\"Smi\""]}});
  // console.log(parsedQuery);
  // console.log(parsedQuery.where[1].expression);
  // console.log(parsedQuery.where[1].expression.args);

  // parsedQuery.where[1].expression.args.push();

   var SparqlGenerator = require('./SPARQL.js/').Generator;
   var generator = new SparqlGenerator();
   parsedQuery.variables.push('?mickey');
   var generatedQuery = generator.stringify(parsedQuery);

  console.log(generatedQuery);
*/
  // LINQコード
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

