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

    todoList.forEach((item, index) => {
        const { name, dueDate } = item;
        allList += `
            <div class="item-info">
                ${name}
            </div>
            <div class="item-info">
                ${dueDate}
            </div>
            <button class="delete-button js-delete-button">
                Delete
            </button>
        `;
    });

    todoListElement.innerHTML = allList;

    document.querySelectorAll('.js-delete-button').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            todoList.splice(index, 1);
            showTodoList();
        });  // index is always there, CLOSURE
    });

    // console.log(index);  // error
}