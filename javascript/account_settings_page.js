import { homePage, displayCurrentTodos, displayNavItems } from "/javascript/home_page.js";
import { assignContent } from "/javascript/app_content.js";
import { loginPage } from "/javascript/login_page.js";
import { addUser, getUser, setCurrentUser, getCurrentUser } from "/javascript/storage.js";
import { myStorage } from "/javascript/storage.js";

export let accountSettingsPage = document.createElement("div");
const accountSettingsTitle = document.createElement("div");
const firstName = document.createElement("INPUT");
const lastName = document.createElement("INPUT");
const email = document.createElement("INPUT");
const password = document.createElement("INPUT");
const confirmPassword = document.createElement("INPUT");
const buttonDiv = document.createElement("div");
const saveChanges = document.createElement("div");
const cancel = document.createElement("div");
const errorDiv = document.createElement("div");

const firstNameLabel = document.createElement("LABEL");
const lastNameLabel = document.createElement("LABEL");
const emailLabel = document.createElement("LABEL");
const passwordLabel = document.createElement("LABEL");
const confirmPasswordLabel = document.createElement("LABEL");

accountSettingsTitle.id = "account-settings-title";
accountSettingsPage.id = "account-settings-page";
firstName.id = "firstName";
lastName.id = "lastName";
email.id = "account-email";
password.id = "account-password";
confirmPassword.id = "confirm-password";
buttonDiv.id = "button-div";
saveChanges.id = "save-changes-button";
cancel.id = "account-settings-cancel-button";


firstName.setAttribute("name", "firstName");
lastName.setAttribute("name", "lastName");
email.setAttribute("name", "email");
password.setAttribute("name", "password");
confirmPassword.setAttribute("name", "confirmPassword");

firstName.setAttribute("maxLength", 20);
lastName.setAttribute("maxLength", 20);
email.setAttribute("maxLength", 30);
password.setAttribute("maxLength", 30);
confirmPassword.setAttribute("maxLength", 30);

firstNameLabel.setAttribute("for", "firstName");
lastNameLabel.setAttribute("for", "lastName");
emailLabel.setAttribute("for", "email");
passwordLabel.setAttribute("for", "password");
confirmPasswordLabel.setAttribute("for", "confirmPassword");

accountSettingsTitle.innerHTML = "<p>Account Settings</p>";
firstNameLabel.innerText = "First Name:";
lastNameLabel.innerText = "Last Name:";
emailLabel.innerText = "Email:";
passwordLabel.innerText = "Password:";
confirmPasswordLabel.innerText = "Confirm Password:";
saveChanges.innerHTML = "<p>SAVE CHANGES</p>";
cancel.innerHTML = "<p>CANCEL</p>";

firstName.setAttribute("type", "text");
lastName.setAttribute("type", "text");
email.setAttribute("type", "text");
password.setAttribute("type", "password");
confirmPassword.setAttribute("type", "password");

firstName.setAttribute("placeholder", "Enter First Name");
lastName.setAttribute("placeholder", "Enter Last Name");
email.setAttribute("placeholder", "Enter email");
password.setAttribute("placeholder", "Enter password");
confirmPassword.setAttribute("placeholder", "Confirm Password");

saveChanges.addEventListener("click", validateData);
cancel.addEventListener("click", loadHomeContent);

buttonDiv.appendChild(saveChanges);
buttonDiv.appendChild(cancel);

loadCurrentUserData();

addChild(accountSettingsTitle);
addChild(errorDiv);
addChild(firstNameLabel);
addChild(firstName);
addChild(lastNameLabel);
addChild(lastName);
addChild(emailLabel);
addChild(email);
addChild(passwordLabel);
addChild(password);
addChild(confirmPasswordLabel);
addChild(confirmPassword);
addChild(buttonDiv);


export function addChild(content) {
    accountSettingsPage.appendChild(content);
}

function loadHomeContent(content) {
    accountSettingsPage.parentNode.removeChild(accountSettingsPage);
    assignContent(homePage);
}

function validateData() {
    if (firstName.value.length === 0) {
        setError("Please enter first name.");
    }
    else if (lastName.value.length === 0) {
        setError("Please enter last name.")
    }
    else if (email.value.length === 0) {
        setError("Please enter email.");
    }
    else if (getCurrentUser().email != email.value && getUser(email) != null) {
        setError("This email is in use.")
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
    else {
        loadHomeContentAfterChanges();
        password.value = "";
        confirmPassword.value = "";
    }
}

function setError(message) {
    errorDiv.innerText = message;
    errorDiv.classList.add("error-div");
    errorDiv.style.visibility = "visible";
    setTimeout(function () {
        errorDiv.style.visibility = "hidden";
    }, 6000); // 6 second
}


function loadHomeContentAfterChanges() {
    //if user wants to change email
    if (getCurrentUser().email !== email.value) {
        //updating user data
        let user = {
            'firstName': firstName.value,
            'lastName': lastName.value,
            'email': email.value,
            'password': password.value,
            'todo': getCurrentUser().todo,
        };
        //removing old data
        myStorage.removeItem(getCurrentUser().email);
        addUser(user);
        setCurrentUser(getUser(email.value));
    }
    else {
        //updating user data
        let user = {
            'firstName': firstName.value,
            'lastName': lastName.value,
            'email': email.value,
            'password': password.value,
            'todo': getCurrentUser().todo,
        };
        addUser(user);
        setCurrentUser(getUser(email.value));
    }
    displayNavItems();
    displayCurrentTodos();
    accountSettingsPage.parentNode.removeChild(accountSettingsPage);
    assignContent(homePage);
}


export function loadCurrentUserData() {
    const user = getCurrentUser();
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    email.value = user.email;
}