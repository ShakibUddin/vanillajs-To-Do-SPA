import {getCurrentUser} from "/javascript/storage.js";
import { assignContent } from "/javascript/app_content.js";
import { todoPage } from "/javascript/todo_Page.js";
export const homePage = document.createElement("div");

const navArea = document.createElement("div");
const contentTable = document.createElement("div");
const createTodo = document.createElement("div");
const accountSettingsButton = document.createElement("div");
const logoutButton = document.createElement("div");

homePage.id = "home-page";
navArea.id = "nav-area";
contentTable.id = "content-area";
createTodo.id = "create-todo";
accountSettingsButton.id = "account-settings";
logoutButton.id = "logout-button";

createTodo.innerHTML = "<p>Add ToDo</p>";
accountSettingsButton.innerHTML = "<p>Account Settings</p>";
logoutButton.innerHTML = "<p>Logout</p>";

createTodo.addEventListener("click",loadAddToDoContent);

navArea.appendChild(logoutButton);
navArea.appendChild(accountSettingsButton);
navArea.appendChild(createTodo);

addChild(navArea);
addChild(contentTable);

function addChild(child){
    homePage.appendChild(child);
}

export function displayCurrentTodos(){
    const user = getCurrentUser();
}

function loadAddToDoContent(){
    homePage.parentNode.removeChild(homePage);
    assignContent(todoPage);
}