angular.module('starter.services', ['myApp.constants'])

.factory('userServices', function(appConfig, appImages, $ionicPopup, $state, $timeout, $http) {
   theScope = '';
   login = {};
   registValues = {};
   function registPage($scope)
   {
        registValues = $scope.val;
       $state.go('tab.registering');
   }
   function LoginPage($scope)
   {
	    login.user = $scope.val.user;
        login.password = $scope.val.password;
        $state.go('tab.account');
   }
   function startLoginProcess($scope)
   {
        theScope = $scope;
        $timeout(connectToServer, 500);
   }
   function signUpNow($scope, registValues)
   {
       theScope = $scope;
       $timeout(registerToServer, 500);
   }
   function registerToServer()
   {
        theScope.layer1_hide = false;
 
        $http({
           method: 'GET',
           url: appConfig.registerURL
           }).then(function successCallback(response) {
                 theScope.loadIMG_0 = appImages.good;
                 $timeout(preparingforReg, 1000);
            }, function errorCallback(response) 
            {  theScope.loadIMG_0 = appImages.redcross; });
   }
   function connectToServer()
   {
        theScope.layer1_hide = false;
        $http({
           method: 'GET',
           url: appConfig.loginURL
           }).then(function successCallback(response) {
                 theScope.loadIMG_0 = appImages.good;
                 $timeout(preparingforLogin, 1000);
            }, function errorCallback(response) 
            {  theScope.loadIMG_0 = appImages.redcross; });
   }
   function preparingforLogin()
   {
        theScope.layer2_hide = false;
        $timeout(function() 
        { 
            theScope.loadIMG_1 = appImages.good;
            loginPassword(); 
        }, 1000);
   }
   function preparingforReg()
   {
        theScope.layer2_hide = false;
        $timeout(function() 
        { 
            theScope.loadIMG_1 = appImages.good;
            regData(); 
        }, 1000);
   }
   function regData()
   {
       theScope.layer3_hide = false;
       $timeout(function() 
        { 
            localStorage.setItem("userRegistered", 1);
            theScope.loadIMG_1 = appImages.good;
            //theScope.loadIMG_2 = appImages.redcross;
             theScope.loadIMG_2 = appImages.good;
              $ionicPopup.show({
                    template: '',
                    title: 'SignUp Successful',
                    subTitle: "You have successfully signed up.",
                    scope: '',
                    buttons: [
                    /*{ text: 'Cancel' },*/
                    {
                        text: '<b>OK</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                              $state.go('tab.dash');
                        }
                    }
                    ]
                }); 
        }, 1000);
   }
   function loginPassword()
   {
       theScope.layer3_hide = false;
       $timeout(function() 
        { 
            theScope.loadIMG_1 = appImages.good;
            if (typeof(login.user) == 'undefined') login.user = '';
            if (typeof(login.password) == 'undefined') login.password = '';
            if (login.user == '' || login.password == '')
            {
                 theScope.loadIMG_2 = appImages.redcross;
                 $state.go('tab.dash');
                 return;
            }
            else
            {
                if (login.user == 'ionic' && login.password == 'cyborg')
                {
                    theScope.loadIMG_2 = appImages.good;
                    localStorage.setItem("off_login", login.user);
                    localStorage.setItem("off_password", login.password);
                }
                else theScope.loadIMG_2 = appImages.redcross;
            }
        }, 1000);
   }
   function registerWarn($scope, warning)
   {
       
        $ionicPopup.show({
                    template: '',
                    title: 'Registration Error',
                    subTitle: warning,
                    scope: $scope,
                    buttons: [
                    /*{ text: 'Cancel' },*/
                    {
                        text: '<b>OK</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                        // add your action
                        }
                    }
                    ]
                }); 
   }
   function regValidate(val, $scope, sendPOP)
   {
       noErrors = true;
       if ( (typeof (val.user) == 'undefined' || val.user.trim() == '') || (typeof(val.password) == 'undefined' || val.password.trim() == ''))
       {   
           if (sendPOP) registerWarn($scope, 'Please provide both a valid username and password!');
           noErrors = false;
       }
       else if (val.password != val.password_2)
       {
           if (sendPOP) registerWarn($scope, 'The password and confirmation password are not identical!');
           noErrors = false;
       }
       else
       {
           var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (! re.test(val.email))
          {
             if (sendPOP) registerWarn($scope, 'Please provide a valid e-mail address!');
              noErrors = false;
          }
       }
       return noErrors;
   }
   return {
        startLogin: function($scope)
        {
            startLoginProcess($scope);
        },
        startRegist: function($scope)
        { 
           var noErrors = regValidate(registValues, $scope , false);
           if (! noErrors) { $state.go('tab.registration'); }
           else { signUpNow($scope, registValues); }
        },
        register: function($scope)
        {
            registValues = '';
            var noErrors = regValidate($scope.val, $scope, true);
            if (noErrors)
            { registPage($scope); }
        },
        offlogin: function($scope)
        {
            var wrongData = false;
            if (! localStorage.getItem("off_login") || ! localStorage.getItem("off_password"))
            { wrongData = true; }
            else
            {
                 var storedLogin = localStorage.getItem("off_login");
                 var storedPassword = localStorage.getItem("off_password");
                 if ($scope.val.user != storedLogin) wrongData = true;
                 if ($scope.val.password != storedPassword) wrongData = true;
            }

            if (wrongData == true)
            {
                 $ionicPopup.show({
                    template: '',
                    title: 'Login Error',
                    subTitle: 'Wrong username and password! Please note that you can only use \'Offline Mode\' after you have successfully performed your first \'Online\' login',
                    scope: $scope,
                    buttons: [
                    /*{ text: 'Cancel' },*/
                    {
                        text: '<b>OK</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                        // add your action
                        }
                    }
                    ]
                });
            } else 
            {
                login.user = $scope.val.user;
                login.password = $scope.val.password;
                $state.go('tab.account');
            }
        },
        login: function($scope, type) {
        if ($scope.val.user.length == 0 || $scope.val.password.length == 0)
        {
              $scope.data = {};
              $ionicPopup.show({
                template: '',
                title: 'Login Error',
                subTitle: 'Please provide both a valid username and password!',
                scope: $scope,
                buttons: [
                  /*{ text: 'Cancel' },*/
                  {
                    text: '<b>OK</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                      // add your action
                    }
                  }
                ]
              });
          }
          else 
          {  
              if (type == 'on') LoginPage($scope);
              else this.offlogin($scope);
          }
        } 
  };
});
