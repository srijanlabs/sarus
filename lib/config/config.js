/**
 * Configure Your Server here
 */


//Port on which the application should be running
exports.Port = process.env.PORT || 3000 ;

//Url to fetch feeds from
exports.Feed_url = 'http://www.srijan.net/blog/feed';

//Time interval for db to auto refresh
exports.TimeInterval = 1; //in hours

//Database Url
exports.DBUrl = 'mongodb://localhost:27017/sarus_dev';

