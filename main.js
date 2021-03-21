const input = document.getElementById("input");
const form = document.getElementById("form");
var todoList = document.getElementById("todos");
const storedTodo = JSON.parse(localStorage.getItem("todos"));

if (storedTodo) {
  storedTodo.forEach(function (todo, idx) {
    addTodo(todo);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  addTodo();
  input.value = "";
  input.focus();
});

function addTodo(todo) {
  var todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const listEl = document.createElement("li");
    const conDivEl = document.createElement("div");
    conDivEl.classList.add("content");

    const spanEl = document.createElement("span");
    spanEl.innerText = todoText;

    const AcDivEl = document.createElement("div");
    AcDivEl.classList.add("action");

    const deleteButton = document.createElement("button");
    deleteButton.id = "delete";
    deleteButton.addEventListener("click", (e) => {
      listEl.remove();
    });
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

    conDivEl.appendChild(spanEl);

    AcDivEl.appendChild(deleteButton);

    listEl.appendChild(conDivEl);
    listEl.appendChild(AcDivEl);

    if (todo) {
      if (todo.isCompleted) {
        listEl.classList.add("completed");
      }
    }

    listEl.addEventListener("click", () => {
      listEl.classList.toggle("completed");
      updateLocalStorage();
    });

    listEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      listEl.remove();
      updateLocalStorage();
    });

    todoList.appendChild(listEl);
    updateLocalStorage();
    window.scrollTo(0, document.body.scrollHeight);
  }
}

function updateLocalStorage() {
  var localTodos = [];

  var todoLists = document.querySelectorAll("#todos li");
  todoLists.forEach((todo, idx) => {
    localTodos.push({
      text: todo.innerText,
      isCompleted: todo.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(localTodos));
}
