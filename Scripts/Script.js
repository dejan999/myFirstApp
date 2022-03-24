var app = angular.module("Demo", ['ui.router'])


    .config(function ($stateProvider) {

        $stateProvider
            .state("reminders", {
                url: "",
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
            .state("moreDetalis", {
                url: "/moreDetalis/{id:string}",
                templateUrl: "Templates/moreDetalis.html",
                controller: "moreDetalisController",
                controllerAS: "moreDetalisCtrl"
            })
            .state("updateReminder", {
                url: "/updateReminder/{id:string}",
                templateUrl: "Templates/updateReminder.html",
                controller: "updateReminderController",
                controllerAS: "updateReminderCtrl"
            })

    })

    .controller("remindersController", function ($scope, $state, $http, $log, httpService) {
        var vm = this;

        var pageNext = 1;
        var maxLimit;
        var newLimit;


        function newApi() {
            httpService.view(pageNext)
            .then(function (response) {
                $scope.reminders = response.data;

                maxLimit = response.headers('X-Total-Count');
                newLimit = Math.ceil(maxLimit / 4);
                console.log(newLimit);

            }

            )
        }
        newApi()




        $scope.next = function () {
            if (pageNext < newLimit) {
                pageNext++;
            }
           newApi()

        }
        $scope.previous = function () {
            if (pageNext > 1) {
                pageNext--;
            }

            newApi()

        }






        $scope.openMore = function (reminder) {
            $state.go("moreDetalis", { id: reminder.id })

        }

        $scope.update = function (reminder) {
            $state.go("updateReminder", { id: reminder.id })

        }

        $scope.delete = function (f) {

            var userval = confirm("Do you like to delite this reminder?!")

            if (userval == true) {
                $http.delete('http://localhost:3000/reminders/' + f).then(function (response) {

                    if (response.data)

                        newApi()

                    $scope.msg = "Reminder is deleted!";
                    alert($scope.msg);

                }, function (response) {

                    $scope.msg = "something is wrong";
                    alert($scope.msg);
                    $scope.statusval = response.status;

                    $scope.statustext = response.statusText;

                    $scope.headers = response.headers();

                });
            }






        }

    })

    .controller("moreDetalisController", function ($scope, $stateParams, $http) {

        $http({
            method: 'GET',
            url: 'http://localhost:3000/reminders',
            params: { id: $stateParams.id }
        })
            .then(function (response) {
                $scope.reminders = response.data;
                console.log($scope.reminders);
            })
    })

    .controller("updateReminderController", function ($scope, $state, $stateParams, $http) {

        var data;

        $http({
            method: 'GET',
            url: 'http://localhost:3000/reminders',
            params: { id: $stateParams.id }
        })
            .then(function (response) {
                response.data[0].dateForReminder = new Date(response.data[0].dateForReminder);
                $scope.reminders = response.data;
                console.log($scope.reminders);
            })


        $scope.newUpdate = function () {



            $http.put('http://localhost:3000/reminders/' + $scope.reminders[0].id, JSON.stringify($scope.reminders[0])).then(function (response) {

                if (response.data)

                    $http({
                        method: 'GET',
                        url: 'http://localhost:3000/reminders',

                    })
                        .then(function (response) {
                            response.data[0].dateForReminder = new Date(response.data[0].dateForReminder);
                            $scope.reminders = response.data;

                        })

                $scope.msg = "Reminder is updated!";
                alert($scope.msg);
                $state.go("reminders")


            }, function (response) {

                $scope.msg = "Something is wrong";
                alert($scope.msg);
                $scope.statusval = response.status;

                $scope.statustext = response.statusText;

                $scope.headers = response.headers();

            });
        }

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
                // id: $scope.reminders.length + 1,
                reminder: empTitle,
                reminderDetalis: empDetalis,
                dateForReminder: empDate
            };
            //Call the services

            if (data.reminder == null || data.reminderDetalis == null || data.dateForReminder == null) {
                alert("Please, fill in all fields!")
            }
            else {
                $http.post('http://localhost:3000/reminders', JSON.stringify(data)).then(function (response) {

                    if (response.data)


                        $scope.msg = "Post Data Submitted Successfully!";
                    alert($scope.msg);

                }, function (response) {

                    $scope.msg = "Service not Exists";
                    alert($scope.msg);
                    $scope.statusval = response.status;

                    $scope.statustext = response.statusText;

                    $scope.headers = response.headers();

                });

                $scope.empTitle = '';
                $scope.empDetalis = '';
                $scope.empDate = '';
            }



        }




    })

