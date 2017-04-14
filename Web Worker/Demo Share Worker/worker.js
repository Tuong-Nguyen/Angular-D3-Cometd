let ports = [],
    i = 0;

this.addEventListener('connect', function (e) {
    let port = e.ports[0];
    ports.push(port);
    //Start port 

    //When using the start() method to open the port connection, 
    // it needs to be called from both the parent thread and the worker thread 
    // if two-way communication is needed.
    port.start();

    setInterval(function () {
        i++;
        ports.forEach(function (port) {
            //Send data back
            port.postMessage('Sending Message ' + i);
        });

        // if (i == 10) {
        //     this.close();
        // }
    }, 500);
});