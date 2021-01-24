import { assignContent } from "/javascript/app_content.js";
import { homePage, displayCurrentTodos } from "/javascript/home_page.js";
import { myStorage, setCurrentUser, getCurrentUser, updateCurrentUserToDo } from "/javascript/storage.js";

export let editToDoPage = document.createElement("div");

const errorDiv = document.createElement("div");
const heading = document.createElement("div");
const inputDiv = document.createElement("div");
const todoNameLabel = document.createElement("LABEL");
export const todoName = document.createElement("INPUT");
export let previousTitle = "";
export let previousTodo = "";
const todoLabel = document.createElement("LABEL");
export const todo = document.createElement("TEXTAREA");
const buttionDiv = document.createElement("div");
const submitButton = document.createElement("div");
const cancelButton = document.createElement("div");

inputDiv.id = "input-div";
editToDoPage.id = "todo-page";
heading.id = "heading";
todoName.id = "todo-name";
todo.id = "todo";
buttionDiv.id = "button-div";
submitButton.id = "submit-button";
cancelButton.id = "cancel-button";

todoName.setAttribute("name", "todoName");
todo.setAttribute("name", "todo");

todoNameLabel.setAttribute("for", "todoName");
todoLabel.setAttribute("for", "todo");

heading.innerHTML = "<p>Edit To Do<p>";
todoNameLabel.innerText = "ToDo Title:";
todoLabel.innerText = "ToDo:";
submitButton.innerHTML = "<p>SUBMIT</p>";
cancelButton.innerHTML = "<p>CANCEL</p>";

todoName.setAttribute("type", "text");

todoName.setAttribute("maxLength", "20");
todo.setAttribute("maxLength", "500");


todoName.setAttribute("placeholder", "Enter a title");
todo.setAttribute("placeholder", "Enter a todo");

heading.innerHTML = "<p>Add a new To Do</p>";
todoLabel.innerHTML = "<p>To Do:</p>";
todoNameLabel.innerHTML = "<p>Title:</p>";
submitButton.innerHTML = "<p>SUBMIT</p>";
cancelButton.innerHTML = "<p>CANCEL</p>";

submitButton.addEventListener("click", addToDo);
cancelButton.addEventListener("click", loadHomeContent);

inputDiv.appendChild(heading);
inputDiv.appendChild(errorDiv);
inputDiv.appendChild(todoNameLabel);
inputDiv.appendChild(todoName);
inputDiv.appendChild(todoLabel);
inputDiv.appendChild(todo);

buttionDiv.appendChild(submitButton);
buttionDiv.appendChild(cancelButton);

addChild(inputDiv);
addChild(buttionDiv);

export function addChild(content) {
    editToDoPage.appendChild(content);
}

function addToDo() {
    if (todoName.value.length === 0) {
        setError("Please enter a title.");
    }
    else if (!checkToDoTitleAvailability(todoName.value)) {
        setError("This title already exists.");
    }
    else if (todo.value.length === 0) {
        setError("Please enter something in todo.");
    }
    else {
        saveToDoInDatabase(todoName.value, todo.value);
        loadHomeContent(homePage);
    }
}

function loadHomeContent() {
    editToDoPage.parentNode.removeChild(editToDoPage);
    displayCurrentTodos();
    assignContent(homePage);
}

function checkToDoTitleAvailability(title) {
    let currentUserToDo = getCurrentUser()["todo"];
    //new title is unique
    if (currentUserToDo[title] === undefined) {
        return true;
    }
    //title is not changed
    else if(previousTitle === title){
        return true;
    }
    return false;
}

function saveToDoInDatabase(title, todo) {
    let currentUser = getCurrentUser();
    console.log("current user data: " + currentUser);
    let oldToDo = currentUser['todo'];
    if(title === previousTitle && todo !== previousTodo){
        oldToDo[title] = {
            description: todo,
            complete: oldToDo[previousTitle].complete
        };
    }
    else if(title !== previousTitle && todo === previousTodo){
        oldToDo[title] = {
            description: previousTodo,
            complete: oldToDo[previousTitle].complete
        };
        delete oldToDo[previousTitle];
    }
    else if(title !== previousTitle && todo !== previousTodo){
        oldToDo[title] = {
            description: todo,
            complete: oldToDo[previousTitle].complete
        };
        delete oldToDo[previousTitle];
    }
    updateCurrentUserToDo(oldToDo);
}

function setError(message) {
    errorDiv.innerText = message;
    errorDiv.classList.add("error-div");
    errorDiv.style.visibility = "visible";
    setTimeout(function() {
        errorDiv.style.visibility = "hidden";
      }, 3000); // 3 second
}

export function setPreviousTitle(title){
    previousTitle = title;
}
export function setPreviousTodo(todo){
    previousTodo = todo;
}