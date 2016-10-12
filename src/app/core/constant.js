(function(module) {
  module.constant('COMMON', {
    numberOfRecordsPerPage: 1,
    ServerURL: 'http://sarus-openredesign.pantheonsite.io/api/',
    FrontEndURLPattern: '/:q',
    query: 'q'
  });
  module.constant('adInfo', {
    networkCode: ''
  })
})(angular.module('sarusApp'));
