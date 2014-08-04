/* Redis Implimentation */
//redis-cli -h pub-redis-11936.us-east-1-3.1.ec2.garantiadata.com -p 11936 -a <password>
var client = require('node-redis').createClient(); //(port,host,auth);
client.on("error", function(err) {
    console.log("Error " + err);
});

var db = {};
db.initilizing_databse = function() {
    // cleaning up the database
    client.flushall();
    // setting initial index to zero
    client.set('index', 0);
    // after each half an hour making calling function
    var time_to_update = 30 * 60 *  1000;
    setInterval(initsync, time_to_update);
    console.log("database initialize done");
};

db.client = client;
// initilization db is not ready to server
db.sync = false;

// making db.sync false
var initsync = function() {
        db.sync = false;
        console.log(" reset db.sync =false");
};

module.exports = db;
