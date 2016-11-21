/**
 * Created by Tonywuke on 16/十一月/21.
 */
angular.module('app', [])

  .controller('authEmailCtrl', ['$scope', '$stateParams','$interval','$http', '$ionicPopup', '$timeout','$state','$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams,$interval,$http,$ionicPopup,$timeout,$state,$rootScope) {
      $scope.isSendCode=false;
      $scope.sendCodeBtnText='发送验证码';
      $scope.sendCode= function() {
        var second=60;
        var user = {
          phonenumber:localStorage.getItem("phonenumber"),
          email:$scope.email
        };

        $http.post($rootScope.urlAddress+'/users/send-verify-mail',user)
          .success(function (data, status, headers, config) {
            if(data=='success') {
              var timer = $interval(function () {
                if (second <= 0) {
                  $interval.cancel(timer);
                  second = 60;
                  $scope.sendCodeBtnText = "重发验证码";
                  $scope.isSendCode = false;
                } else {
                  $scope.sendCodeBtnText = second + "秒后可重发";
                  $scope.isSendCode = true;
                  second--;
                }
              }, 1000, 100);
            }else if(data=='exist'){
              var sendCodePopup = $ionicPopup.show({
                title: '邮箱已被验证'
              });
              $timeout(function() {
                sendCodePopup.close(); //1秒后关闭弹出
              }, 1000);
            }
          });

      }

      $scope.verifyMailbox= function() {
        var user = {
          phonenumber:localStorage.getItem("phonenumber"),
          email:$scope.email,
          emailCode:$scope.emailCode
        };
        $http.post($rootScope.urlAddress+'/users/verify-mailbox',user)
          .success(function (data, status, headers, config) {
            console.log(data);
            if(data=='success'){
              var verifyMailboxPopup = $ionicPopup.show({
                title: '验证成功'
              });
              $timeout(function() {
                verifyMailboxPopup.close(); //1秒后关闭弹出
              }, 1000);
              $state.go('tabsController.mineTabDefaultPage');
            }else if(data=='timeout'){
              var verifyMailboxPopup = $ionicPopup.show({
                title: '验证码失效'
              });
              $timeout(function() {
                verifyMailboxPopup.close();
              }, 1000);
            }else if(data=='incorrect'){
              var verifyMailboxPopup = $ionicPopup.show({
                title: '验证码不正确'
              });
              $timeout(function() {
                verifyMailboxPopup.close();
              }, 1000);
            }else if(data=='mismatch'){
              var verifyMailboxPopup = $ionicPopup.show({
                title: '当前输入邮箱与验证邮箱不匹配'
              });
              $timeout(function() {
                verifyMailboxPopup.close();
              }, 1000);
            }

          });
      }
    }])
