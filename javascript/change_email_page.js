import { homePage, displayCurrentTodos, displayNavItems } from "/javascript/home_page.js";
import { assignContent } from "/javascript/app_content.js";
import { addUser, getUser, setCurrentUser, getCurrentUser } from "/javascript/storage.js";
import { myStorage } from "/javascript/storage.js";
import { accountSettingsPage } from "/javascript/account_settings_page.js";

export let changeEmailPage = document.createElement("div");
const accountSettingsTitle = document.createElement("div");
const email = document.createElement("INPUT");
const password = document.createElement("INPUT");
const confirmPassword = document.createElement("INPUT");
const buttonDiv = document.createElement("div");
const saveChanges = document.createElement("div");
const cancel = document.createElement("div");
const errorDiv = document.createElement("div");

const emailLabel = document.createElement("LABEL");
const passwordLabel = document.createElement("LABEL");
const confirmPasswordLabel = document.createElement("LABEL");

accountSettingsTitle.id = "change-email-title";
changeEmailPage.id = "change-email-page";
email.id = "email";
password.id = "account-password";
confirmPassword.id = "confirm-password";
buttonDiv.id = "button-div";
saveChanges.id = "save-changes-button";
cancel.id = "account-settings-cancel-button";


email.setAttribute("name", "email");
password.setAttribute("name", "password");
confirmPassword.setAttribute("name", "confirmPassword");

email.setAttribute("maxLength", 20);
password.setAttribute("maxLength", 30);
confirmPassword.setAttribute("maxLength", 30);

emailLabel.setAttribute("for", "email");
passwordLabel.setAttribute("for", "password");
confirmPasswordLabel.setAttribute("for", "confirmPassword");

accountSettingsTitle.innerHTML = "<p>Change Email</p>";
emailLabel.innerText = "Email:";
passwordLabel.innerText = "Password:";
confirmPasswordLabel.innerText = "Confirm Password:";
saveChanges.innerHTML = "<p>SAVE CHANGES</p>";
cancel.innerHTML = "<p>CANCEL</p>";

email.setAttribute("type", "email");
password.setAttribute("type", "password");
confirmPassword.setAttribute("type", "password");

email.setAttribute("placeholder", "Enter First Name");
password.setAttribute("placeholder", "Enter password");
confirmPassword.setAttribute("placeholder", "Confirm Password");

saveChanges.addEventListener("click", validateData);
cancel.addEventListener("click", loadAccountSettingsContent);

buttonDiv.appendChild(saveChanges);
buttonDiv.appendChild(cancel);

addChild(accountSettingsTitle);
addChild(errorDiv);
addChild(emailLabel);
addChild(email);
addChild(passwordLabel);
addChild(password);
addChild(confirmPasswordLabel);
addChild(confirmPassword);
addChild(buttonDiv);


export function addChild(content) {
    changeEmailPage.appendChild(content);
}

function loadAccountSettingsContent(content) {
    errorDiv.innerHTML = "";
    errorDiv.style.padding = "0px";
    changeEmailPage.parentNode.removeChild(changeEmailPage);
    assignContent(accountSettingsPage);
}

function validateData() {
    if (email.value.length === 0) {
        setError("Please enter email.");
    }
    else if (myStorage.getItem(email.value) !== null) {
        setError("Email is already used.");
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
        'firstName': getCurrentUser().firstName,
        'lastName': getCurrentUser().lastName,
        'email': email.value,
        'password': getCurrentUser().password,
        'todo': getCurrentUser().todo,
    };
    //removing data registered with old email
    myStorage.removeItem(getCurrentUser().email);
    //updating email
    addUser(user);
    setCurrentUser(getUser(user.email));
    displayNavItems();
    displayCurrentTodos();
    changeEmailPage.parentNode.removeChild(changeEmailPage);
    assignContent(homePage);
}


export function loadCurrentUserEmail() {
    const user = getCurrentUser();
    if (user !== null) {
        email.value = user.email;
    }
}