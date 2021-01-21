export const myStorage = window.localStorage;

export let currentUser = {
    "username": "",
    "email": "",
    "password": "",
};

export function addUser(user){
    myStorage.setItem(user.username,JSON.stringify(user));
}

export function getUser(username){
    return myStorage.getItem(username);
}

export function setCurrentUser(user){
    currentUser = user;
    console.log(currentUser);
}