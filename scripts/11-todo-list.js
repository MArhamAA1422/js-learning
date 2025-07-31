const todoList = [];

function addTodo() {
    const todoNameElement = document.querySelector('.js-todo-name');
    const todoDateElement = document.querySelector('.js-todo-date');
    if (todoNameElement.value.length) todoList.push(
        {
            name: todoNameElement.value,
            dueDate: todoDateElement.value
        }
    );
    
    todoNameElement.value = '';
    // console.log(todoList);

    showTodoList();
}

function showTodoList() {
    const todoListElement = document.querySelector('.js-todo-list');
    let allList = '';

    for (let i = 0; i < todoList.length; i++) {
        const { name, dueDate } = todoList[i];
        allList += `
            <div class="item-info">
                ${name}
            </div>
            <div class="item-info">
                ${dueDate}
            </div>
            <button onclick="deleteTodoItem
            (${i});" class="delete-button">
                Delete
            </button>
        `;
    }

    todoListElement.innerHTML = allList;
}

function deleteTodoItem(id) {
    todoList.splice(id, 1);
    showTodoList();
}