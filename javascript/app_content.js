import { mainPage } from "/javascript/main_page.js";

let appContent = document.getElementById("app-content");
let loggedIn = false;
export let currentPage = null;


if (loggedIn) {

}
else {
    if (currentPage === null) {
        appContent.appendChild(mainPage);
    }
    else {
        appContent.appendChild(currentPage);
    }
}

export function assignContent(content) {
    currentPage = content;
    appContent.appendChild(content);
}








