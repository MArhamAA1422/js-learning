const todoList = [];

function addTodo() {
    const inputElement = document.querySelector('.js-todo-name');
    if (inputElement.value.length) todoList.push(inputElement.value);
    
    inputElement.value = '';
    // console.log(todoList);

    showTodoList();
}

function showTodoList() {
    const todoListElement = document.querySelector('.js-todo-list');
    let allList = '';

    for (let i = 0; i < todoList.length; i++) {
        allList += `<p>${todoList[i]}</p>`;
    }

    todoListElement.innerHTML = allList;
}