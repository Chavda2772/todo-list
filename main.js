const input = document.getElementById('input');
const form = document.getElementById('form');
var todoList = document.getElementById('todos');
const storedTodo = JSON.parse(localStorage.getItem('todos'));

if(storedTodo){
    storedTodo.forEach(function(todo, idx){
        addTodo(todo);
    });
}

form.addEventListener('submit',function(e){
    e.preventDefault();

    addTodo();
    input.value = "";
});

function addTodo(todo){
    var todoText = input.value;

    if(todo){
        todoText = todo.text;
    }

    if(todoText){
        const spanEl = document.createElement('span');
        spanEl.innerText = todoText;
    
        const divEl = document.createElement('div');
        divEl.classList.add('content');
        divEl.appendChild(spanEl);
    
        const listEl = document.createElement('li');
        listEl.appendChild(divEl);

        if(todo){
            listEl.classList.add('completed');
        }
    
        listEl.addEventListener('click',()=>{
            listEl.classList.toggle('completed');
            updateLocalStorage();
        });
    
        listEl.addEventListener('contextmenu',(e)=>{
            e.preventDefault();
            listEl.remove();
            updateLocalStorage();
        });
    
        todoList.appendChild(listEl);
        updateLocalStorage();
    }
}

function updateLocalStorage(){
    var localTodos = [];
    
    var todoLists = document.querySelectorAll('#todos li');
    todoLists.forEach((todo,idx)=>{
        localTodos.push({
            text: todo.innerText,
            isCompleted: todo.classList.contains('completed')
        });
    });

    localStorage.setItem('todos',JSON.stringify(localTodos))
}