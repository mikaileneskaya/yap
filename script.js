const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
let liste;

loadItems();
eventListeners();

function eventListeners() {
    form.addEventListener("submit", newItem);
    ul.addEventListener("click", deleteItem);
}

function loadItems() {
    liste = getItemsFromLS();
    liste.forEach(function (item) {
        createItem(item);
    })
}

function getItemsFromLS() {
    if (localStorage.getItem("liste") === null) {
        liste = [];
    }
    else {
        liste = JSON.parse(localStorage.getItem("liste"));
    }
    return liste;
}

function setItemToLS(newTodo) {
    liste = getItemsFromLS();
    liste.push(newTodo);
    localStorage.setItem("liste", JSON.stringify(liste));
}

function createItem(newTodo) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(newTodo));

    const i = document.createElement("i");
    i.classList = "fa-solid fa-check";
    li.appendChild(i);
    ul.appendChild(li);
}

function newItem(e) {
    if (input.value === '') {
        alert("Lütfen bu alanı doldurunuz.");
    }
    else {
        createItem(input.value);
        setItemToLS(input.value);
        input.value = "";
    }
    e.preventDefault();
}

function deleteItem(e) {
    if (e.target.className === "fa-solid fa-check") {
        e.target.parentElement.remove();
        deleteToDoFromStorage(e.target.parentElement.textContent);
    }
    e.preventDefault();
}

function deleteToDoFromStorage(deletetodo) {
    let liste = getItemsFromLS();
    liste.forEach(function (todo, index) {
        if (todo === deletetodo) {
            liste.splice(index, 1);
        }
    });
    localStorage.setItem("liste", JSON.stringify(liste));
}
