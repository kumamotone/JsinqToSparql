var Promise = require('promise');
var mongoose = require('mongoose');
var ViewDef = mongoose.model('viewdef', { 
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

            ViewDef.findOneAndRemove({ viewname: row.viewname }, function(err, doc){
                if (err) { return reject(err); }
                if (doc) {
                    var d = new ViewDef(doc);
                    resolve(d);
                }
                else {
                    resolve(new ViewDef(row));
                    console.log("JSONファイル" + filepath + " の内容を解釈しました．以下のビューを登録します．");
                    console.log(row);
                    console.log("");
                }
            });
        });        
    });
} 


module.exports = {
    load: load
};
