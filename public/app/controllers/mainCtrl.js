angular.module('mainCtrl', [])

  .controller('mainController', function($rootScope, $location, Auth){
    var vm = this;
    vm.loggedIn = Auth.isLoggedIn();

    $rootScope.$on('$routeChangeStart', function() {
  		vm.loggedIn = Auth.isLoggedIn();

  		Auth.getUser()
  			.then(function(data) {
  				vm.user = data.data;
  			});
  	});

    vm.doSignup = function() {
      Auth.signup(vm.signupData).
      then(function(data) {
        vm.message = data.data.message
      })
    }

    vm.doLogin = function() {

  		vm.error = '';

  		Auth.login(vm.loginData.username, vm.loginData.password)
  			.then(function(data) {

  				if (data.success)
  					$location.path('/users');
  				else
  					vm.error = data.message;

  			});
  	};

    vm.doLogout = function() {
  		Auth.logout();
  		vm.user = '';

  		$location.path('/login');
  	};

  	vm.createSample = function() {
  		Auth.createSampleUser();
  	};

  })
