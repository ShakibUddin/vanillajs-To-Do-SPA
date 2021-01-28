import { homePage, displayCurrentTodos, displayNavItems } from "/javascript/home_page.js";
import { assignContent } from "/javascript/app_content.js";
import { addUser, getUser, setCurrentUser, getCurrentUser } from "/javascript/storage.js";
import { myStorage } from "/javascript/storage.js";
import { accountSettingsPage } from "/javascript/account_settings_page.js";

export let changePasswordPage = document.createElement("div");
const accountSettingsTitle = document.createElement("div");
const oldPassword = document.createElement("INPUT");
const password = document.createElement("INPUT");
const confirmPassword = document.createElement("INPUT");
const buttonDiv = document.createElement("div");
const saveChanges = document.createElement("div");
const cancel = document.createElement("div");
const errorDiv = document.createElement("div");

const oldPasswordLabel = document.createElement("LABEL");
const passwordLabel = document.createElement("LABEL");
const confirmPasswordLabel = document.createElement("LABEL");

accountSettingsTitle.id = "change-password-title";
changePasswordPage.id = "change-password-page";
oldPassword.id = "old-password";
password.id = "account-password";
confirmPassword.id = "confirm-password";
buttonDiv.id = "button-div";
saveChanges.id = "save-changes-button";
cancel.id = "account-settings-cancel-button";


oldPassword.setAttribute("name", "oldPassword");
password.setAttribute("name", "password");
confirmPassword.setAttribute("name", "confirmPassword");

oldPassword.setAttribute("maxLength", 20);
password.setAttribute("maxLength", 30);
confirmPassword.setAttribute("maxLength", 30);

oldPasswordLabel.setAttribute("for", "oldPassword");
passwordLabel.setAttribute("for", "password");
confirmPasswordLabel.setAttribute("for", "confirmPassword");

accountSettingsTitle.innerHTML = "<p>Change Password</p>";
oldPasswordLabel.innerText = "Old Password:";
passwordLabel.innerText = "New Password:";
confirmPasswordLabel.innerText = "Confirm New Password:";
saveChanges.innerHTML = "<p>SAVE CHANGES</p>";
cancel.innerHTML = "<p>CANCEL</p>";

oldPassword.setAttribute("type", "password");
password.setAttribute("type", "password");
confirmPassword.setAttribute("type", "password");

oldPassword.setAttribute("placeholder", "Enter Old Password");
password.setAttribute("placeholder", "Enter New password");
confirmPassword.setAttribute("placeholder", "Confirm New Password");

saveChanges.addEventListener("click", validateData);
cancel.addEventListener("click", loadAccountSettingsContent);

buttonDiv.appendChild(saveChanges);
buttonDiv.appendChild(cancel);

addChild(accountSettingsTitle);
addChild(errorDiv);
addChild(oldPasswordLabel);
addChild(oldPassword);
addChild(passwordLabel);
addChild(password);
addChild(confirmPasswordLabel);
addChild(confirmPassword);
addChild(buttonDiv);


export function addChild(content) {
    changePasswordPage.appendChild(content);
}

function loadAccountSettingsContent(content) {
    errorDiv.innerHTML = "";
    errorDiv.style.padding = "0px";
    changePasswordPage.parentNode.removeChild(changePasswordPage);
    assignContent(accountSettingsPage);
}

function validateData() {
    if (oldPassword.value.length === 0) {
        setError("Please enter old password.");
    }
    else if(oldPassword.value !== getCurrentUser().password){
        setError("Incorrect old password");
    }
    else if (password.value.length === 0) {
        setError("Please enter new password.");
    }
    else if (confirmPassword.value.length === 0) {
        setError("Please enter new password again.");
    }
    else if (confirmPassword.value !== password.value) {
        setError("New passwords don't match.");
    }
    else {
        loadHomeContentAfterChanges();
        oldPassword.value = "";
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
        'email': getCurrentUser().email,
        'password': password.value,
        'todo': getCurrentUser().todo,
    };
    //updating password
    addUser(user);
    setCurrentUser(getUser(user.email));
    displayNavItems();
    displayCurrentTodos();
    changePasswordPage.parentNode.removeChild(changePasswordPage);
    assignContent(homePage);
}