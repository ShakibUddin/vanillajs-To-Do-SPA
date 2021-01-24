export const myStorage = window.localStorage;


//setItem after JSON.stringify
//getItem after JSON.parse
export function addUser(user){
    myStorage.setItem(user.email,JSON.stringify(user));
}

export function getUser(email){
    return JSON.parse(myStorage.getItem(email));//returns object
}

export function getCurrentUser(){
    return JSON.parse(myStorage.getItem("currentUser"));//returns object
}

export function setCurrentUser(user){
    myStorage.setItem("currentUser",JSON.stringify(user));
}

export function updateCurrentUserToDo(newToDoObject){
    let currentUser = getCurrentUser();
    let updatedUser = {
        'firstName': currentUser["firstName"],
        'lastName': currentUser["lastName"],
        'email': currentUser["email"],
        'password': currentUser["password"],
        'todo': newToDoObject,
    };
    myStorage.setItem("currentUser",JSON.stringify(updatedUser));
    myStorage.setItem(updatedUser["email"],JSON.stringify(updatedUser));    
}
