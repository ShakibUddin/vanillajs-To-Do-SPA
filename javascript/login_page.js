import {assignContent} from "/javascript/app_content.js";
import {signupPage} from "/javascript/signup_page.js";
import {homePage,displayCurrentTodos} from "/javascript/home_page.js";
import {myStorage,setCurrentUser,getUser} from "/javascript/storage.js";
export let loginPage = document.createElement("div");

const errorDiv = document.createElement("div");
const loginTitle = document.createElement("div");
const email = document.createElement("INPUT");
const password = document.createElement("INPUT");
const loginButton = document.createElement("div");
const signupDiv = document.createElement("div");
const signupText = document.createElement("div");

const emailLabel = document.createElement("LABEL");
const passwordLabel = document.createElement("LABEL");
const signupLink = document.createElement("div");

loginTitle.id = "login-title";
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

loginTitle.innerHTML = "<p>SignIn<p>";
emailLabel.innerText = "Email:";
passwordLabel.innerText = "Password:";
loginButton.innerHTML = "<p>LOGIN</p>";
signupText.innerHTML = "<p>Don't have an account?</p?";
signupLink.innerHTML = "<p>Signup</p>";

email.setAttribute("type","email");
password.setAttribute("type","password");

email.setAttribute("maxLength","40");
password.setAttribute("maxLength","20");

email.setAttribute("placeholder","Enter email");
password.setAttribute("placeholder","Enter password");

loginButton.addEventListener("click",validateLoginData);
signupLink.addEventListener("click",loadSignupContent);

signupDiv.style.textAlign = "center";

signupDiv.appendChild(signupText);
signupDiv.appendChild(signupLink);

addChild(loginTitle);
addChild(errorDiv);
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

function validateLoginData(){
    if (email.value.length === 0) {
        setError("Please enter email");
    }
    else if (password.value.length === 0) {
        setError("Please enter password");
    }
    else {
        if(checkCredentials(email.value,password.value)){
            loadHomeContent(homePage);
        }
        else{
            setError("Invalid Email/Password");
        }
    }
}

function loadHomeContent(content){
    loginPage.parentNode.removeChild(loginPage);
    assignContent(content);
}

function checkCredentials(userEmail,userPassword){
    for (let i = 0; i < myStorage.length; ++i) {
        const storedEmail = getUser(myStorage.key(i))["email"];
        const storedPassword = getUser(myStorage.key(i))["password"];
        if (storedEmail === userEmail && storedPassword === userPassword) {
            //getting user info for session
            console.log(typeof getUser(storedEmail));
            setCurrentUser(getUser(storedEmail));
            displayCurrentTodos();
            return true;
        }
    }
    return false;
}

function setError(message) {
    errorDiv.innerText = message;
    errorDiv.classList.add("error-div");
    errorDiv.style.visibility = "visible";
    setTimeout(function() {
        errorDiv.style.visibility = "hidden";
      }, 3000); // 3 second
}