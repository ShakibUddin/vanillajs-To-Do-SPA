import { assignContent } from "/javascript/app_content.js";
import { homePage, displayCurrentTodos } from "/javascript/home_page.js";
import { myStorage, getCurrentUser, updateCurrentUserToDo } from "/javascript/storage.js";

var unsavedCurrentUserToDo = null;

export let editToDoPage = document.createElement("div");

const errorDiv = document.createElement("div");
const heading = document.createElement("div");
const inputDiv = document.createElement("div");
const todoNameLabel = document.createElement("LABEL");
export const todoName = document.createElement("INPUT");
export let previousTitle = "";
const todoLabel = document.createElement("LABEL");
export const todo = document.createElement("TEXTAREA");
const buttionDiv = document.createElement("div");
const addButton = document.createElement("div");
const saveButton = document.createElement("div");
const cancelButton = document.createElement("div");
const listDiv = document.createElement("div");


inputDiv.id = "edit-input-div";
editToDoPage.id = "edit-todo-page";
heading.id = "edit-heading";
todoName.id = "edit-todo-name";
todo.id = "edit-todo";
buttionDiv.id = "edit-button-div";
addButton.id = "edit-add-button";
saveButton.id = "edit-save-button";
cancelButton.id = "edit-cancel-button";
listDiv.id = "list-div";


todoName.setAttribute("name", "todoName");
todo.setAttribute("name", "todo");

todoNameLabel.setAttribute("for", "todoName");
todoLabel.setAttribute("for", "todo");

todoName.setAttribute("type", "text");

todoName.setAttribute("maxLength", "20");
todo.setAttribute("maxLength", "500");


todoName.setAttribute("placeholder", "Enter a title");
todo.setAttribute("placeholder", "Enter a todo");

heading.innerHTML = "<p>Edit To Do</p>";
todoLabel.innerHTML = "<p>To Do:</p>";
todoNameLabel.innerHTML = "<p>Title:</p>";
addButton.innerHTML = "<p>ADD TODO</p>";
saveButton.innerHTML = "<p>SAVE</p>";
cancelButton.innerHTML = "<p>CANCEL</p>";

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
    editToDoPage.appendChild(content);
}

function addToDo() {
    if (todoName.value.length === 0) {
        setError("Please enter a title.");
    }
    else if (todo.value.length === 0) {
        setError("Please enter something in todo.");
    }
    else {
        unsavedCurrentUserToDo = getCurrentUser().todo;
        let newToDoObject = {
            description: todo.value,
            complete: false,
        };
        //user is changing title
        if (todoName.value !== previousTitle) {
            if (checkToDoTitleAvailability(todoName.value)) {
                let todoObjects = unsavedCurrentUserToDo[previousTitle];
                unsavedCurrentUserToDo[todoName.value] = todoObjects;
                delete unsavedCurrentUserToDo[previousTitle];
                //update previous title
                previousTitle = todoName.value;
                unsavedCurrentUserToDo[todoName.value].push(newToDoObject);
                refreshTable();
                loadListDiv(unsavedCurrentUserToDo, todoName.value);
                todo.value = "";
            }
            else {
                setError("Title is used already");
            }
        }
        else {
            unsavedCurrentUserToDo[previousTitle].push(newToDoObject);
            refreshTable();
            loadListDiv(unsavedCurrentUserToDo, todoName.value);
            todo.value = "";
        }
    }
}

function loadHomeContent() {
    todo.value = "";
    todoName.value = "";
    errorDiv.innerHTML = "";
    errorDiv.style.padding = "0px";
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
    else if (previousTitle === title) {
        return true;
    }
    return false;
}

function saveToDoInDatabase() {
    if (todoName.value !== previousTitle) {
        if (checkToDoTitleAvailability(todoName.value)) {
            if (unsavedCurrentUserToDo === null) unsavedCurrentUserToDo = getCurrentUser().todo;
            let todoObjects = unsavedCurrentUserToDo[previousTitle];
            unsavedCurrentUserToDo[todoName.value] = todoObjects;
            delete unsavedCurrentUserToDo[previousTitle];
            refreshTable();
            todo.value = "";
            if (unsavedCurrentUserToDo !== null) {
                updateCurrentUserToDo(unsavedCurrentUserToDo);
            }
            unsavedCurrentUserToDo = null;
            loadHomeContent();
        }
        else {
            setError("Title is used aleardy");
        }
    }
    else {
        if (unsavedCurrentUserToDo !== null) {
            updateCurrentUserToDo(unsavedCurrentUserToDo);
        }
        unsavedCurrentUserToDo = null;
        loadHomeContent();
    }
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

export function setPreviousTitle(title) {
    previousTitle = title;
}

export function loadListDiv(userToDo, key) {
    for (let i = 0; i < userToDo[key].length; ++i) {//accessing the array under that todo title
        let object = userToDo[key][i];
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
                'todo': userToDo,
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

export function refreshTable() {
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