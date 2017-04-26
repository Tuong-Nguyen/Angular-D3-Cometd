(function () {
    var client = angular.module('client');

    //Configure environment
    client.constant('env', {
	  	SERVER: "http://localhost:8000",
	});

    //Set token on header
	client.run(function ($http) {
		$http.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRvd3RydWNrQGdtYWlsLmNvbSIsInRvd1RydWNrQ29tcGFueSI6eyJfaWQiOiI1OGNiOWYxOTRlZGVlYTZlNGJkNTI0MTQiLCJuYW1lIjoiaGJuMiIsImNvdW50cnlDb2RlIjoiVk4iLCJwaG9uZSI6IjEyMzQ1Njc4OTAifSwicm9sZSI6IkNPTVBBTllfQURNSU4iLCJzdGF0dXMiOiJBQ1RJVkUiLCJuYW1lIjoiQWRtaW4gQWNjb3VudCIsImNvbXBhbnlUeXBlIjoiVE9XX1RSVUNLIiwiX2lkIjoiNThjMjBjY2NkMDI3NTczNjQ1MDY5ZTRkIiwiaWF0IjoxNDkxNDA5MTcwfQ.x1WMmRjedlAK2UgSgG1C0ojDKVnDdDGa9_K3dhigw6Q';
	});
}())