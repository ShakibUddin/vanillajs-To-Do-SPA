import { homePage } from "/javascript/home_page.js";
import { assignContent } from "/javascript/app_content.js";
import { changeNamePage,loadCurrentUserName } from "/javascript/change_name_page.js";
import { changeEmailPage,loadCurrentUserEmail } from "/javascript/change_email_page.js";
import { changePasswordPage } from "/javascript/change_password_page.js";


export const accountSettingsPage = document.createElement("div");
const changeName = document.createElement("div");
const changeEmail = document.createElement("div");
const changePassword = document.createElement("div");
const cancel = document.createElement("div");

accountSettingsPage.classList.add("buttonDiv");
changeName.classList.add("changeName");
changeEmail.classList.add("changeEmail");
changePassword.classList.add("changePassword");
cancel.classList.add("goBack");

changeName.innerHTML = "<p>Change Name</p>";
changeEmail.innerHTML = "<p>Change Email</p>";
changePassword.innerHTML = "<p>Change Password</p>";
cancel.innerHTML = "<p>Cancel</p>";


changeName.addEventListener("click",loadChangeNameContent);
changeEmail.addEventListener("click",loadChangeEmailContent);
changePassword.addEventListener("click",loadChangePasswordContent);
cancel.addEventListener("click",loadHomeContent);

accountSettingsPage.appendChild(changeName);
accountSettingsPage.appendChild(changeEmail);
accountSettingsPage.appendChild(changePassword);
accountSettingsPage.appendChild(cancel);

function loadChangeNameContent(){
    loadCurrentUserName();
    accountSettingsPage.parentNode.removeChild(accountSettingsPage);
    assignContent(changeNamePage);
}
function loadChangeEmailContent(){
    loadCurrentUserEmail();
    accountSettingsPage.parentNode.removeChild(accountSettingsPage);
    assignContent(changeEmailPage);
}
function loadChangePasswordContent(){
    accountSettingsPage.parentNode.removeChild(accountSettingsPage);
    assignContent(changePasswordPage);
}
function loadHomeContent(){
    accountSettingsPage.parentNode.removeChild(accountSettingsPage);
    assignContent(homePage);
}