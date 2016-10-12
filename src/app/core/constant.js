(function(module) {
  module.constant('COMMON', {
    numberOfRecordsPerPage: 1,
    ServerURL: 'http://sarus-openredesign.pantheonsite.io/api/',
    FrontEndURLPattern: '/:q',
    query: 'q'
  });
  module.constant('adInfo', {
    networkCode: '/6355419/Travel/Europe/France/Paris' // please replace this test network code
  })
})(angular.module('sarusApp'));
