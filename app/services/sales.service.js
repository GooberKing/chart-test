// Service for calling the REST API for retrieving records
serviceModule.service('SalesService', ['$resource', function SalesService($resource) {
    var SalesResource = $resource('http://127.0.0.1:3000', {stat:'', cohort:''});

    //Wrapper function that returns a promise from the server to return data
    this.getData = function(stat, cohort, callback) {
        return SalesResource.query({'stat': stat, 'cohort': cohort}, callback);
    };
}]);