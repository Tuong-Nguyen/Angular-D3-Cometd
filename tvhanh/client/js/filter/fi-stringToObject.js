(function () {
    var getParamByName = angular.module('stringToObject', []);

    getParamByName.filter('stringToObject', function () {
        return function (string, field) {
            if(angular.isUndefined(string)){
                return "";
            }
            else{
                var object = string;
                if(field == "label"){
                    return object.label
                }
                else{
                    return object.value
                }
            }
        };
    });
}())