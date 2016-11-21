/**
 * Created by Tonywuke on 16/十一月/21.
 */
angular.module('app', [])

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider


      .state('tabs.minePage', {
        cache: false,
        url: '/mine-page',
        views: {
          'mine-tab': {
            templateUrl: 'views/mine/minePage.html',
            controller: 'mineCtrl'
          }
        }
      })



  });
