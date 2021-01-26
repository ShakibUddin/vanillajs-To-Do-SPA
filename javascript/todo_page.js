import {assignContent} from "/javascript/app_content.js";
import {homePage,displayCurrentTodos} from "/javascript/home_page.js";
import {myStorage,setCurrentUser,getCurrentUser,updateCurrentUserToDo} from "/javascript/storage.js";

export let todoPage = document.createElement("div");

const errorDiv = document.createElement("div");
const heading = document.createElement("div");
const inputDiv = document.createElement("div");
const todoNameLabel = document.createElement("LABEL");
const todoName = document.createElement("INPUT");
const todoLabel = document.createElement("LABEL");
const todo = document.createElement("TEXTAREA");
const buttionDiv = document.createElement("div");
const addButton = document.createElement("div");
const saveButton = document.createElement("div");
const cancelButton = document.createElement("div");
const listDiv = document.createElement("div");

inputDiv.id = "input-div";
todoPage.id = "todo-page";
heading.id = "heading";
todoName.id = "todo-name";
todo.id = "todo";
buttionDiv.id = "button-div";
addButton.id = "add-button";
saveButton.id = "save-button";
cancelButton.id = "cancel-button";
listDiv.id = "list-div";

todoName.setAttribute("name","todoName");
todo.setAttribute("name","todo");

todoNameLabel.setAttribute("for","todoName");
todoLabel.setAttribute("for","todo");

heading.innerHTML = "<p>Add a new To Do<p>";
todoNameLabel.innerText = "ToDo Title:";
todoLabel.innerText = "ToDo:";
addButton.innerHTML = "<p>ADD TODO</p>";
saveButton.innerHTML = "<p>SAVE</p>";
cancelButton.innerHTML = "<p>CANCEL</p>";

todoName.setAttribute("type","text");

todoName.setAttribute("maxLength","20");
todo.setAttribute("maxLength","500");


todoName.setAttribute("placeholder","Enter a title");
todo.setAttribute("placeholder","Enter a todo");

addButton.addEventListener("click",addToDo);
saveButton.addEventListener("click",loadHomeContent);
cancelButton.addEventListener("click",loadHomeContent);

inputDiv.appendChild(heading);
inputDiv.appendChild(errorDiv);
inputDiv.appendChild(todoNameLabel);
inputDiv.appendChild(todoName);
inputDiv.appendChild(todoLabel);
inputDiv.appendChild(todo);

buttionDiv.appendChild(addButton);
buttionDiv.appendChild(saveButton);
buttionDiv.appendChild(cancelButton);

addChild(inputDiv);
addChild(buttionDiv);

export function addChild(content){
    todoPage.appendChild(content);
}

function addToDo(){
    if (todoName.value.length === 0) {
        setError("Please enter a title.");
    }
    else if(!checkToDoTitleAvailability(todoName.value)){
        setError("This title already exists.");
    }
    else if (todo.value.length === 0) {
        setError("Please enter something in todo.");
    }
    else {
        saveButtonToDoInDatabase(todoName.value,todo.value);
        todo.value = "";
        todoName.value = "";
        loadHomeContent(homePage);
    }
}

function loadHomeContent(){
    todoPage.parentNode.removeChild(todoPage);
    displayCurrentTodos();
    assignContent(homePage);
}

function checkToDoTitleAvailability(title){
    let currentUserToDo = getCurrentUser()["todo"];
    console.log(typeof currentUserToDo);
    if(currentUserToDo === null || currentUserToDo[title] === undefined){
        return true;
    }
    return false;
}

function saveButtonToDoInDatabase(title,todo){
    let currentUser = getCurrentUser();
    console.log("current user data: "+currentUser);
    if(currentUser['todo'] === null){
        let newCurrentUserToDo = {
            
        };
        newCurrentUserToDo[title] = {
            description: todo,
            complete: false
        };
        updateCurrentUserToDo(newCurrentUserToDo);
    }
    else{
        let oldToDo = currentUser['todo'];
        oldToDo[title] = {
            description: todo,
            complete: false
        };
        updateCurrentUserToDo(oldToDo);
    }

}

function setError(message) {
    errorDiv.innerText = message;
    errorDiv.classList.add("error-div");
    errorDiv.style.visibility = "visible";
    setTimeout(function() {
        errorDiv.style.visibility = "hidden";
      }, 3000); // 3 second
}

export function loadListDiv(){
    
}