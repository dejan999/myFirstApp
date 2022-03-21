var app = angular.module("Demo", ['ui.router'])


    .config(function ($stateProvider) {

        $stateProvider
            .state("reminders", {
                url: "/reminders",
                templateUrl: "Templates/reminders.html",
                controller: "remindersController",
                controllerAS: "remindersCtrl"
            })
            .state("newReminders", {
                url: "/newReminders",
                templateUrl: "Templates/newReminders.html",
                controller: "newRemindersController",
                controllerAS: "newRemindersCtrl"
            })

    })







    .controller("remindersController", function ($scope, $http, $log) {
        var vm = this;



        $http({
            method: 'GET',
            url: 'http://localhost:3000/reminders'
        })
            .then(function (response) {
                $scope.reminders = response.data;
                $log.info(response);
            })

        

    })

    

    .controller("newRemindersController", function ($scope, $http) {

        var data;

        $http({
            method: 'GET',
            url: 'http://localhost:3000/reminders'
        })
            .then(function (response) {
                $scope.reminders = response.data;

            })



        $scope.addEmp = function (empTitle, empDetalis, empDate) {
            data = {
                id: $scope.reminders.length + 1,
                reminder: empTitle,
                reminderDetalis: empDetalis,
                dateForReminder: empDate
            };
            //Call the services

            $http.post('http://localhost:3000/reminders', JSON.stringify(data)).then(function (response) {

                if (response.data)

                    $scope.msg = "Post Data Submitted Successfully!";
                alert($scope.msg);

            }, function (response) {

                $scope.msg = "Service not Exists";

                $scope.statusval = response.status;

                $scope.statustext = response.statusText;

                $scope.headers = response.headers();

            });
        }




    })

