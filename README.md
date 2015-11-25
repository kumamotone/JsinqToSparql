JsinqToSparql 

====

Query Provider using JSINQ for SPARQL endpoints.

## Installation 

```
npm install
```

## View Definition

Make view definition files.

```
{
  "viewname" : "Product",
  "sparql": "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX bsbm: <http://www4.wiwiss.fu-berlin.de/bizer/bsbm/v01/vocabulary/> PREFIX dc: <http://purl.org/dc/elements/1.1/> SELECT * WHERE { ?prdct rdf:type bsbm:Product . ?prdct rdfs:label ?prdctlbl . ?prdct bsbm:productFeature ?prdctft . ?prdct bsbm:productPropertyNumeric1 ?value1 . ?prdct bsbm:productPropertyNumeric2 ?value2 . ?prdct bsbm:productPropertyTextual1 ?text1 . ?prdct bsbm:productPropertyTextual2 ?text2 . ?prdct bsbm:productPropertyTextual3 ?text3 . ?prdct dc:date ?pdate . } ",
  "jsonschema": { "type":"object", "properties":{
    "results": {
    "type":"array", "items":{
    "type":"object", "properties":{
    "?prdct": { "type":"string" },
    "?prdctlbl": { "type":"string" },
    "?prdctft": {"type":"string"},
    "?value1": {"type":"number"},
    "?value2": {"type":"number"},
    "?text1": {"type":"string"},
    "?text2": {"type":"string"},
    "?text3": {"type":"string"},
    "?pdate": { "type":"string" }   }}}}},
  "endpoint": "http://192.168.225.129:8890/sparql"
}
```

| key       |                              value |
|:----------|-----------------------------------:|
| viewname  | Specify unique viewname            |
| viewname  | Specify SPARQL view                |
| jsonschema| Specify contents of view for users |
| endpoint  | Specify SPARQL endpoint address    |

and then load:

```
$ node insert.js yourviewquery.json
```

## Query

Require, and write your query in your code:

```
require('./jsinq');
require('./jsinq-query');

var queryStr = ' \
  from product in $0 \
  where product.value1 < 400 \
  select [product.prdct, product.prdctlbl ] \
  ';
```

and run your query. 

```
  var query = new jsinq.Query(querystr);
  query.executeQuery(query, docs,
    // Print Results
    function (values) {
      for (var key in values) {
        console.log(key + ': ' + values[key]);
      }
    });
```

## Example

An example is shown as app.js.
Sample view definitions stored in `viewdefs`.
If you use these views, you need to store data generated by BSBM Tools(http://sourceforge.net/projects/bsbmtools/).

### Generate data

```
$ cd bsbmtools-0.2/
$ ./generate -dir output -fn p1000  -s ttl -pc 1000
```

### Start SPARQL Endpoint (if Fuseki)

```
$ cd jena-fuseki-1.1.1/ 
$ ./fuseki-server --file=pc1000.ttl /pc1000
```
