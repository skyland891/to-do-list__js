window.onload = init;

function init () {
    //Initial variables
    const list = document.querySelector(".list");
    const complete = document.querySelectorAll(".list__item-btn--complete");    
    const del = document.querySelectorAll(".list__item-btn--delete"); 
    const listItem = document.querySelectorAll(".list__item");
    const listItemArr = [...listItem];
    const toDoInput = document.querySelector(".to-do__input");
    //Completed and deleted function
    /*
    [...complete].map((item, index) => {
        item.addEventListener("click", () => {
            listItemArr[index].classList.toggle("list__item--completed")
        },false);
    });

    [...del].map((item, index) => {
        item.addEventListener("click", () => {
            listItemArr[index].classList.add("list__item--deleted")
        },false);
    });
    */
    //Add todo function
    toDoInput.addEventListener("keyup", (event) => {
        if((event.isCompousing || event.keyCode === 13) && toDoInput.value.split(' ').join('') !== '') {
            let newListItem = document.createElement("li");
            let newListItemText = document.createElement("span");
            let newListItemBtnComplete = document.createElement("a");
            let newListItemBtnDelete = document.createElement("a");

            newListItem.className = "list__item";
            newListItemText.className = "list__item-text";
            newListItemText.innerHTML = toDoInput.value;

            newListItemBtnComplete.className = "list__item-btn list__item-btn--complete";
            newListItemBtnDelete.className = "list__item-btn list__item-btn--delete";

            newListItem.appendChild(newListItemText);
            newListItem.appendChild(newListItemBtnComplete);
            newListItem.appendChild(newListItemBtnDelete);

            newListItemBtnComplete.addEventListener("click", () => {
                newListItem.classList.toggle("list__item--completed")
            },false);

            newListItemBtnDelete.addEventListener("click", () => {
                newListItem.classList.add("list__item--deleted")
            },false);

            list.appendChild(newListItem);
        }
    }, false)

}