console.time('ready');
var SparqlClient = require('sparql-client');
var util = require('util');
var endpoint = 'http://130.158.76.30:8890/sparql';

// Get the leaderName(s) of the given citys
// if you do not bind any city, it returns 10 random leaderNames
var query = " \
DEFINE get:refresh \"0\" DEFINE get:soft \"replace\"\
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\
PREFIX bsbm: <http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/vocabulary/>\
PREFIX dc: <http://purl.org/dc/elements/1.1/>\
SELECT ?prdct ?prdctlbl ?value1 ?pt ?ft ?ftlbl ?ptct ?pdate WHERE {\
  ?prdct <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/vocabulary/Product>.\
  ?prdct <http://www.w3.org/2000/01/rdf-schema#label> ?prdctlbl.\
  ?prdct <http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/vocabulary/productFeature> ?ft.\
  ?prdct <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> ?pt.\
  ?prdct <http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/vocabulary/productPropertyNumeric1> ?value1.\
  ?prdct <http://purl.org/dc/elements/1.1/date> ?pdate.\
  ?ft <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/vocabulary/ProductFeature>.\
  ?ft <http://www.w3.org/2000/01/rdf-schema#label> ?ftlbl.\
  ?pt <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/vocabulary/ProductType>.\
  ?pt <http://www.w3.org/2000/01/rdf-schema#label> ?ptlbl.\
  ?pt <http://www.w3.org/2000/01/rdf-schema#comment> ?ptct.\
  ?pt <http://purl.org/dc/elements/1.1/date> ?ptdate.\
  FILTER(?value1 < 200)\
}\
";

function timerCallback()
{
  console.timeEnd('timerForSPARQL');
}

var fs = require('fs');
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
  fs.writeFile('outputs/solooutputs.json', JSON.stringify(results));
    //process.stdout.write(util.inspect(arguments, null, 20, true)+"\n");1
  timerCallback();
});

