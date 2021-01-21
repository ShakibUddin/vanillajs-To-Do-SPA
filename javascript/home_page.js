import {assignContent} from "/javascript/app_content.js";
import {currentUser} from "/javascript/storage.js";

export const homePage = document.createElement("div");

homePage.innerHTML = `<h2>Welcome ${currentUser["username"]}</h2>`;