angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('authEmailPage', {
      cache: false,
      url: '/auth-email-page',
      templateUrl: 'views/auth-email/authEmailPage.html',
      controller: 'authEmailCtrl'
    })

    .state('editCardPage', {
      url: '/edit-card-page',
      templateUrl: 'views/edit-card/editCardPage.html',
      controller: 'editCardCtrl'
    })

    .state('tabs.findPage', {
      url: '/find-page',
      views: {
        'find-tab': {
          templateUrl: 'views/find/findPage.html',
          controller: 'findCtrl'
        }
      }
    })

    .state('tabs.homePage', {
      url: '/home-page',
      views: {
        'home-tab': {
          templateUrl: 'views/home/homePage.html',
          controller: 'homeCtrl'
        }
      }
    })

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

    .state('signInPage', {
      url: '/sign-in-page',
      templateUrl: 'views/sign-in/signInPage.html',
      controller: 'signInCtrl'
    })

    .state('signUpPage', {
      url: '/sign-up-page',
      templateUrl: 'views/sign-up/signUpPage.html',
      controller: 'signUpCtrl'
    })


    .state('tabs', {
      url: '/tabs',
      templateUrl: 'views/tabs/tabsPage.html',
      abstract:true
    })


    .state('userInfoPage', {
      cache: false,
      url: '/user-info-page/:phonenumber/',
      templateUrl: 'views/user-info/userInfoPage.html',
      controller: 'userInfoCtrl'
    })

    .state('viewCardPage', {
      url: '/view-card-page',
      templateUrl: 'views/view-card/viewCardPage.html',
      controller: 'viewCardCtrl'
    })

  $urlRouterProvider.otherwise('/tabs/home-page')



});
