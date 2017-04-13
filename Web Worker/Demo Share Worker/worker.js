let ports = [],
    i = 0;

this.addEventListener('connect', function (e) {
    let port = e.ports[0];
    ports.push(port);
    port.start();

    setInterval(function () {
        i++;
        ports.forEach(function (port) {
            port.postMessage('Sending Message ' + i);
        });

        // if (i == 10) {
        //     this.close();
        // }
    }, 500);
});