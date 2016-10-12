!function(n){n.module("sarusApp",["ui.router"])}(angular)(function(n){n.factory("SarusFetch",["$http","COMMON",function(n,t){var i=function(){this.items=[],this.busy=!1,this.index=0};return i.prototype.nextPage=function(i){if(!this.busy){this.busy=!0;var e=t.ServerURL+(i||"");n.get(e).success(function(n){this.items.push(n[0]),this.busy=!1,this.index++}.bind(this))}},i}])})(angular.module("sarusApp")),function(n){n.module("sarusApp").directive("updateUrl",["$window","$state","COMMON",function(t,i,e){var o=i.current,r=o&&o.name;return console.log(o),{restrict:"A",scope:{updateUrl:"@"},link:function(e,o,l){n.element(t).bind("scroll",function(n){var l=o[0].getBoundingClientRect(),a=l.top,d=a>=0&&a<=t.innerHeight;e.$apply(),d&&i.transitionTo(r,{q:e.updateUrl},{location:!0,notify:!1,reload:!1})})}}}])}(angular),function(n){n.module("sarusApp").directive("sarusContainer",function(){return{}}).directive("sarusItem",function(){return{restrict:"E",replace:!0,scope:{item:"=",sarusTemplate:"@"},templateUrl:"app/directive/sarus-item.tpl.html",link:function(n,t,i){}}})}(angular)(function(n){n.module("sarusApp").directive("infiniteScroll",["$window","$timeout",function(t,i){return{scope:{callback:"&infiniteScroll",distance:"=infiniteScrollDistance",disabled:"=infiniteScrollDisabled"},link:function(e,o,r){var l=n.element(t),a=function(n,t){if(!e.disabled){var r=l[0].innerHeight,a=o[0].offsetTop+o[0].offsetHeight,d=r+(l[0].scrollY||l[0].pageYOffset),s=a-d,c=s-parseInt(e.distance||0,10)<=0;c&&i(e.callback)}};e.$watch("disabled",function(n){!1===n&&a()}),l.bind("scroll",a),e.$on("$destroy",function(){l.unbind("scroll",a)}),i(a)}}}])})(angular)(function(n){n.module("sarusApp").directive("ads",["adInfo",function(n){return{restrict:"A",scope:{adClientId:"@",adSlotId:"@",adSize:"@"},templateUrl:"app/directive/ads.tpl.html",compile:function(n,t,i){return{pre:function(t,i,e,o){var r="div-gpt-ad-"+t.$id,l=JSON.parse(t.adSize)||[300,200],a=n[0].firstChild;a&&(a.id=r),googletag.cmd.push(function(){googletag.defineSlot("/214024014/side",l,r).addService(googletag.pubads());googletag.pubads().enableSingleRequest(),googletag.enableServices()}),googletag.cmd.push(function(){googletag.display(r)})}}}}}])})(angular),function(n){n.constant("COMMON",{numberOfRecordsPerPage:1,ServerURL:"http://sarus-openredesign.pantheonsite.io/api/",FrontEndURLPattern:"/:q",query:"q"}),n.constant("adInfo",{clientId:"ca-pub-7338620685919200"})}(angular.module("sarusApp")),function(n){n.config(["$locationProvider","$urlMatcherFactoryProvider",function(n,t){n.html5Mode(!0),t.strictMode(!1)}])}(angular.module("sarusApp")),function(n){n.config(["$stateProvider","$injector",function(n,t){var i=t.get("COMMON"),e=i.FrontEndURLPattern,o={name:"intro",url:e,templateUrl:"app/controller/get.html",controller:"GetController as vm"};n.state(o)}])}(angular.module("sarusApp")),angular.module("sarusApp").controller("GetController",["SarusFetch","$sce","COMMON",function(n,t,i){var e=this;e.trustAsHtml=t.trustAsHtml,e.pageNumber=1,e.numberOfRecordsPerPage=i.numberOfRecordsPerPage,e.nids=[{nid:"21700"},{nid:"21699"},{nid:"21698"},{nid:"21697"},{nid:"21696"},{nid:"21693"},{nid:"21692"},{nid:"21691"},{nid:"21690"},{nid:"21689"},{nid:"21688"},{nid:"21687"},{nid:"21686"},{nid:"21683"},{nid:"21682"},{nid:"21681"},{nid:"21680"},{nid:"21679"},{nid:"21678"}],e.sarus=new n}]),angular.module("sarusApp").run(["$templateCache",function(n){n.put("app/controller/get-view.tpl.html",'<div class=row><div class=col-12><div ads ad-size="[728, 90]"></div></div></div><div class=row><div class=col-8>{{item.body[0].value}}</div><div class=col-4><div ads ad-size=[300,250]></div><div ads ad-size=[300,250]></div></div></div>'),n.put("app/controller/get.html",'<style>*{\n      box-sizing: border-box;\n    }\nhtml,\nbody {\n  height: 100%;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  left: 0;\n  top: 0;\n  font-size: 100%;\n}\n\n/* ROOT FONT STYLES */\n\n* {\n  color: #333447;\n  line-height: 1.5;\n}\n\n/* TYPOGRAPHY */\n\nh1 {\n  font-size: 2.5rem;\n}\n\nh2 {\n  font-size: 2rem;\n}\n\nh3 {\n  font-size: 1.375rem;\n}\n\nh4 {\n  font-size: 1.125rem;\n}\n\nh5 {\n  font-size: 1rem;\n}\n\nh6 {\n  font-size: 0.875rem;\n}\n\np {\n  font-size: 1.125rem;\n  font-weight: 200;\n  line-height: 1.8;\n}\n\n.font-light {\n  font-weight: 300;\n}\n\n.font-regular {\n  font-weight: 400;\n}\n\n.font-heavy {\n  font-weight: 700;\n}\n\n/* POSITIONING */\n\n.left {\n  text-align: left;\n}\n\n.right {\n  text-align: right;\n}\n\n.center {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.justify {\n  text-align: justify;\n}\n\n/* ==== GRID SYSTEM ==== */\n\n.container {\n  width: 90%;\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.row {\n  position: relative;\n  width: 100%;\n}\n\n.row [class^="col"] {\n  float: left;\n  margin: 0.5rem 2%;\n  min-height: 0.125rem;\n}\n\n.col-1,\n.col-2,\n.col-3,\n.col-4,\n.col-5,\n.col-6,\n.col-7,\n.col-8,\n.col-9,\n.col-10,\n.col-11,\n.col-12 {\n  width: 96%;\n}\n\n.col-1-sm {\n  width: 4.33%;\n}\n\n.col-2-sm {\n  width: 12.66%;\n}\n\n.col-3-sm {\n  width: 21%;\n}\n\n.col-4-sm {\n  width: 29.33%;\n}\n\n.col-5-sm {\n  width: 37.66%;\n}\n\n.col-6-sm {\n  width: 46%;\n}\n\n.col-7-sm {\n  width: 54.33%;\n}\n\n.col-8-sm {\n  width: 62.66%;\n}\n\n.col-9-sm {\n  width: 71%;\n}\n\n.col-10-sm {\n  width: 79.33%;\n}\n\n.col-11-sm {\n  width: 87.66%;\n}\n\n.col-12-sm {\n  width: 96%;\n}\n\n.row::after {\n	content: "";\n	display: table;\n	clear: both;\n}\n\n.hidden-sm {\n  display: none;\n}\n\n@media only screen and (min-width: 33.75em) {  /* 540px */\n  .container {\n    width: 80%;\n  }\n}\n\n@media only screen and (min-width: 45em) {  /* 720px */\n  .col-1 {\n    width: 4.33%;\n  }\n\n  .col-2 {\n    width: 12.66%;\n  }\n\n  .col-3 {\n    width: 21%;\n  }\n\n  .col-4 {\n    width: 29.33%;\n  }\n\n  .col-5 {\n    width: 37.66%;\n  }\n\n  .col-6 {\n    width: 46%;\n  }\n\n  .col-7 {\n    width: 54.33%;\n  }\n\n  .col-8 {\n    width: 62.66%;\n  }\n\n  .col-9 {\n    width: 71%;\n  }\n\n  .col-10 {\n    width: 79.33%;\n  }\n\n  .col-11 {\n    width: 87.66%;\n  }\n\n  .col-12 {\n    width: 96%;\n  }\n\n  .hidden-sm {\n    display: block;\n  }\n}\n\n@media only screen and (min-width: 60em) { /* 960px */\n  .container {\n    width: 75%;\n    max-width: 60rem;\n  }\n}\n    .item {\n      min-height:1000px;\n      background-color:#eee;\n      list-style-type: none;\n      border: 0 dotted #ddd;\n      border-bottom-width: 1px;\n      margin:10 auto;\n    }</style><div class=container infinite-scroll-distance=100 infinite-scroll-disabled=vm.sarus.busy infinite-scroll=vm.sarus.nextPage(vm.nids[vm.sarus.index].nid)><div><div class=item update-url=url-{{$index}} ng-repeat="item in vm.sarus.items track by $index"><sarus-item sarus-template=app/controller/get-view.tpl.html item=item></sarus-item></div></div></div>'),n.put("app/directive/ads.tpl.html","<div></div>"),n.put("app/directive/sarus-item.tpl.html","<div ng-include src=sarusTemplate></div>")}]);
//# sourceMappingURL=../maps/scripts/app-3ba648fa58.js.map
