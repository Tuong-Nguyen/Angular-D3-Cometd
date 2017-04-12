(function () {
    var client = angular.module('client');
    var test = function ($http, $q) {

        var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        
         /**
         * [getData description]
         * @param  {[type]} urls [description]
         * @return {[type]}      [description]
         */
        var getData = function (urls) {
            var deferred = $q.defer();
            var urlCalls = [];
            angular.forEach(urls, function(url) {
                urlCalls.push($http.get(url, config));
            });
            //Execute urls to get data
            $q.all(urlCalls).then(function (results) {
                deferred.resolve(results);
            },
            function (errors) {
                deferred.reject(errors);
            },
            function (updates) {
                deferred.update(updates);
            }
            );
            return deferred.promise;
        };
        

        //Return result
        return {
            getData: getData
        };
    };
    client.factory('test', test);
}())