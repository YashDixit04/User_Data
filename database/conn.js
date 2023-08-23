const mongoose = require('mongoose');
// const {MongoClient} = require('mongodb');

var url =  "mongodb://127.0.0.1:27017/Form";

mongoose.connect( url, {
    // To avoid deprecation warning ( They are warnings that notify us that a specific feature (e.g. a method) will be removed soon (usually in the next minor or major opens a new window version) and should be replaced with something else.)
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}).then(()=>{
    console.log('connection success')
}).catch((e)=>{
    console.log(e ,"Failed")
})






// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });