// Element Seçme;

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();
function eventListeners() { // tüm event listenerlar.

    form.addEventListener("submit", addTodo);
    // Sayfa yüklendiğinde local storage'da bulunan todo'ları UI ' a ekleme;
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);

}

function loadAllTodosToUI() {  // local storage'da bulunan todo'ları UI ' a ekleme;
    let todos = getTodosFromStorage();
    // !! For metoduyla ekleme ; 
    // for (let i = 0; i < todos.length; i++) {
    //     const element = todos[i];
    //     addTodoToUI(element);    
    // }

    todos.forEach(todo => {
        addTodoToUI(todo);
    });

}

function addTodo(e) {

    const newTodo = todoInput.value.trim(); // trim sayesinde input içindeki baş ve sondaki boşlukları almaz.

    if (newTodo === "") {

        showAlert("danger", "Lütfen bir todo girin..");

    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Başarılı bir şekilde eklendi.");
    }



    // sayfayı yenilememesi için.
    e.preventDefault();
}

// Storage'dan bütün todo ları alır.
function getTodosFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Uyarı Mesajları;
function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`
    alert.textContent = message;
    firstCardBody.appendChild(alert);

    // alert göründükten bir sn sonra silinmesini istiyoruz.; setTimeout metodu;

    setTimeout(function () {
        alert.remove();
    }, 1500)

}


// Arayüze todoyu ekle;
function addTodoToUI(newTodo) { // String değerini list item olarak UI'a ekleyecek.

    // List Item Oluşturma
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between"

    // Link Oluşturma
    const link = document.createElement("a");
    link.className = "delete-item";
    link.href = "#"
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Text Node Ekleme;
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Todo list'e listitem'i ekleme;
    todoList.appendChild(listItem);
    todoInput.value = "";
}


// DeleteTodo todoları secondcardbody üzerinde çarpı basarak silme;
function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo başarıyla silindi");
    }


    e.preventDefault();
}



// Todo ları storage'dan silme
function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1); // Arraydan değeri silme
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Filtreleme;

function filterTodos(e) {

    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            // Bulamadı
            listItem.setAttribute("style", "display : none !important");
        } else {
            listItem.setAttribute("style", "display: block");
        }

    })

}


// tüm taskları temizleyin fonkisyonu

function clearAllTodos(e) {
    if (confirm("Tümünü silmek istediğinize emin misiniz ?")) {
        // Arayüzden todo'ları temizleme
        // todoList.innerHTML = "" // yavaş yöntem.

        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}




