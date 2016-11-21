/**
 * Created by Tonywuke on 16/十一月/21.
 */
angular.module('app', [])


  .controller('signInCtrl', ['$scope', '$stateParams','$http','$state','$rootScope',"$ionicPopup","$timeout", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams,$http,$state,$rootScope,$ionicPopup,$timeout) {
      $scope.login= function(){
        $http.post($rootScope.urlAddress+'/users/login',$scope.user)
          .success(function (data, status, headers, config) {
            console.log(data);
            if(data.isLoginSuccess==true){
              $rootScope.isLogin=true;
              localStorage.setItem("phonenumber", $scope.user.phonenumber);
              var loginPopup = $ionicPopup.show({
                title: '登录成功'
              });
              $timeout(function() {
                loginPopup.close(); //由于某种原因2秒后关闭弹出
              }, 1000);
              $state.go('tabs.minePage');
            }else {
              $rootScope.isLogin=false;
              $scope.isLoginFailure=true;
            }
          });
      }
    }])

