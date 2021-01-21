import { homePage } from "/javascript/home_page.js";
import { assignContent } from "/javascript/app_content.js";
import { loginPage } from "/javascript/login_page.js";
import {myStorage,addUser,getUser} from "/javascript/storage.js";

export let signupPage = document.createElement("div");
const signupTitle = document.createElement("div");
const username = document.createElement("INPUT");
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

const usernameLabel = document.createElement("LABEL");
const emailLabel = document.createElement("LABEL");
const passwordLabel = document.createElement("LABEL");
const confirmPasswordLabel = document.createElement("LABEL");
const loginLink = document.createElement("div");

signupTitle.id = "signup-title";
signupPage.id = "signup-page";
username.id = "username";
email.id = "email";
password.id = "password";
confirmPassword.id = "confirm-password";
termsAndConditions.id = "terms-conditions";
checkBox.id = "terms-conditions-checkbox";
checkBoxText.id = "terms-conditions-checkbox-text";
createAccount.id = "create-account";
login.id = "login-div";
loginLink.id = "login-link";

username.setAttribute("name", "username");
email.setAttribute("name", "email");
password.setAttribute("name", "password");
confirmPassword.setAttribute("name", "confirmPassword");

username.setAttribute("maxLength", 30);
email.setAttribute("maxLength", 30);
password.setAttribute("maxLength", 30);
confirmPassword.setAttribute("maxLength", 30);

usernameLabel.setAttribute("for", "username");
emailLabel.setAttribute("for", "email");
passwordLabel.setAttribute("for", "password");
confirmPasswordLabel.setAttribute("for", "confirmPassword");

signupTitle.innerHTML = "<p>SignUp</p>";
usernameLabel.innerText = "Username:";
emailLabel.innerText = "Email:";
passwordLabel.innerText = "Password:";
confirmPasswordLabel.innerText = "Confirm Password:";
checkBoxText.innerText = "Accept Terms & Conditions";
createAccount.innerHTML = "<p>CREATE ACCOUNT</p>";
loginText.innerHTML = "<p>Already have an account?</p?";
loginLink.innerHTML = "<p>Login</p>";

username.setAttribute("type", "text");
email.setAttribute("type", "text");
password.setAttribute("type", "password");
confirmPassword.setAttribute("type", "password");

username.setAttribute("placeholder", "Enter Username");
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
addChild(usernameLabel);
addChild(username);
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
    if (username.value.length === 0) {
        setError("Please enter username");
    }
    else if (getUser(username.value) !== null) {
        setError("Username already exists, Enter a new one.")
    }
    else if (email.value.length === 0) {
        setError("Please enter email");
    }
    else if (!checkEmailAvailability(email.value)) {
        setError("There is an account with this email, Login instead!")
    }
    else if (password.value.length === 0) {
        setError("Please enter password");
    }
    else if (confirmPassword.value.length === 0) {
        setError("Please enter password again");
    }
    else if (confirmPassword.value !== password.value) {
        setError("passwords don't match");
    }
    else if (checkBox.checked === false) {
        setError("Accept Terms & Conditions");
    }
    else {
        loadHomeContent();
    }
}

function checkEmailAvailability(userEmail) {
    for (let i = 0; i < myStorage.length; ++i) {
        const storedEmail = JSON.parse(myStorage.getItem(myStorage.key(i)))["email"];
        if (storedEmail === userEmail) {
            return false;
        }
    }
    return true;
}

function setError(message) {
    errorDiv.innerText = message;
    errorDiv.classList.add("error-div");
}


function loadHomeContent() {
    let user = {
        'username': username.value,
        'email': email.value,
        'password': password.value,
    };
    addUser(user);
    signupPage.parentNode.removeChild(signupPage);
    assignContent(homePage);
}