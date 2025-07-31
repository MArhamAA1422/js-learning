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

    todoList.forEach(function (item, index) {
        const { name, dueDate } = item;
        allList += `
            <div class="item-info">
                ${name}
            </div>
            <div class="item-info">
                ${dueDate}
            </div>
            <button onclick="deleteTodoItem
            (${index});" class="delete-button">
                Delete
            </button>
        `;
    });

    todoListElement.innerHTML = allList;
}

function deleteTodoItem(id) {
    todoList.splice(id, 1);
    showTodoList();
}