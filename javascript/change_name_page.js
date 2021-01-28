import { homePage, displayCurrentTodos, displayNavItems } from "/javascript/home_page.js";
import { assignContent } from "/javascript/app_content.js";
import { addUser, getUser, setCurrentUser, getCurrentUser } from "/javascript/storage.js";
import { myStorage } from "/javascript/storage.js";
import { accountSettingsPage } from "/javascript/account_settings_page.js";

export let changeNamePage = document.createElement("div");
const accountSettingsTitle = document.createElement("div");
const firstName = document.createElement("INPUT");
const lastName = document.createElement("INPUT");
const password = document.createElement("INPUT");
const confirmPassword = document.createElement("INPUT");
const buttonDiv = document.createElement("div");
const saveChanges = document.createElement("div");
const cancel = document.createElement("div");
const errorDiv = document.createElement("div");

const firstNameLabel = document.createElement("LABEL");
const lastNameLabel = document.createElement("LABEL");
const passwordLabel = document.createElement("LABEL");
const confirmPasswordLabel = document.createElement("LABEL");

accountSettingsTitle.id = "change-name-title";
changeNamePage.id = "change-name-page";
firstName.id = "firstName";
lastName.id = "lastName";
password.id = "account-password";
confirmPassword.id = "confirm-password";
buttonDiv.id = "button-div";
saveChanges.id = "save-changes-button";
cancel.id = "account-settings-cancel-button";


firstName.setAttribute("name", "firstName");
lastName.setAttribute("name", "lastName");
password.setAttribute("name", "password");
confirmPassword.setAttribute("name", "confirmPassword");

firstName.setAttribute("maxLength", 20);
lastName.setAttribute("maxLength", 20);
password.setAttribute("maxLength", 30);
confirmPassword.setAttribute("maxLength", 30);

firstNameLabel.setAttribute("for", "firstName");
lastNameLabel.setAttribute("for", "lastName");
passwordLabel.setAttribute("for", "password");
confirmPasswordLabel.setAttribute("for", "confirmPassword");

accountSettingsTitle.innerHTML = "<p>Change Name</p>";
firstNameLabel.innerText = "First Name:";
lastNameLabel.innerText = "Last Name:";
passwordLabel.innerText = "Password:";
confirmPasswordLabel.innerText = "Confirm Password:";
saveChanges.innerHTML = "<p>SAVE CHANGES</p>";
cancel.innerHTML = "<p>CANCEL</p>";

firstName.setAttribute("type", "text");
lastName.setAttribute("type", "text");
password.setAttribute("type", "password");
confirmPassword.setAttribute("type", "password");

firstName.setAttribute("placeholder", "Enter First Name");
lastName.setAttribute("placeholder", "Enter Last Name");
password.setAttribute("placeholder", "Enter password");
confirmPassword.setAttribute("placeholder", "Confirm Password");

saveChanges.addEventListener("click", validateData);
cancel.addEventListener("click", loadAccountSettingsContent);

buttonDiv.appendChild(saveChanges);
buttonDiv.appendChild(cancel);

addChild(accountSettingsTitle);
addChild(errorDiv);
addChild(firstNameLabel);
addChild(firstName);
addChild(lastNameLabel);
addChild(lastName);
addChild(passwordLabel);
addChild(password);
addChild(confirmPasswordLabel);
addChild(confirmPassword);
addChild(buttonDiv);


export function addChild(content) {
    changeNamePage.appendChild(content);
}

function loadAccountSettingsContent(content) {
    errorDiv.innerHTML = "";
    errorDiv.style.padding = "0px";
    changeNamePage.parentNode.removeChild(changeNamePage);
    assignContent(accountSettingsPage);
}

function validateData() {
    if (firstName.value.length === 0) {
        setError("Please enter first name.");
    }
    else if (lastName.value.length === 0) {
        setError("Please enter last name.")
    }
    else if (password.value.length === 0) {
        setError("Please enter password.");
    }
    else if (confirmPassword.value.length === 0) {
        setError("Please enter password again.");
    }
    else if (confirmPassword.value !== password.value) {
        setError("passwords don't match.");
    }
    else if(password.value !== getCurrentUser().password){
        setError("Incorrect Password");
    }
    else {
        loadHomeContentAfterChanges();
        password.value = "";
        confirmPassword.value = "";
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


function loadHomeContentAfterChanges() {
    //updating user data
    let user = {
        'firstName': firstName.value,
        'lastName': lastName.value,
        'email': getCurrentUser().email,
        'password': getCurrentUser().password,
        'todo': getCurrentUser().todo,
    };
    addUser(user);
    setCurrentUser(getUser(getCurrentUser().email));
    displayNavItems();
    displayCurrentTodos();
    changeNamePage.parentNode.removeChild(changeNamePage);
    assignContent(homePage);
}


export function loadCurrentUserName() {
    const user = getCurrentUser();
    if (user !== null) {
        firstName.value = user.firstName;
        lastName.value = user.lastName;
    }
}