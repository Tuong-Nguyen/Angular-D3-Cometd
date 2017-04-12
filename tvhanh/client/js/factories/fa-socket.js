(function(){
	var client = angular.module('client');
	var socket = function(socketFactory, env){
		var myIoSocket = io.connect(env.SERVER);
  		return socketFactory({ ioSocket: myIoSocket });
	}
	client.factory('socket', socket);
}());