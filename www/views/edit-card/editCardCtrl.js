/**
 * Created by Tonywuke on 16/十一月/21.
 */
angular.module('app', [])

  .controller('editCardCtrl', ['$scope', '$stateParams','$http','$ionicPopup','$timeout','$state','$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $http, $ionicPopup, $timeout, $state,$rootScope) {

      $scope.publish= function() {
        var card ={
          phonenumber:localStorage.getItem("phonenumber"),
          name:'wuke',
          likeNum:0,
          commentNum:0,
          hidden:false,
          title:$scope.title,
          body:$scope.body
        };

        $http.post($rootScope.urlAddress+'/cards/publish',card)
          .success(function (data, status, headers, config) {
            console.log(data);
            if(data=='success'){
              var publishPopup = $ionicPopup.show({
                title: '发布成功'
              });
              $timeout(function() {
                publishPopup.close(); //1秒后关闭弹出
              }, 1000);
              $state.go('tabsController.homeTabDefaultPage');
            }
          });

      }

    }])
