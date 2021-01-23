export const myStorage = window.localStorage;

export function addUser(user){
    myStorage.setItem(user.email,JSON.stringify(user));
}

export function getUser(email){
    return myStorage.getItem(email);
}

export function getCurrentUser(){
    return myStorage.getItem("currentUser");
}

export function setCurrentUser(user){
    myStorage.setItem("currentUser",user);
}

export function updateCurrentUserToDo(newToDoObject){
    let currentUser = getCurrentUser();
    let updatedUser = {
        'firstName': JSON.parse(currentUser)["firstName"],
        'lastName': JSON.parse(currentUser)["lastName"],
        'email': JSON.parse(currentUser)["email"],
        'password': JSON.parse(currentUser)["password"],
        'todo': newToDoObject,
    };
    myStorage.setItem("currentUser",JSON.stringify(updatedUser));
    myStorage.setItem(updatedUser["email"],JSON.stringify(updatedUser));
    let updatedToDos = JSON.parse(getCurrentUser())["todo"];
    console.log("updated todos");
    for(let key in updatedToDos){
        console.log(updatedToDos[key]);
    }
}
