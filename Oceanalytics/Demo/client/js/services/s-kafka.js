(function () {
    var client = angular.module('client');
    var kafka = function ($http, $q) {

        var config = {
                headers: {
                    "Content-Type": "application/vnd.kafka.v2+json"
                }
            };
        var basaeUlr = "http://11.11.254.102:8082";
        
        var addRecord = function (data, topic) {
            var config = {
                headers: {
                    "Content-Type": "application/vnd.kafka.json.v2+json",
                    "Accept": "application/vnd.kafka.v2+json, application/vnd.kafka+json, application/json"
                }
            };
            return $http.post(basaeUlr + '/topics/' + topic, data, config).then(function (response) {
                return response.data;
            });
         };

        var getRecords = function (urlInstance) {
            var config = {
                headers: {
                    "Accept": "application/vnd.kafka.json.v2+json"
                }
            };
            return $http.get(urlInstance + '/records', config).then(function (response) {
                return response.data;
            });
        };

        var createInstance = function (groupName, data) {
            return $http.post(basaeUlr + '/consumers/' + groupName, data, config).then(function (response) {
                return response.data;
            });
        };

        var subscribe = function (urlInstance, data) {
            
            return $http.post(urlInstance + '/subscription', data, config).then(function (response) {
                return response.data;
            });
        };


        var deleteInstance = function (urlInstance) {
            return $http.delete(urlInstance, config).then(function (response) {
                return response.data;
            });
        };

        //Return result
        return {
            addRecord: addRecord,
            getRecords: getRecords,
            createInstance: createInstance,
            deleteInstance: deleteInstance,
            subscribe: subscribe
        };
    };
    client.factory('kafka', kafka);
}())