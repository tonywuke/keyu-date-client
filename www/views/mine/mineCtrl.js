/**
 * Created by Tonywuke on 16/十一月/21.
 */
angular.module('app', [])


  .controller('mineCtrl', ['$scope', '$stateParams','$http','$state','$rootScope',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams,$http,$state,$rootScope) {
      if(!$rootScope.isLogin)//判断是否登录
        $scope.user={phonenumber:'点击登录/注册'};
      else
        $scope.user={phonenumber:localStorage.getItem("phonenumber")};

      $scope.infoClick= function(){
        $state.go('userInfoPage',{phonenumber : localStorage.getItem("phonenumber")});//跳转个人信息页面
      }

      $scope.signout= function(){
        localStorage.removeItem("phonenumber");
        $rootScope.isLogin=false;
        $state.go('tabs.homePage');
      }

    }])
