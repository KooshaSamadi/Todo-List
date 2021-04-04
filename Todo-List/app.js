// Selectors
const formInput = document.querySelector(".form-input");
const formInputButton = document.querySelector(".form-input-button");
const todolist = document.querySelector(".todo-list");
const todooption = document.querySelector(".selectoption");

// EventListeners
document.addEventListener("DOMContentLoaded", getfromlocalst());
formInputButton.addEventListener("click", addItem);
todolist.addEventListener("click", deleteComplete);
todooption.addEventListener("click", filteroption);

// Functions
function addItem(event) {
  //check if input is null or not
  if (formInput.value == "") {
    alert("Please define a task");
  } else {
    event.preventDefault();
    //create ToDo div globally
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("TodoDiv");
    //create Todo li
    const todoLi = document.createElement("li");
    todoLi.innerText = formInput.value;
    todoLi.classList.add("todoLi");
    todoDiv.appendChild(todoLi);
    //Local storage set item
    savetolocalst(formInput.value);
    //create completed button
    const completedBtn = document.createElement("button");
    completedBtn.classList.add("completedBtn");
    completedBtn.innerText = "Complete";
    todoDiv.appendChild(completedBtn);
    //create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerText = "Delete";
    todoDiv.appendChild(deleteBtn);
    //Append all to ul
    todolist.appendChild(todoDiv);
    //clear input value
    formInput.value = "";
  }
}

function deleteComplete(event) {
  const item = event.target;
  // delete toDo
  if (item.classList[0] == "deleteBtn") {
    const delitem = item.parentElement;
    removefromlocalst(delitem);
    delitem.classList.add("fall");
    //wait till transition end
    delitem.addEventListener("transitionend", function () {
      delitem.remove();
    });
  }
  //complete toDo
  if (item.classList[0] == "completedBtn") {
    const compitem = item.parentElement;
    compitem.classList.toggle("completed");
  }
}

function filteroption(event) {
  const todos = todolist.childNodes;

  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

//Webstorage -- local storage
function savetolocalst(todo) {
  //check if i already have local storagee in there?
  //todos=>key
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getfromlocalst() {
  //todos=>key
  let todos;
  todos = JSON.parse(localStorage.getItem("todos"));
  if (todos != null) {
    todos.forEach(function (todo) {
      //create ToDo div globally
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("TodoDiv");
      //create Todo li
      const todoLi = document.createElement("li");
      todoLi.innerText = todo;
      todoLi.classList.add("todoLi");
      todoDiv.appendChild(todoLi);
      //create completed button
      const completedBtn = document.createElement("button");
      completedBtn.classList.add("completedBtn");
      completedBtn.innerText = "Complete";
      todoDiv.appendChild(completedBtn);
      //create delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("deleteBtn");
      deleteBtn.innerText = "Delete";
      todoDiv.appendChild(deleteBtn);
      //Append all to ul
      todolist.appendChild(todoDiv);
    });
  }
}

function removefromlocalst(todo) {
  let todos;
  todos = JSON.parse(localStorage.getItem("todos"));
  if (todos != null) {
    const indextodo = todos.indexOf(todo.childNodes[0].innerText);
    console.log(indextodo);
    todos.splice(indextodo, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
