app = angular.module('sarusApp');

app.controller("GetController", function($scope, $http){

  // the array which represents the list
  $scope.items = ["1. Scroll the list to load more"];
  $scope.loading = true;

  // this function fetches a random text and adds it to array

  $scope.more = function(){
    var counter =  Math.floor(Math.random() * (40 - 1) + 1);
    $http({
      method: "GET",
      url: "http://10.10.0.24:44400/drupal7/api/node/"+ counter,
    }).success(function(data, status, header, config){
      console.log(data);
      console.log(counter);
      // returned data contains an array of 2 sentences
     // for(line in data){
        newItem = counter + data.body['und']['0'].value;
        //console.log(newItem);
        //console.log(data.body['und']['0'].value);

        $scope.items.push(newItem);
        console.log($scope.items);
     // }
      $scope.loading = false;
    });
  };

  // we call the function twice to populate the list
  $scope.more();
});

// we create a simple directive to modify behavior of <ul>
app.directive("whenScrolled", function(){
  return{

    restrict: 'A',
    link: function(scope, elem, attrs){

      // we get a list of elements of size 1 and need the first element
      raw = elem[0];

      // we load more elements when scrolled past a limit
      elem.bind("scroll", function(){
        if(raw.scrollTop+raw.offsetHeight+5 >= raw.scrollHeight){
          scope.loading = true;

        // we can give any function which loads more elements into the list
          scope.$apply(attrs.whenScrolled);
        }
      });
    }
  }
});
