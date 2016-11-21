/**
 * Created by Tonywuke on 16/十一月/21.
 */
angular.module('app', [])

  .controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams) {

      $scope.color= 'red';
      $scope.cards=[
        {name:'wuke' , editDate:'2016/11/16', title:'寻找另一个地方',likeNum: 5, commentNum:8 },
        {name:'dory' , editDate:'2016/05/16', title:'发现新大陆',likeNum: 1, commentNum:0 }
      ]


    }])

