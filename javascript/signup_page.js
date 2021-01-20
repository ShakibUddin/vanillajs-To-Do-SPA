import {assignContent} from "/javascript/app_content.js";
import {loginPage} from "/javascript/login_page.js";
export let signupPage = document.createElement("div");

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

const usernameLabel = document.createElement("LABEL");
const emailLabel = document.createElement("LABEL");
const passwordLabel = document.createElement("LABEL");
const confirmPasswordLabel = document.createElement("LABEL");
const loginLink = document.createElement("div");

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

username.setAttribute("name","username");
email.setAttribute("name","email");
password.setAttribute("name","password");
confirmPassword.setAttribute("name","confirmPassword");

usernameLabel.setAttribute("for","username");
emailLabel.setAttribute("for","email");
passwordLabel.setAttribute("for","password");
confirmPasswordLabel.setAttribute("for","confirmPassword");

usernameLabel.innerText = "Username:";
emailLabel.innerText = "Email:";
passwordLabel.innerText = "Password:";
confirmPasswordLabel.innerText = "Confirm Password:";
checkBoxText.innerText = "Accept Terms & Conditions";
createAccount.innerHTML = "<p>CREATE ACCOUNT</p>";
loginText.innerHTML = "<p>Already have an account?</p?";
loginLink.innerHTML = "<p>Login</p>";


username.setAttribute("type","text");
email.setAttribute("type","text");
password.setAttribute("type","password");
confirmPassword.setAttribute("type","password");

username.setAttribute("placeholder","Enter Username");
email.setAttribute("placeholder","Enter email");
password.setAttribute("placeholder","Enter password");
confirmPassword.setAttribute("placeholder","Confirm Password");
checkBox.setAttribute("type","checkbox");

loginLink.addEventListener("click",loadLoginContent);

login.style.textAlign = "center";

termsAndConditions.appendChild(checkBox);
termsAndConditions.appendChild(checkBoxText);
login.appendChild(loginText);
login.appendChild(loginLink);

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

export function addChild(content){
    signupPage.appendChild(content);
}

function loadLoginContent(content){
    signupPage.parentNode.removeChild(signupPage);
    assignContent(loginPage);
}