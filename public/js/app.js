
var app = angular.module('studentsApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider 
      .when('/', {
          templateUrl : 'partials/all_students.html',    // route for the home page
          controller : 'allCtrl'
      })
      .when('/all_students', {
          templateUrl : 'partials/all_students.html',
          controller : 'allCtrl'
      })
      .when('/add_student', {
          templateUrl : 'partials/add_student.html',    
          controller : 'addCtrl'
      })
      .when('/edit_students', {
          templateUrl : 'partials/edit_students.html',    
          controller : 'editCtrl'
      })
      .otherwise({
          redirectTo: 'partials/all_students.html'        // any other URL goes to home
      });
});


          /*   a controller for each page  */
app.controller('allCtrl', function($scope, $http) {
    
   $http.get("/showAll")     
     .then(function (response) {
	    $scope.students = response.data;  
     });
});


app.controller('addCtrl', function($scope, $http) {
  
   $scope.addStudent = function() {     
	   
	   var info = {
			sid: $scope.sid,     
			last_name: $scope.lastname,
			first_name: $scope.firstname,
			major: $scope.major
	   }
	   
	   url = '/addStudent';
	   
	   $http.post(url, info)                // post the object data
          .then(function (response) {
			 $scope.status = response.data;  //print status of request
	        								
		    $scope.sid = "";				// clear textboxes
	        $scope.firstname = "";
	        $scope.lastname = "";
       });   
   };
});


app.controller('editCtrl', function($scope, $http) {  
   
	$scope.getInfo = function() {  //Get info button function

		 var sid = $scope.sid;

		 url = '/getOne?sid=' + sid; //contact for get request

   		$http.get(url)
     	.then(function (response) {
     		student = response.data;

	    $scope.last_name = student.last_name;
	    $scope.major = student.major;
	    $scope.midterm = student.midterm;
	    $scope.final = student.final;  
	    
     	});

	}
   
    $scope.updateStudent = function() {  //update button function

	   var student = $scope.student;
	   
	   var info = {
	      sid : $scope.sid,
	      major : $scope.major,
	      midterm : $scope.midterm,
	      final : $scope.final
	   }

	   console.log(info);

	   url = '/updateStudent';

	   $http.post(url, info)
          .then(function (response) {
          	$scope.status = response.data;
			 $scope.student = $scope.students;
      });
	   
    }
});