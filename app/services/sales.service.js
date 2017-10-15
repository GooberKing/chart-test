angular.module('services').service('SalesService', ['$resource', function SalesService($resource) {
    var SalesResource = $resource('http://127.0.0.1:3000', {stat:'', cohort:''});

    this.getData = function(stat, cohort, callback) {
        return SalesResource.query({'stat': stat, 'cohort': cohort}, callback);
    };
}]);