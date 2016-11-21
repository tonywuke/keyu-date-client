/**
 * Created by Tonywuke on 16/十一月/21.
 */
angular.module('app', [])

  .controller('signUpCtrl', ['$scope', '$stateParams', '$http','$state','$ionicPopup','$ionicHistory','$timeout','$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams,$http,$state,$ionicPopup,$ionicHistory,$timeout,$rootScope) {
      $scope.signup= function(){
        $http.post($rootScope.urlAddress+'/users/signup',$scope.user)
          .success(function (data, status, headers, config) {
            console.log(data);
            var sigupPopup = $ionicPopup.show({
              title: '注册成功',
              subTitle: '请登录'
            });
            $timeout(function() {
              sigupPopup.close(); //由于某种原因2秒后关闭弹出
            }, 1000);
            $state.go('signInPage');
          });
      }
    }])

