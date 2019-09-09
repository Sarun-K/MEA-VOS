var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/MEA_db";

// create db
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  });
 
// create issue collection
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("MEA_db");
    dbo.createCollection("Issues", function(err, res) {
      if (err) throw err;
      console.log("Collection Issues Created!");
      db.close();
    });
  });

// create Categories collection
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("MEA_db");
    dbo.createCollection("Categories", function(err, res) {
      if (err) throw err;
      console.log("Collection Categories Created!");
      db.close();
    });
  });

// create Users collection
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("MEA_db");
    dbo.createCollection("Users", function(err, res) {
      if (err) throw err;
      console.log("Collection Users Created!");
      db.close();
    });
  });

// create Chanels collection
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("MEA_db");
    dbo.createCollection("Chanels", function(err, res) {
      if (err) throw err;
      console.log("Collection Chanels Created!");
      db.close();
    });
  });

// create Organizations collection
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("MEA_db");
    dbo.createCollection("Organizations", function(err, res) {
      if (err) throw err;
      console.log("Collection Organizations Created!");
      db.close();
    });
  });

// create Events collection
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("MEA_db");
    dbo.createCollection("Events", function(err, res) {
      if (err) throw err;
      console.log("Collection Events Created!");
      db.close();
    });
  });


  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("MEA_db");
    var myobj = [
      { name: 'John'},
      { name: 'Peter'},
      { name: 'Amy'},
      { name: 'Hannah'},
      { name: 'Michael'},
      { name: 'Sandy'},
    ];
    dbo.collection("Organizations").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();
    });
  });