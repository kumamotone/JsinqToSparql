console.time('ready');
var SparqlClient = require('sparql-client');
var util = require('util');
var endpoint = 'http://192.168.225.129:8890/sparql';

// Get the leaderName(s) of the given citys
// if you do not bind any city, it returns 10 random leaderNames
var query = " \
DEFINE get:refresh \"0\" \
DEFINE get:soft \"replace\" \
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \
PREFIX bsbm: <http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/vocabulary/> \
PREFIX dc: <http://purl.org/dc/elements/1.1/>  \
SELECT ?prdct ?prdctlbl ?value ?text1 ?text2 ?text3 ?pdate ?ftlbl ?ftct ?fdate \
WHERE {\
  ?prdct rdf:type bsbm:Product .\
  ?prdct rdfs:label ?prdctlb .\
  ?prdct bsbm:productFeature ?prdctft .\
  ?prdct bsbm:productPropertyNumeric1 ?value1 . \
  ?prdct bsbm:productPropertyNumeric2 ?value2 . \
  ?prdct bsbm:productPropertyTextual1 ?text1 . \
  ?prdct bsbm:productPropertyTextual2 ?text2 . \
  ?prdct bsbm:productPropertyTextual3 ?text3 . \
  ?prdct dc:date ?pdate . \
  ?prdctft rdf:type bsbm:ProductFeature  .\
  ?prdctft rdfs:label ?ftlbl .\
  ?prdctft rdfs:comment ?ftct .\
  ?prdctft dc:date ?fdate . \
  FILTER (?value1 < 400) . \
}\
";

function timerCallback()
{
  console.timeEnd('timerForSPARQL');
}

var client = new SparqlClient(endpoint);
console.log("Query to " + endpoint);
console.log("Query: " + query);
console.timeEnd('ready');
console.time('timerForSPARQL');
client.query(query)
  //.bind('city', 'db:Chicago')
  //.bind('city', 'db:Tokyo')
  //.bind('city', 'db:Casablanca')
//  .bind('city', '<http://dbpedia.org/resource/Vienna>')
  .execute(function(error, results) {
  process.stdout.write(util.inspect(arguments, null, 20, true)+"\n");1
  timerCallback();
});

