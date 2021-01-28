import { loginPage } from "/javascript/login_page.js";
import { signupPage } from "/javascript/signup_page.js";
import { assignContent } from "/javascript/app_content.js";
export let mainPage = document.createElement("div");
const title = document.createElement("div");
const loginButton = document.createElement("div");
const signupButton = document.createElement("div");


title.id = "title";
loginButton.id = "login";
signupButton.id = "signup";


title.innerHTML = "<p>Task Manager</p>";
loginButton.innerHTML = "<p>LOGIN</p>";
signupButton.innerHTML = "<p>SIGNUP</p>";

mainPage.appendChild(title);
mainPage.appendChild(loginButton);
mainPage.appendChild(signupButton);

loginButton.addEventListener("click", loadLoginContent);
signupButton.addEventListener("click", loadSignupContent);

function loadLoginContent(e) {
    assignContent(loginPage);
    mainPage.parentNode.removeChild(mainPage);
}
function loadSignupContent(e) {
    assignContent(signupPage);
    mainPage.parentNode.removeChild(mainPage);
}
