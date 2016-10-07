(function(module) {
  module.constant('COMMON', {
    numberOfRecordsPerPage: 1,
    ServerURL: 'http://sarus-openredesign.pantheonsite.io/api/',
    FrontEndURLPattern: '/news/:q',
    query: 'q'
  });
  module.constant('adInfo', {
    clientId: ''
  })
})(angular.module('sarusApp'));
