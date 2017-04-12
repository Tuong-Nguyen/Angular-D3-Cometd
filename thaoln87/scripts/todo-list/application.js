/**
 * Created by lnthao on 4/12/2017.
 */
(function() {
// 'global' variable to store reference to the database
    var db;

    databaseOpen(function () {
        alert("The database has been opened");
    });

    function databaseOpen(callback) {
        // Open a database, specify the name and version
        var version = 1;
        var request = indexedDB.open('todos', version);

        request.onsuccess = function (e) {
            db = e.target.result;
            callback();
        };
        request.onerror = databaseError;

        // Run migrations if necessary
        request.onupgradeneeded = function (e) {
            db = e.target.result;
            e.target.transaction.onerror = databaseError;
            db.createObjectStore('todo', {keyPath: 'timeStamp'});
        };
    }

    function databaseError(e) {
        console.error('An IndexedDB error has occurred', e);
    }
}());