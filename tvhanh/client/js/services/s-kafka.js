(function () {
    var client = angular.module('client');
    var kafka = function ($http, $q) {

        var config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            };
        var basaeUlr = "http://localhost:8082";
        
        var addRecord = function (data) {
            return $http.post(basaeUlr + '/topics/test/partitions/0', data).then(function (response) {
                return response.data;
            });
         };

         var getRecords = function (data) {
            return $http.get(basaeUlr + '/consumers/hanh/instances/hanh/topics/test').then(function (response) {
                return response.data;
            });
         };

        //Return result
        return {
            addRecord: addRecord,
            getRecords: getRecords
        };
    };
    client.factory('kafka', kafka);
}())