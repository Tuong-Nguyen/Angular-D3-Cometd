/**
 * Created by lnthao on 4/14/2017.
 */

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
        var objectStoreTodo = db.createObjectStore('todo', {keyPath: 'timeStamp'});
        objectStoreTodo.createIndex("text", "text", {unique: false});
    };
}

function addTodo(text, callback) {
    var transaction = db.transaction(['todo'], 'readwrite');
    var store = transaction.objectStore('todo');
    var request = store.put({
        text: text,
        timeStamp: Date.now()
    });

    transaction.oncomplete = function (e) {
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
    cursorRequest.onsuccess = function (e) {
        var result = e.target.result;

        if (result) {
            data.push(result.value);
            result.continue();
        } else {
            callback(data);
        }
    }
}

function getTodo(id, callback) {
    var transaction = db.transaction(['todo'], 'readonly');
    var store = transaction.objectStore('todo');
    var request = store.get(id);
    request.onsuccess = function (e) {
        var data = e.target.result;
        if (data) {
            callback(data);
        }
    }
    request.onerror = databaseError;
}

function deleteTodo(id, callback) {
    var transaction = db.transaction(['todo'], 'readwrite');
    var store = transaction.objectStore('todo');
    var request = store.delete(id);
    transaction.oncomplete = function (e) {
        callback();
    }
    request.onerror = databaseError;
}

function getByContent(keyword, callback) {
    var transaction = db.transaction(['todo'], 'readonly');
    var store = transaction.objectStore('todo');
    var index = store.index('text');
    // use a trick to get startswith "keyword" item by adding highest value character
    var rangeMemoStartsWith = IDBKeyRange.bound(keyword, keyword + '\uffff');
    // prev: The cursor shows all records, including duplicates.
    // It starts at the upper bound of the key range and moves downwards
    var cursorRequest = index.openCursor(rangeMemoStartsWith, 'prev');

    var data = [];
    // Fires once per row in the store
    cursorRequest.onsuccess = function (e) {
        var result = e.target.result;

        if (result) {
            data.push(result.value);
            result.continue();
        } else {
            callback(data);
        }
    };
}
