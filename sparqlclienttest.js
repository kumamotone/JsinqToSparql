var SparqlClient = require('./node-sparql-client');
var util = require('util');
var endpoint = 'http://127.0.0.1:8890/sparql';

// Get the leaderName(s) of the given citys
// if you do not bind any city, it returns 10 random leaderNames
var query = "prefix dc: <http://purl.org/dc/elements/1.1/> select * where { ?paperID dc:title ?paperTitle }";

var client = new SparqlClient(endpoint);
console.log("Query to " + endpoint);
console.log("Query: " + query);
client.query(query)
  //.bind('city', 'db:Chicago')
  //.bind('city', 'db:Tokyo')
  //.bind('city', 'db:Casablanca')
//  .bind('city', '<http://dbpedia.org/resource/Vienna>')
  .execute(function(error, results) {
  process.stdout.write(util.inspect(arguments, null, 20, true)+"\n");1
});
