import { mainPage } from "/javascript/main_page.js";
import { loginPage } from "/javascript/login_page.js";
import { signupPage } from "/javascript/signup_page.js";

let appContent = document.getElementById("app-content");
let loggedIn = false;
export let currentPage = null;

if(loggedIn){

}
else{
    if(currentPage === null){
        appContent.appendChild(mainPage);
    }
    else{
        appContent.appendChild(currentPage);
    }
}

export function assignContent(content){
    currentPage = content;
    appContent.appendChild(content);
}






