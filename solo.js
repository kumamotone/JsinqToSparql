var SparqlClient = require('./node-sparql-client');
var util = require('util');
var endpoint = 'http://130.158.76.22:8890/sparql';

// Get the leaderName(s) of the given citys
// if you do not bind any city, it returns 10 random leaderNames
var query = " \
DEFINE get:refresh \"0\" \
DEFINE get:soft \"replace\" \
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \
PREFIX bsbm: <http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/vocabulary/> \
\
SELECT ?prdctlbl ?ftlbl ?ftct\
WHERE {\
  ?prdct rdf:type bsbm:Product .\
  ?prdct rdfs:label ?prdctlb .\
  ?prdct bsbm:productFeature ?prdctft .\
  ?prdctft rdf:type bsbm:ProductFeature  .\
  ?prdctft rdfs:label ?ftlbl .\
  ?prdctft rdfs:comment ?ftct\
}\
";

function timerCallback()
{
  console.timeEnd('timerForSPARQL');
}

var client = new SparqlClient(endpoint);
console.log("Query to " + endpoint);
console.log("Query: " + query);
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

