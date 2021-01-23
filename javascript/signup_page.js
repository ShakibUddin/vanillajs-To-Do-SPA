import { homePage,displayCurrentTodos } from "/javascript/home_page.js";
import { assignContent } from "/javascript/app_content.js";
import { loginPage } from "/javascript/login_page.js";
import {addUser,getUser,setCurrentUser} from "/javascript/storage.js";

export let signupPage = document.createElement("div");
const signupTitle = document.createElement("div");
const firstName = document.createElement("INPUT");
const lastName = document.createElement("INPUT");
const email = document.createElement("INPUT");
const password = document.createElement("INPUT");
const confirmPassword = document.createElement("INPUT");
const termsAndConditions = document.createElement("div");
const checkBox = document.createElement("INPUT");
const checkBoxText = document.createElement("div");
const createAccount = document.createElement("div");
const loginText = document.createElement("div");
const login = document.createElement("div");
const errorDiv = document.createElement("div");

const firstNameLabel = document.createElement("LABEL");
const lastNameLabel = document.createElement("LABEL");
const emailLabel = document.createElement("LABEL");
const passwordLabel = document.createElement("LABEL");
const confirmPasswordLabel = document.createElement("LABEL");
const loginLink = document.createElement("div");

signupTitle.id = "signup-title";
signupPage.id = "signup-page";
firstName.id = "firstName";
lastName.id = "lastName";
email.id = "email";
password.id = "password";
confirmPassword.id = "confirm-password";
termsAndConditions.id = "terms-conditions";
checkBox.id = "terms-conditions-checkbox";
checkBoxText.id = "terms-conditions-checkbox-text";
createAccount.id = "create-account";
login.id = "login-div";
loginLink.id = "login-link";

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

signupTitle.innerHTML = "<p>SignUp</p>";
firstNameLabel.innerText = "First Name:";
lastNameLabel.innerText = "Last Name:";
emailLabel.innerText = "Email:";
passwordLabel.innerText = "Password:";
confirmPasswordLabel.innerText = "Confirm Password:";
checkBoxText.innerText = "I agree to the Terms of Use";
createAccount.innerHTML = "<p>CREATE ACCOUNT</p>";
loginText.innerHTML = "<p>Already have an account?</p?";
loginLink.innerHTML = "<p>Login</p>";

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
checkBox.setAttribute("type", "checkbox");

createAccount.addEventListener("click", validateSignUpData);
loginLink.addEventListener("click", loadLoginContent);

login.style.textAlign = "center";

termsAndConditions.appendChild(checkBox);
termsAndConditions.appendChild(checkBoxText);
login.appendChild(loginText);
login.appendChild(loginLink);

addChild(signupTitle);
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
addChild(termsAndConditions);
addChild(createAccount);
addChild(login);

export function addChild(content) {
    signupPage.appendChild(content);
}

function loadLoginContent(content) {
    signupPage.parentNode.removeChild(signupPage);
    assignContent(loginPage);
}

function validateSignUpData() {
    if (firstName.value.length === 0) {
        setError("Please enter first name.");
    }
    else if (lastName.value.length === 0) {
        setError("Please enter last name.")
    }
    else if (email.value.length === 0) {
        setError("Please enter email.");
    }
    else if (getUser(email.value) != null) {
        setError("There is an account with this email, Login instead!")
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
    else if (checkBox.checked === false) {
        setError("Agree to the Terms of Use.");
    }
    else {
        loadHomeContent();
    }
}

function setError(message) {
    errorDiv.innerText = message;
    errorDiv.classList.add("error-div");
}


function loadHomeContent() {
    let user = {
        'firstName': firstName.value,
        'lastName': lastName.value,
        'email': email.value,
        'password': password.value,
        'todo': null,
    };
    addUser(user);
    setCurrentUser(user);
    displayCurrentTodos();
    signupPage.parentNode.removeChild(signupPage);
    assignContent(loginPage);
}