// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ionic-native-transitions', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

var client_id = "Your client ID";
var client_secret = "A very secret client secret (once per device)";
 
FingerprintAuth.isAvailable(function(result) {
    if (result.isAvailable) {    
        if(result.hasEnrolledFingerprints){
            FingerprintAuth.show({
                clientId: client_id,
                clientSecret: client_secret
            }, function (result) {
                if (result.withFingerprint) {
                    alert("Successfully authenticated using a fingerprint");
                } else if (result.withPassword) {
                    alert("Authenticated with backup password");
                }
            }, function(error) {
                console.log(error); // "Fingerprint authentication not available"
            });
        }else{
            alert("Fingerprint auth available, but no fingerprint registered on the device");
        }
    }
}, function(message) {
    alert("Cannot detect fingerprint device");
});

  });
})

.config(function($ionicNativeTransitionsProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {

 $ionicNativeTransitionsProvider.setDefaultOptions({
        duration: 500, // in milliseconds (ms), default 400,
        slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
        iosdelay: +1, // ms to wait for the iOS webview to update before animation kicks in, default -1
        androiddelay: +1, // same as above but for Android, default -1
        winphonedelay: +1, // same as above but for Windows Phone, default -1,
        fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
        fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
        triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
        backInOppositeDirection: false, // Takes over default back transition and state back transition to use the opposite direction transition to go back
   
   });

 $ionicNativeTransitionsProvider.setDefaultTransition({
        type: 'flip',
        direction: 'up'
    });




       $ionicConfigProvider.views.transition('android');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'LoginCtrl'
      }
    }
  })

   .state('tab.info', {
   url: '/info',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-info.html',
        controller: 'InfoCtrl'
      }
    }
  })
    .state('tab.registration', {
   url: '/reg',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-regis.html',
        controller: 'RegCtrl'
      }
    }
  })
  .state('tab.account', {
    nativeTransitions: null,
    url: '/account',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.registering', {
    nativeTransitions: null,
    url: '/registering',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-regisnow.html',
        controller: 'StartAccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
