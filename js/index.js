//Initial variables
const list = document.querySelector(".list");
const toDoInput = document.querySelector(".to-do__input");
let todoArr = JSON.parse(localStorage.getItem("arr"));

window.onload = init;

function getNum(el) {
    let i = 0;
    while (el = el.previousSibling) {
        el.nodeType == 1 && i++;
    }
    return i;
}


function AddTodo(event, task = '', stage) {
    let newListItem = document.createElement("li");
    let newListItemText = document.createElement("span");
    let newListItemBtnComplete = document.createElement("a");
    let newListItemBtnDelete = document.createElement("a");

    newListItem.className = "list__item";
    newListItemText.className = "list__item-text";
    newListItemBtnComplete.className = "list__item-btn list__item-btn--complete";
    newListItemBtnDelete.className = "list__item-btn list__item-btn--delete";

    newListItem.appendChild(newListItemText);
    newListItem.appendChild(newListItemBtnComplete);
    newListItem.appendChild(newListItemBtnDelete);

    //Add Event Listener for Complete Button
    newListItemBtnComplete.addEventListener("click", (event) => {
        newListItem.classList.toggle("list__item--completed");

        let numberOfCompleted = getNum(event.target.parentNode);
        let completeTodoObject = JSON.parse(todoArr[numberOfCompleted]);

        if(newListItem.className === "list__item list__item--completed") {
            completeTodoObject.stage = true;
        }
        else {
            completeTodoObject.stage = false;
        }

        todoArr[numberOfCompleted] = JSON.stringify(completeTodoObject);
        localStorage.setItem("arr", JSON.stringify(todoArr));

    },false);

    //Add Event Listener for Delete Button
    newListItemBtnDelete.addEventListener("click", (event) => {
       // newListItem.classList.add("list__item--deleted");
        let numberOfDeleted = getNum(event.target.parentNode);
        todoArr.splice(numberOfDeleted, 1);
        console.log(numberOfDeleted);
        localStorage.setItem("arr", JSON.stringify(todoArr));
        newListItem.parentNode.removeChild(newListItem);

    },false);

    if(event !== null) {
        if(event.keyCode === 13 && toDoInput.value.split(' ').join('') !== '') {
            newListItemText.innerHTML = toDoInput.value;
            list.appendChild(newListItem);

            let todoObject = {
                task: toDoInput.value,
                stage: false
            }

            toDoInput.value = '';
    
            todoArr.push(JSON.stringify(todoObject));
            localStorage.setItem("arr", JSON.stringify(todoArr));
        }
    }
    else {  
        newListItemText.innerHTML = task;
        if(stage === true) {
            newListItem.classList.add("list__item--completed");
        }

        list.appendChild(newListItem);
    }
}

function InsertPreviousTodo(todoArr) {
    for(let todo of todoArr) {
        console.log();
        AddTodo(null, (JSON.parse(todo)).task, (JSON.parse(todo)).stage);
    }
}

function init () {

    if(todoArr === null) {
        todoArr = [];
    }
    else {
        InsertPreviousTodo(todoArr);   
    }
    

    //Add todo function
    toDoInput.addEventListener("keyup", AddTodo, false)
}
