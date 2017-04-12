/**
 * Created by lnthao on 4/12/2017.
 */
(function() {
// 'global' variable to store reference to the database
    var db, input;

    databaseOpen(function () {
        alert("The database has been opened");
        input = document.getElementById('todo_text');
        document.body.addEventListener('submit', onSubmit);
        getTodos(renderData);
    });

    function onSubmit(e) {
        e.preventDefault();
        addTodo(input.value, function() {
            // clear textbox
            input.value = '';
        });
    }

    function renderData(todos) {
        var html = '';
        todos.forEach(function(todo) {
            html += '<li>' + todo.text  + '</li>';
        });
        document.getElementById('todo_list').innerHTML = html;
    }

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

    /* CRUD to-do */
    function addTodo(text, callback) {
        var transaction = db.transaction(['todo'], 'readwrite');
        var store = transaction.objectStore('todo');
        var request = store.put({
            text: text,
            timeStamp: Date.now()
        });

        transaction.oncomplete = function(e) {
            callback();
        };
        request.onerror = databaseError;
    }

    function getTodos(callback) {
        var transaction = db.transaction(['todo'], 'readonly');
        var store = transaction.objectStore('todo');
        // get entry with key >= 0 (get all)
        var keyRange = IDBKeyRange.lowerBound(0);
        var cursorRequest = store.openCursor(keyRange);

        var data = [];
        // Fires once per row in the store
        cursorRequest.onsuccess = function(e) {
            var result = e.target.result;

            if (result) {
                data.push(result.value);
                result.continue();
            } else {
                callback(data);
            }
        }
    }

}());