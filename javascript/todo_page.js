import { assignContent } from "/javascript/app_content.js";
import { homePage, displayCurrentTodos } from "/javascript/home_page.js";
import { myStorage, getCurrentUser, updateCurrentUserToDo } from "/javascript/storage.js";

var unsavedCurrentUserToDo = null;
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

todoName.setAttribute("name", "todoName");
todo.setAttribute("name", "todo");

todoNameLabel.setAttribute("for", "todoName");
todoLabel.setAttribute("for", "todo");

heading.innerHTML = "<p>Add a new To Do<p>";
todoNameLabel.innerText = "ToDo Title:";
todoLabel.innerText = "ToDo:";
addButton.innerHTML = "<p>ADD TODO</p>";
saveButton.innerHTML = "<p>SAVE</p>";
cancelButton.innerHTML = "<p>CANCEL</p>";

todoName.setAttribute("type", "text");

todoName.setAttribute("maxLength", "20");
todo.setAttribute("maxLength", "500");


todoName.setAttribute("placeholder", "Enter a title");
todo.setAttribute("placeholder", "Enter a todo");

addButton.addEventListener("click", addToDo);
saveButton.addEventListener("click", saveToDoInDatabase);
cancelButton.addEventListener("click", loadHomeContent);

inputDiv.appendChild(heading);
inputDiv.appendChild(errorDiv);
inputDiv.appendChild(todoNameLabel);
inputDiv.appendChild(todoName);
inputDiv.appendChild(todoLabel);
inputDiv.appendChild(todo);

buttionDiv.appendChild(addButton);
buttionDiv.appendChild(saveButton);
buttionDiv.appendChild(cancelButton);

var table = document.createElement("table");
const tableRow1 = document.createElement("tr");
const tableRow1Heading1 = document.createElement("th");
const tableRow1Heading2 = document.createElement("th");

tableRow1Heading1.id = "table-row1-heading1";
tableRow1Heading2.id = "table-row1-heading2";
table.id = "data-table";
tableRow1.id = "table-row1";
tableRow1Heading1.innerHTML = "<p>ToDo</p>";
tableRow1Heading2.innerHTML = "<p>Complete</p>";

tableRow1.appendChild(tableRow1Heading1);
tableRow1.appendChild(tableRow1Heading2);

table.appendChild(tableRow1);

addChild(inputDiv);
addChild(buttionDiv);

export function addChild(content) {
    todoPage.appendChild(content);
}

function addToDo() {
    if (todoName.value.length === 0) {
        setError("Please enter a title.");
    }
    else if (todo.value.length === 0) {
        setError("Please enter something in todo.");
    }
    else {
        if (getCurrentUser().todo === null) {
            if (checkToDoTitleAvailability(todoName.value) && unsavedCurrentUserToDo === null) {
                unsavedCurrentUserToDo = {

                };
                unsavedCurrentUserToDo[todoName.value] = [];
                let todoObject = {
                    description: todo.value,
                    complete: false,
                }
                unsavedCurrentUserToDo[todoName.value].push(todoObject);
            }
            else if (unsavedCurrentUserToDo !== null) {
                let todoObject = {
                    description: todo.value,
                    complete: false,
                }
                unsavedCurrentUserToDo[todoName.value].push(todoObject);
            }
            else {
                setError("Title is used aleardy");
            }
        }
        else {
            if (unsavedCurrentUserToDo === null) unsavedCurrentUserToDo = getCurrentUser().todo;
            if (checkToDoTitleAvailability(todoName.value)) {
                if (unsavedCurrentUserToDo[todoName.value] === undefined) {
                    unsavedCurrentUserToDo[todoName.value] = [];
                }
                let todoObject = {
                    description: todo.value,
                    complete: false,
                }
                unsavedCurrentUserToDo[todoName.value].push(todoObject);
            }
            else {
                setError("Title is used aleardy");
            }
        }
        refreshTable();
        loadListDiv(todoName.value);
        todo.value = "";
    }
}

function loadHomeContent() {
    todo.value = "";
    todoName.value = "";
    table.innerHTML = '';
    errorDiv.innerHTML = "";
    errorDiv.style.padding = "0px";
    todoPage.parentNode.removeChild(todoPage);
    displayCurrentTodos();
    assignContent(homePage);
}

function checkToDoTitleAvailability(title) {
    let currentUserToDo = getCurrentUser()["todo"];
    if (currentUserToDo === null || currentUserToDo[title] === undefined) {
        return true;
    }
    return false;
}

function saveToDoInDatabase() {
    if (unsavedCurrentUserToDo !== null) {
        updateCurrentUserToDo(unsavedCurrentUserToDo);
    }
    else {
        setError("Add atleast one ToDo to save");
    }
    table.innerHTML = "";
    unsavedCurrentUserToDo = null;
    loadHomeContent();
}

function setError(message) {
    errorDiv.style.padding = "10px";
    errorDiv.innerText = message;
    errorDiv.classList.add("error-div");
    setTimeout(function () {
        errorDiv.innerHTML = "";
        errorDiv.style.padding = "0px";
    }, 3000);
}
function loadListDiv(key) {
    for (let i = 0; i < unsavedCurrentUserToDo[key].length; ++i) {//accessing the array under that todo title
        let object = unsavedCurrentUserToDo[key][i];
        const tableRow = document.createElement("tr");
        const tableRowData1 = document.createElement("td");
        const tableRowData2 = document.createElement("td");

        const checkBox = document.createElement("input");
        checkBox.id = "complete";
        checkBox.setAttribute("type", "checkbox");

        tableRow.id = "table-row";
        tableRowData1.id = "table-row-data1";
        tableRowData2.id = "table-row-data2";

        if (object.complete) {
            checkBox.checked = true;
        }
        else {
            checkBox.checked = false;
        }

        checkBox.addEventListener("click", () => {
            object.complete ? object.complete = false : object.complete = true;
            let updatedUser = {
                'firstName': getCurrentUser()["firstName"],
                'lastName': getCurrentUser()["lastName"],
                'email': getCurrentUser()["email"],
                'password': getCurrentUser()["password"],
                'todo': unsavedCurrentUserToDo,
            };
            myStorage.setItem("currentUser", JSON.stringify(updatedUser));
            myStorage.setItem(updatedUser["email"], JSON.stringify(updatedUser));
        });

        tableRowData1.innerHTML = `${object.description}`;
        tableRowData2.appendChild(checkBox);

        tableRow.appendChild(tableRowData1);
        tableRow.appendChild(tableRowData2);

        table.appendChild(tableRow);
        listDiv.appendChild(table);
        addChild(listDiv);
    }
}

function refreshTable() {
    table.innerHTML = "";
    const tableRow1 = document.createElement("tr");
    const tableRow1Heading1 = document.createElement("th");
    const tableRow1Heading2 = document.createElement("th");

    tableRow1Heading1.id = "table-row1-heading1";
    tableRow1Heading2.id = "table-row1-heading2";
    table.id = "data-table";
    tableRow1.id = "table-row1";
    tableRow1Heading1.innerHTML = "<p>ToDo</p>";
    tableRow1Heading2.innerHTML = "<p>Complete</p>";

    tableRow1.appendChild(tableRow1Heading1);
    tableRow1.appendChild(tableRow1Heading2);

    table.appendChild(tableRow1);
}