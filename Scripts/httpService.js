angular.module("Demo").factory('httpService',function ($http) {
    
    function view(pageNext) {
        
        return $http({
            method: 'GET',
            url: 'http://localhost:3000/reminders?_page=' + pageNext + '&_limit=4'
            
        })
        .then(function (response) {
            
            return response;
            
            
        })
    }
    return{
        view:view
        
    }
})