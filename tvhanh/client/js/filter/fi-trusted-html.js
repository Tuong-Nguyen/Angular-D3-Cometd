(function () {
    var trustedHtml = angular.module('trustedHtml', []);

    trustedHtml.filter('trustedHtml', function ($sce) {
        return function (html) {
            if (!angular.isUndefined(html)) {
                return $sce.trustAsHtml(html);
            }
        };
    });
}())