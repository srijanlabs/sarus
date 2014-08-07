///////////////////////////////////////
// Redis DataBase And Configurations //
///////////////////////////////////////


/**
 * [Connection instance of redis server]
 * @type {Redis client}
 * @augments {port,host,auth}
 */
var client = require('node-redis').createClient(); //(port,host,auth);

/** In case of Connection Error */
client.on("error", function(err) {
    console.log("Error " + err);
});

/**
 * [db module ]
 * @type {Object}
 */
var db = {};

/**
 * [initilizing_database ]
 * Performs basic init functionality As
 * 1. Cleaning up the database by flushall();
 * 2. Automate _initsync after each define interval in {time_to_update}
 * @return {null}
 */
db.initilizing_databse = function() {
    client.flushall();
    var time_to_update = 30 * 60 * 1000;
    setInterval(_initsync, time_to_update);
    console.log("database initializing done");
};

/**
 * [client - Assign client to db module to access it via module]
 * @type {Redis Connection instance}
 */
db.client = client;

/**
 * [sync - indicates initialy that need to sync db , db will be update using this value]
 * @type {Boolean}
 */
db.sync = false;

/**
 * [_initsync - private function which update the value of sync varibale after a given interval]
 * @return {null}
 */
var _initsync = function() {
    db.sync = false;
    console.log(" Reset db.sync =false  ");
};

/**
 * [exports db ]
 * @type {Custom redis instance}
 */
module.exports = db;
