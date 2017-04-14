/**
 * Created by lnthao on 4/12/2017.
 */
// 'global' variable to store reference to the database
var db, input;

databaseOpen(function () {
    alert("The database has been opened");
    input = document.getElementById('todo_text');
    document.body.addEventListener('submit', onSubmit);
    document.getElementById('searchBtn').addEventListener('click', onClickButtonSearch);
    loadData();
});

function onSubmit(e) {
    e.preventDefault();
    addTodo(input.value, function() {
        loadData();
        // clear textbox
        input.value = '';
    }, errorHandler);
}

function onClickButtonSearch(e) {
    getByContent(input.value, renderData, errorHandler);
}

function addEventListenerToAllItem() {
    // convert HtmlCollection to array using ES6
    var lis = Array.from(document.getElementById("todo_list").getElementsByTagName("li"));
    lis.forEach(function (li) {
        li.addEventListener('click', onClick);
        li.addEventListener('mouseover', onHover, true);
    });
}

function onClick(e) {
    if (e.target.hasAttribute('id')) {
        var intId = parseInt(e.target.getAttribute('id'), 0);
        deleteTodo(intId, function() {
           loadData();
        }, errorHandler);
    }
}

function onHover(e) {
    if (e.target.hasAttribute('id')) {
        var intId = parseInt(e.target.getAttribute('id'), 0);
        getTodo(intId, renderDetail, errorHandler);
    }
}

function renderDetail(todo) {
    var detailDiv = document.getElementById('detail');
    var html = '<div class="memoAt">At: ' + new Date(todo.timeStamp) + '</div>';
    html += '<br/>';
    html += '<div class="memo">' + todo.text + '</div>';
    detailDiv.innerHTML = html;
}

function loadData() {
    getTodos(renderData, errorHandler);
}

function renderData(todos) {
    var html = '';
    todos.forEach(function(todo) {
        html += '<li id="'+ todo.timeStamp +'">' + todo.text  + '</li>';
    });
    document.getElementById('todo_list').innerHTML = html;
    addEventListenerToAllItem();
}

function errorHandler(e) {
    console.error('An IndexedDB error has occurred', e);
}
