import {assignContent} from "/javascript/app_content.js";
import {signupPage} from "/javascript/signup_page.js";
export let loginPage = document.createElement("div");

const email = document.createElement("INPUT");
const password = document.createElement("INPUT");
const loginButton = document.createElement("div");
const signupDiv = document.createElement("div");
const signupText = document.createElement("div");

const emailLabel = document.createElement("LABEL");
const passwordLabel = document.createElement("LABEL");
const signupLink = document.createElement("div");

loginPage.id = "login-page";
email.id = "email";
password.id = "password";
loginButton.id = "login-button";
signupDiv.id = "signup-div";
signupLink.id = "signup-link";

email.setAttribute("name","email");
password.setAttribute("name","password");

emailLabel.setAttribute("for","email");
passwordLabel.setAttribute("for","password");

emailLabel.innerText = "Email:";
passwordLabel.innerText = "Password:";
loginButton.innerHTML = "<p>LOGIN</p>";
signupText.innerHTML = "<p>Don't have an account?</p?";
signupLink.innerHTML = "<p>Signup</p>";

email.setAttribute("type","text");
password.setAttribute("type","password");

email.setAttribute("placeholder","Enter email");
password.setAttribute("placeholder","Enter password");

signupLink.addEventListener("click",loadSignupContent);

signupDiv.style.textAlign = "center";

signupDiv.appendChild(signupText);
signupDiv.appendChild(signupLink);

addChild(emailLabel);
addChild(email);
addChild(passwordLabel);
addChild(password);
addChild(loginButton);
addChild(signupDiv);

export function addChild(content){
    loginPage.appendChild(content);
}

function loadSignupContent(content){
    loginPage.parentNode.removeChild(loginPage);
    assignContent(signupPage);
}