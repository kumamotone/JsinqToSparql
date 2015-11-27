var Promise = require('promise');
var mongoose = require('mongoose');
var ViewDefRegister = require('./register/ViewDefRegister');
var args = process.argv.slice(2);

mongoose.connect('mongodb://localhost/');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

function register(element, index, array) {
  var task = new Promise(function(resolve, reject){
    ViewDefRegister.load(element).then(function(row){
      row.save(function(err, row){
        if (err) reject(err);
        resolve(row);
      });
    }).catch(function(err){
      reject(err);
    });
  });
  this.push(task);
}

if (process.argv.length == 2) {
  console.log("usage: node insert.js <file1> <file2> ...")
  process.exit();
}

db.once('open', function () {
    var tasks = [];
    args.forEach(register, tasks);
    Promise.all(tasks).then(function(res){
      console.log('saved!');
      console.log(JSON.stringify(res));
    }).catch(function(err){
      console.error(err);
    }).then(function(){
      db.close();
    });
});
