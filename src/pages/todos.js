import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";
import Form from "../components/form.js";
import TodoService from "../services/todos.js";

const updateTodoStatus = async (todo, checkboxValue) => {
    loading.start();

    try {
        const response = await TodoService.updateStatusById(todo.id, checkboxValue);
        loading.stop();

        if (response) {
            generateTodoList();
        } else {
            todo.completed = !todo.completed;
            generateTodoList();
        }
    } catch (error) {
        alert('Failed to send a request to the server. Try again.');
    }
};

const generateTodoElement = (todo, completed) => {
    const todoHTML = document.createElement('div');
    const todoCheckbox = document.createElement('input');
    const todoDescription = document.createElement('span');
    const todoRemoveButton = document.createElement('button');

    todoHTML.classList.add('todo');
    todoCheckbox.setAttribute('type', 'checkbox');
    todoCheckbox.classList.add('todo__checkbox');
    todoCheckbox.checked = completed;
    todoCheckbox.addEventListener('change', function (e) {
        const checkboxValue = e.target.checked;
        updateTodoStatus(todo, checkboxValue);
    });

    todoDescription.classList.add('todo__description');
    todoDescription.innerText = todo.description;

    todoRemoveButton.classList.add('todo__remove');
    todoRemoveButton.innerText = 'Удалить';
    todoRemoveButton.addEventListener('click', async function (e) {
        const response = confirm('Вы уверены?');
        if (response) {
            loading.start();
            await TodoService.deleteById(todo.id);
            generateTodoList();
        }
    });

    todoHTML.appendChild(todoCheckbox);
    todoHTML.appendChild(todoDescription);
    todoHTML.appendChild(todoRemoveButton);

    return todoHTML;
};

const generateTodoList = async () => {
    const todos = await TodoService.getAll();
    const todosContainer = document.querySelector('.todos');

    todosContainer.innerHTML = '';
    loading.stop();

    todos.forEach(todo => {
        const todoHTML = generateTodoElement(todo, todo.completed);
        todosContainer.appendChild(todoHTML);
    });
};

const addTodo = async (description) => {
    loading.start();
    const response = await TodoService.createItem(description);

    if (response.ok) {
        generateTodoList();
        document.getElementById('todo-form').reset();
    } else {
        console.log('Ошибка');
    }
};

const init = async () => {
    const { ok: isLogged } = await Auth.me();

    if (!isLogged) {
        return location.login();
    }

    loading.stop();
    generateTodoList();

    const formEl = document.getElementById('todo-form');

    new Form(formEl, {
        'description': () => false,
    }, (values) => {
        addTodo(values.description);
    });
};

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
