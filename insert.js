var Promise = require('promise');

var mongoose = require('mongoose');

var ViewDefRegister = require('./ViewDefRegister');

mongoose.connect('mongodb://localhost/');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

    var p = new Promise(function(resolve, reject){
        ViewDefRegister.load('./viewdefs/product.json').then(function(row){
            row.save(function(err, row){
                if (err) reject(err);
                resolve(row);
            });
        }).catch(function(err){
            reject(err);
        });
    });
    var l = new Promise(function(resolve, reject){
        ViewDefRegister.load('./viewdefs/feature.json').then(function(row){
            row.save(function(err, row){
                if (err) reject(err);
                resolve(row);
            });
        }).catch(function(err){
            reject(err);
        });
    });
    
    Promise.all([p, l]).then(function(res){
        console.log('saved!');
        console.log(JSON.stringify(res));
    }).catch(function(err){
        console.error(err);
    }).then(function(){
        db.close();
    });
});

