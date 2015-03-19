var Promise = require('promise');
var mongoose = require('mongoose');
var ViewQuery = mongoose.model('ViewQuery', { 
    viewname: String,
    sparql: String,
    jsonschema: Object,
    endpoint: String
});
var fs = require('fs');


var load = function(filepath, callback){
    return new Promise(function(resolve,reject){
        fs.readFile(filepath, 'utf8', function(err, data){
            if (err) { return reject(err); }
            
            // 既存のviewnameの場合は更新
            // そうでなければ新規にinsert
            var row = JSON.parse(data);

            ViewQuery.findOneAndRemove({ viewname: row.viewname }, function(err, doc){
                if (err) { return reject(err); }
                if (doc) {
                    var d = new ViewQuery(doc);
                    resolve(d);
                }
                else {
                    resolve(new ViewQuery(row));
                }
            });
        });        
    });
} 


module.exports = {
    load: load
};
