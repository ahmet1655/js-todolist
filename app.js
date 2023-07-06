const form = document.querySelector("#todoAddForm")
const input = document.querySelector("#todoName")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const clearButton = document.querySelector("#clearButton")
const todoList = document.querySelector(".list-group");
const todoFilter = document.querySelector("#todoSearch")
runEventListers();
let todos = [];

function runEventListers() {
    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded", storageToUI)
    secondCardBody.addEventListener("click", removeTodoToUI)
    clearButton.addEventListener("click", removeAllTodosFromEverywhere)
    todoFilter.addEventListener("keyup", filter)

}

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListItem = document.querySelectorAll(".list-group-item")
    if (todoListItem.length > 0) {
        todoListItem.forEach((todo) => {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {

                todo.setAttribute("style", "display : block")
            }
            else {

                todo.setAttribute("style", "display : none !important");
            }

        })
    }
    else {
        alertBox("warning", "En az bir todo eklemeden filtreleme yapamazsınız")
    }

}
function removeAllTodosFromEverywhere() {
    const todoListItem = document.querySelectorAll(".list-group-item")

    if (todoListItem.length > 0) {
        todoListItem.forEach((todo) => {
            todo.remove();
        })

        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos))
        alertBox("success", "Todolar silindi")
    }
    else {
        alertBox("danger", "Todoları silmek için en az bir todo eklemelisiniz")
    }
}

function removeTodoToStorage(removeTodo) {
    checkStorage()
    todos.forEach((todo, index) => {
        if (removeTodo === todo) {
            todos.splice(index, 1)
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos))
}
function removeTodoToUI(e) {

    if (e.target.className === ("fa fa-remove")) {
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        removeTodoToStorage(todo.textContent)
        alertBox("success", "Todo silindi")
    }
}

function storageToUI() {
    checkStorage()
    todos.forEach((todo) => addTodoToUI(todo))
}

function addTodo(e) {
    const inputTodo = input.value.trim()
    if (inputTodo == null || inputTodo == "") {

        alertBox("danger", "Todo eklemediniz")
    }
    else {
        addTodoToUI(inputTodo)
        addTodoToStorage(inputTodo)
        alertBox("success", "Todo eklendi")
    }

    e.preventDefault()

}

function addTodoToUI(inputTodo) {

    const li = document.createElement("li")
    li.className = "list-group-item d-flex justify-content-between"
    li.textContent = inputTodo

    const a = document.createElement("a")
    a.href = "#"
    a.className = "delete-item"

    const i = document.createElement("i")
    i.className = "fa fa-remove"

    a.appendChild(i)
    li.appendChild(a)
    todoList.appendChild(li)
}

function addTodoToStorage(addTodo) {
    checkStorage();
    todos.push(addTodo);
    localStorage.setItem("todos", JSON.stringify(todos))
    input.value = ""
}

function checkStorage() {
    if (localStorage.getItem("todos") === null || localStorage.getItem("todos") == "") {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos",))
    }
}


function alertBox(type, message) {
    const div = document.createElement("div")
    div.className = `alert alert-${type}`
    div.textContent = message
    let card = firstCardBody.appendChild(div)

    setTimeout(() => {
        card.remove()
    }, 2000);
}




