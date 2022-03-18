var app = angular.module("Demo", ["ui.router"])
    .config(function ($stateProvider) {

        $stateProvider
            .state("reminders", {
                url: "/reminders",
                templateUrl: "Templates/reminders.html",
                controller:"remindersController",
                controllerAS:"remindersCtrl"
            })

    })
    .controller("remindersController",function ($scope,$http,$log) {
        var vm=this;

        $http({
            method:'GET',
            url:'http://localhost:3000/reminders'})
            .then(function (response) {
                $scope.reminders=response.data;
                $log.info(response);
            })
            
    })