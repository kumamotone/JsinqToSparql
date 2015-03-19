var promise = require('promise');
var mongoose = require('mongoose');
var ViewQuery = mongoose.model('ViewQuery', { 
    viewname: String,
    sparql: String,
    jsonscema: Object,
    endpoing: String
});
var fs = require('fs');

module.exports = {
    load: function(filepath, callback){
        return new Promise(fucntion(resolve, reject){
            fs.readFile(filepath, 'utf8', function(err, data){
                if (err) { return reject(err); }
                resolve(new ViewQuery(JSON.parse(data)));
            });        
        });
    }
};
