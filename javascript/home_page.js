import { getCurrentUser } from "/javascript/storage.js";
import { assignContent } from "/javascript/app_content.js";
import { todoPage } from "/javascript/todo_Page.js";
import { editToDoPage, todo, todoName, setPreviousTitle, setPreviousTodo } from "/javascript/edit_todo_Page.js";
import { loginPage } from "/javascript/login_page.js";
import { myStorage } from "/javascript/storage.js";
import { accountSettingsPage,loadCurrentUserData } from "/javascript/account_settings_page.js";
export const homePage = document.createElement("div");

const navArea = document.createElement("div");
const contentTable = document.createElement("div");
const nameDiv = document.createElement("div");
const buttonDiv = document.createElement("div");
const fullname = document.createElement("div");
const createTodo = document.createElement("div");
const accountSettingsButton = document.createElement("div");
const logoutButton = document.createElement("div");

homePage.id = "home-page";
nameDiv.id = "name-div";
buttonDiv.id = "home-button-div";
navArea.id = "nav-area";
contentTable.id = "content-area";
fullname.id = "fullname";
createTodo.id = "create-todo";
accountSettingsButton.id = "account-settings";
logoutButton.id = "logout-button";

createTodo.innerHTML = "<p>Add ToDo</p>";
accountSettingsButton.innerHTML = "<p>Account Settings</p>";
logoutButton.innerHTML = "<p>Logout</p>";

createTodo.addEventListener("click", loadAddToDoContent);
accountSettingsButton.addEventListener("click",loadAccountSettingsPage);
logoutButton.addEventListener("click", () => {
    logoutButton.parentNode.parentNode.parentNode.innerHTML = "";
    assignContent(loginPage);
});


function addChild(child) {
    homePage.appendChild(child);
}

export function displayCurrentTodos() {
    contentTable.innerHTML = "";
    console.log(typeof getCurrentUser());
    const toDos = getCurrentUser()["todo"];
    const table = document.createElement("table");
    const tableRow1 = document.createElement("tr");
    const tableRow1Heading1 = document.createElement("th");
    const tableRow1Heading2 = document.createElement("th");
    const tableRow1Heading3 = document.createElement("th");
    const todoHeading = document.createElement("th");

    tableRow1Heading1.id = "table-row1-heading1";
    tableRow1Heading2.id = "table-row1-heading2";
    tableRow1Heading3.id = "table-row1-heading3";
    todoHeading.id = "todo-heading";
    table.id = "data-table";
    tableRow1.id = "table-row1";
    todoHeading.innerHTML = "<p>My ToDos</p>";

    tableRow1Heading1.innerHTML = "<p>Title</p>";
    tableRow1Heading2.innerHTML = "<p>ToDo</p>";
    tableRow1Heading3.innerHTML = "<p>Complete</p>";

    tableRow1.appendChild(tableRow1Heading1);
    tableRow1.appendChild(tableRow1Heading2);
    tableRow1.appendChild(tableRow1Heading3);

    table.appendChild(tableRow1);

    for (let key in toDos) {
        const tableRow = document.createElement("tr");
        const tableRowData1 = document.createElement("td");
        const tableRowData2 = document.createElement("td");
        const tableRowData3 = document.createElement("td");

        const checkBox = document.createElement("input");
        checkBox.id = "complete";
        checkBox.setAttribute("type", "checkbox");

        tableRow.id = "table-row";
        tableRowData1.id = "table-row-data1";
        tableRowData2.id = "table-row-data2";
        tableRowData3.id = "table-row-data3";

        if (toDos[key].complete) {
            checkBox.checked = true;
        }
        else {
            checkBox.checked = false;
        }

        checkBox.addEventListener("click", () => {
            let newToDoObject = toDos;
            newToDoObject[key].complete ? newToDoObject[key].complete = false : newToDoObject[key].complete = true;
            let updatedUser = {
                'firstName': getCurrentUser()["firstName"],
                'lastName': getCurrentUser()["lastName"],
                'email': getCurrentUser()["email"],
                'password': getCurrentUser()["password"],
                'todo': newToDoObject,
            };
            myStorage.setItem("currentUser", JSON.stringify(updatedUser));
            myStorage.setItem(updatedUser["email"], JSON.stringify(updatedUser));
        });

        tableRowData1.innerHTML = `${key}`;
        tableRowData2.innerHTML = `${toDos[key].description}`;
        tableRowData3.appendChild(checkBox);

        tableRow.appendChild(tableRowData1);
        tableRow.appendChild(tableRowData2);
        tableRow.appendChild(tableRowData3);

        tableRowData1.addEventListener("click", () => loadEditToDoPage(key, toDos[key].description));
        tableRowData2.addEventListener("click", () => loadEditToDoPage(key, toDos[key].description));

        table.appendChild(tableRow);
    }

    contentTable.appendChild(table);
    addChild(contentTable);
}

export function displayNavItems() {
    fullname.innerHTML = `<p>${getCurrentUser().firstName + " " + getCurrentUser().lastName}</p>`;
    nameDiv.appendChild(fullname);
    buttonDiv.appendChild(logoutButton);
    buttonDiv.appendChild(accountSettingsButton);
    buttonDiv.appendChild(createTodo);
    navArea.appendChild(nameDiv);
    navArea.appendChild(buttonDiv);
    addChild(navArea);
}

function loadAddToDoContent() {
    homePage.parentNode.removeChild(homePage);
    assignContent(todoPage);
}

function loadAccountSettingsPage() {
    loadCurrentUserData();
    homePage.parentNode.removeChild(homePage);
    assignContent(accountSettingsPage);
}

function loadEditToDoPage(clickedTitle, clickedTodo) {
    todoName.value = clickedTitle;
    setPreviousTitle(clickedTitle);
    setPreviousTodo(clickedTodo);
    todo.value = clickedTodo;
    homePage.parentNode.removeChild(homePage);
    assignContent(editToDoPage);
}