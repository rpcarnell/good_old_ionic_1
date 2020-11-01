angular.module('starter.controllers', [])
.controller('InfoCtrl', function($scope, $state)
{
	   $scope.infoback = function()
		 {  
          $state.go('tab.dash');
		 }
})
.controller('StartAccountCtrl', function($scope, userServices)
{
     $scope.startRegistration =function()
		 {
        userServices.startRegist($scope);
		 }
		 $scope.loginafterregis = function()
		 {
			 
		 }
		 $scope.loadIMG_0 = "img/loading.gif";
			$scope.loadIMG_1 = "img/loading.gif";
			$scope.loadIMG_2 = "img/loading.gif";
			$scope.layer1_hide = true;
			$scope.layer2_hide = true;
			$scope.layer3_hide = true;
		  $scope.showHeader = function()
		  {   
         return true;
		  };
			$scope.hideLayer_1 = function()
			{
				 return $scope.layer1_hide;
			};
      $scope.hideLayer_2 = function()
			{
				 return $scope.layer2_hide;
			};
			$scope.hideLayer_3 = function()
			{
				 return $scope.layer3_hide;
			}
})
.controller('RegCtrl', function(loginImages, userServices, $state, $scope)
{
	  $scope.val = {};
		$scope.val.user = '';
	  $scope.val.password = '';
	  $scope.val.password_2 = '';
		 $scope.val.email = '';
	  $scope.xuser = true;
		$scope.xemail = true;
	  $scope.xpassReg = true;
		$scope.xpassReg_2 = true;
	 	$scope.loginimage =  loginImages.login;
    $scope.regback = function()
		{
		     $state.go("tab.dash");
		};
		$scope.userType = function()
		{
			 if ($scope.val.user.length > 0) $scope.xuser = false;
		   else $scope.xuser = true;
		};
		$scope.clearRegUser = function()
    {
		    $scope.val.user = '';
				$scope.xuser = true;
		};
	  $scope.passwordType = function()
	  {
			 if ($scope.val.password.length > 0) $scope.xpassReg = false;
		   else $scope.xpassReg = true;
	  };
		$scope.passwordType_2 = function()
	  {
			 if ($scope.val.password_2.length > 0) $scope.xpassReg_2 = false;
		   else $scope.xpassReg_2 = true;
	  };
		$scope.clearRegPass_2 = function()
		{
		   $scope.val.password_2 = '';
		   $scope.xpassReg_2 = true;
		};
		$scope.clearRegPass = function()
		{
		   $scope.val.password = '';
		   $scope.xpassReg = true;
		};
		$scope.clearEmail = function()
		{
		   $scope.val.email = '';
		   $scope.xemail = true;
		};
		$scope.emailType = function()
	  {
			 if ($scope.val.email.length > 0) $scope.xemail = false;
		   else $scope.xemail = true;
	  };
		$scope.checkFocus = function(valto)
		{    
		    $scope.xuser = true;
				$scope.xpassReg = true;
				$scope.xpassReg_2 = true;
				$scope.xemail = true;
		    if (valto == 'xuser')
				{ $scope.userType(); }
				else if (valto == 'xpassReg')
				{ $scope.passwordType(); }
				else if (valto == 'xpassReg_2')
				{ $scope.passwordType_2(); }
				else if (valto == 'email')
				{ $scope.emailType(); }
		};
		$scope.register = function()
		{
			    userServices.register($scope);
		}
})
.controller('LoginCtrl', function($window, $scope, $state, userServices, loginImages) 
{
	  $scope.val = {};
		$scope.val.user = '';
	  $scope.val.password = '';
	  $scope.xuser = true;
	  $scope.xpassword = true;
		$scope.offlogin_image = loginImages.off;
		$scope.loginimage =  loginImages.login;
		$scope.heightpx = ($window.innerHeight - 390) + "px";
		$scope.infopage = function()
		{
		     $state.go("tab.info");
		};
		$scope.userAlreadySignUp = function()
		{
			   var already = localStorage.getItem("userRegistered");
				 if (! already) return true;
				 else return false;
		};
		$scope.signup = function()
		{  
		     $state.go("tab.registration");
		};
	  $scope.showHeader = function()
		{
         return true;
		};
		$scope.formInit = function()
		{
		  //	localStorage.clear();
        var rememberUser = localStorage.getItem("rememberUser");
			  rememberUser = (parseInt(rememberUser) === 1) ? true : false;
			  if (rememberUser === true && localStorage.getItem("off_login"))
				{
					   $scope.val.user = localStorage.getItem("off_login");
				} 
        $scope.rememberUser = rememberUser;
/*
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
    alert("Cannot detect fingerprint device : "+ message);
});*/
//*******************************************************************
		};
	  $scope.login = function()
	  {
		    userServices.login($scope, 'on');
	  };
		$scope.loginOffline = function()
	  {
         userServices.login($scope, 'off');
	  };
		$scope.changeRemember = function()
    {  
        if ($scope.rememberUser == true)
				{
					   $scope.rememberUser = false;
						 localStorage.setItem("rememberUser", 0);
				}
				else 
				{
					  $scope.rememberUser = true;
						localStorage.setItem("rememberUser", 1);
				}
		};
	  $scope.userType = function()
	  {
		  if ($scope.val.user.length > 0) $scope.xuser = false;
		  else $scope.xuser = true;
	  };
	  $scope.passwordType = function()
	  {
		  if ($scope.val.password.length > 0) $scope.xpassword = false;
		  else $scope.xpassword = true;
	  };
	  $scope.clearUser = function()
	  {
		  $scope.val.user = '';
		  $scope.xuser = true;
	  
	  };
	  $scope.clearPassword = function()
	  {
		  $scope.val.password = '';
		  $scope.xpassword = true;
	  };
		 
})
.controller('AccountCtrl', function($scope, userServices) {
      $scope.loadIMG_0 = "img/loading.gif";
			$scope.loadIMG_1 = "img/loading.gif";
			$scope.loadIMG_2 = "img/loading.gif";
			$scope.layer1_hide = true;
			$scope.layer2_hide = true;
			$scope.layer3_hide = true;
		  $scope.startLogin = function()
			{
				  console.log('start login');
					userServices.startLogin($scope);
			};
			$scope.showHeader = function()
		  {   
         return true;
		  };
			$scope.hideLayer_1 = function()
			{
				 return $scope.layer1_hide;
			};
      $scope.hideLayer_2 = function()
			{
				 return $scope.layer2_hide;
			};
			$scope.hideLayer_3 = function()
			{
				 return $scope.layer3_hide;
			}
});


