'use strict';

angular.module('myApp.view1', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

/* This is what you write as a developer  */ 

.controller('View1Ctrl', ['$scope', '$modal', '$log', '$window', function($scope, $modal, $log, $window) {
  $scope.name = 'World';
  
  for (var i = 0; i < 5; i++) {
    $scope.items.push(i);
  }
  
  $scope.modalClosed = function (result) {
    $log.info('closed in main');
    alert('you selected ' + result);
  };

  $scope.modalDismissed = function () {
    $log.info('canceled in main');
  };
}])

.controller('ModalInstance2Ctrl', function($scope, $modalInstance, data) {
  $scope.items = data;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})

/* End of what you write as a developer  */

/* The directive that does the job */
.directive('leoModal', function($modal, $window, $log) {
  return {
    restrict: 'E',
    template: "<button ng-click='open()'>{{text}}</button>",
    scope: {      
      text: '@',
      templateUrl: '@',
      controller: '@',
      modalClosed: '&',
      modalDismissed: '&',
      data: '='
    },
    controller: function($scope, $element, $attrs) {
      $scope.open = function() {
        var modalInstance = $modal.open({
          templateUrl: $scope.templateUrl,
          controller: $scope.controller,
          resolve: {
            data: function () {
              return $scope.data;
            }
          }
        });
    
        modalInstance.result.then(function (selectedItem) {
          $scope.modalClosed({ result: selectedItem });
        }, function () {
          $scope.modalDismissed();
        });
        
        modalInstance.rendered.then(function() {
          var $dialog = $('.modal-dialog');
          var height = $window.innerHeight;
          var offset = (height - $dialog.height()) / 2;
          $dialog.css('margin-top', offset);
          $log.info('offset = ' + $dialog);
        });
      }
    }
  };
})
;
