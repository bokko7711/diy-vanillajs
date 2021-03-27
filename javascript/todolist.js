const toDoForm = document.querySelector(".to-do-asking-form"),
    toDoInput = document.querySelector(".to-do-input"),
    toDoList = document.querySelector(".to-do-list");

const TO_DO_LIST_NAME = "toDoList",
    BLANK = "";

let toDoListArray = [], toDoListIdArray = [0];

function whenDeleted(event) {
    const btn = event.target;
    const li = btn.parentNode;
    //console.log(`button ${li.id} delete in process...`);
    li.parentNode.removeChild(li);
    const deletedArray = toDoListArray.filter(function (toDo) {
        return li.id !== toDo.id;
    });
    const deletedIdArray = toDoListIdArray.filter(function (id) {
        return li.id !== id;
    })
    toDoListArray = deletedArray;
    toDoListIdArray = deletedIdArray;
    localStorage.setItem(TO_DO_LIST_NAME, JSON.stringify(toDoListArray));
}

function createListItem(text) {
    const li = document.createElement("li");
    li.id = Math.max(...toDoListIdArray) + 1;
    //console.log(`li.id=${li.id}`);
    const span = document.createElement("span");
    const button = document.createElement("button");
    li.classList.add("to-do-list-item");
    span.classList.add("to-do-list-item__text");
    button.classList.add("to-do-list-item__button");
    span.innerText = text;
    button.innerText = `DELETE`;
    button.addEventListener("click", whenDeleted);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.append(li);
    const liData = {
        id: li.id,
        text: text
    }
    toDoListArray.push(liData);
    toDoListIdArray.push(liData.id);
    //console.log(toDoListArray);
    localStorage.setItem(TO_DO_LIST_NAME, JSON.stringify(toDoListArray));
}

function showListItem(toDo) {
    const li = document.createElement("li");
    li.id = toDo.id;
    const span = document.createElement("span");
    const button = document.createElement("button");
    li.classList.add("to-do-list-item");
    span.classList.add("to-do-list-item__text");
    button.classList.add("to-do-list-item__button");
    span.innerText = toDo.text;
    button.innerText = `DELETE`;
    button.addEventListener("click", whenDeleted);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.append(li);
}

function whenSubmitted(event) {
    event.preventDefault();
    const tempToDo = toDoInput.value;
    //console.log(tempToDo);
    toDoInput.value = BLANK;
    createListItem(tempToDo);
}

function loadToDoList(loadedToDoList) {
    const parsedToDoList = JSON.parse(loadedToDoList);
    toDoListArray = parsedToDoList;
    parsedToDoList.forEach(function (loadedToDo) {
        showListItem(loadedToDo);
        toDoListIdArray.push(loadedToDo.id);
    });
}

function init() {
    const loadedToDoList = localStorage.getItem(TO_DO_LIST_NAME);
    if (loadedToDoList !== null) {
        loadToDoList(loadedToDoList);
    }
    addEventListener("submit", whenSubmitted);
}

init();