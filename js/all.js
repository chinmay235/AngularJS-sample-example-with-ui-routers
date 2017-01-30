/* ----------------------- ROUTER START ---------------------------- */
function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/dashboards");

    $stateProvider
            .state('dashboards', {
        url: "/dashboards",
        templateUrl: "views/dashboard.html",
    }).state('about_us', {
        url: "/about-us",
        data: {pageTitle: 'About Us'},
        templateUrl: "views/about-us.html",
        controller: 'AboutUsController'
    }).state('contact_us', {
        url: "/contact-us",
        data: {pageTitle: 'Contact Us'},
        templateUrl: "views/contact-us.html",
        controller: 'ContactUsController'
    }).state('users', {
        url: "/users",
        data: {pageTitle: 'User Listing'},
        templateUrl: "views/user_listing.html",
        controller: 'UsersController'
    }).state('users_details', {
        url: "/view-users/:id",
        templateUrl: "views/user_details.html",
        controller: 'UsersController'
    }).state('edit_user', {
        url: "/edit-users/:id",
        templateUrl: "views/edit_user.html",
        controller: 'UsersController'
    })
    ;
}
/* -----------------------###############{ ROUTER END }###############---------------------------- */

/* -----------------------###############{ CONTROLLER START }###############---------------------------- */
function MainController($scope) {
    /*Write here your common code */
}

function HomeController($scope) {

}
function AboutUsController($scope) {
    $scope.content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
}
function ContactUsController($scope) {
    $scope.submitForm = function() {
        $scope.result = $scope.formData;
    };
}
function UsersController($scope, $stateParams) {
    $scope.emp_det = [
        {id: 1, name: 'Chinu Sahu', email: 'chinmay235@gmail.com', city: 'Bhubaneswar', age: '27'},
        {id: 2, name: 'Sanjib Pradhan', email: 'psanjib.tutu@gmail.com', city: 'Cuttack', age: '28'},
        {id: 3, name: 'Aruna Tripathy', email: 'arunatripathy@gmail.com', city: 'Jajpur', age: '29'},
        {id: 4, name: 'Debasis Das', email: 'das.debasish@gmail.com', city: 'Balasore', age: '30'},
        {id: 5, name: 'Sradhanjali Behera', email: 'sradhak15@gmail.com', city: 'Bhubaneswar', age: '25'}
    ];
    var data = {};
    if ($stateParams.id) {
        angular.forEach($scope.emp_det, function(emp) {
            if (emp.id == $stateParams.id)
                data = emp;
        });
        $scope.data = data;
    }

    $scope.deleteUser = function(i) {
        var con = confirm("Are you sure want to delete?");
        if (con === true) {
            $scope.emp_det.splice(i, 1);
        }
    };
}
/* -----------------------###############{ CONTROLLER END }###############------------------------------- */


/* -----------------------###########{ DIRECTIVE START }###########---------------------------- */
function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title - load on Dashboard 1
                var title = 'AngularJS Tutorial';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle)
                    title = 'My First AJ | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    }
}
;
/* -----------------------###########{ DIRECTIVE END }################---------------------------- */


/*
 angular.module('myApp', []);
 angular.module('myApp').controller('SimpleController', SimpleController);
 */
angular.module('myApp', ['ui.router'])
        .config(config)
        .directive('pageTitle', pageTitle)
        .controller('MainController', MainController)
        .controller('HomeController', HomeController)
        .controller('AboutUsController', AboutUsController)
        .controller('ContactUsController', ContactUsController)
        .controller('UsersController', UsersController)
        .run(function($rootScope, $state) {
    $rootScope.$state = $state;
});