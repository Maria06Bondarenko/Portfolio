const taskList = document.querySelector('.task-list');
const taskForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const loader = document.getElementById('loader');
const taskCount = document.getElementById('task-count');
const searchInput = document.querySelector('.search-input');
const filterButtons = document.querySelectorAll('.filter-btn');

let allTasks = []; 

// --- Робота з API ---

async function loadData() {
    showLoader();
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20');
        if (!response.ok) throw new Error('Помилка сервера');
        allTasks = await response.json();
        renderTasks(allTasks);
    } catch (error) {
        showError('Не вдалося завантажити дані.');
    } finally {
        hideLoader();
    }
}

async function deleteTask(id, element) {
    try {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: 'DELETE' });
        allTasks = allTasks.filter(t => t.id !== id);
        element.remove();
        updateCounter();
    } catch (e) { showError('Не вдалося видалити.'); }
}

async function toggleTask(id, completed, element) {
    try {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ completed }),
            headers: { 'Content-type': 'application/json' }
        });
        const task = allTasks.find(t => t.id === id);
        if (task) task.completed = completed;
        element.classList.toggle('completed');
        updateCounter();
    } catch (e) { showError('Помилка оновлення.'); }
}

// --- Рендеринг та UI ---

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;

    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-title">${task.title}</span>
        <button class="task-delete">Видалити</button>
    `;
    return li;
}

function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(createTaskElement(task)));
    updateCounter();
}

function updateCounter() {
    const activeCount = allTasks.filter(t => !t.completed).length;
    taskCount.textContent = `Активних: ${activeCount}`;
}

function showLoader() { loader.classList.remove('hidden'); }
function hideLoader() { loader.classList.add('hidden'); }
function showError(msg) {
    const errDiv = document.getElementById('error-message');
    errDiv.textContent = msg;
    errDiv.classList.remove('hidden');
    setTimeout(() => errDiv.classList.add('hidden'), 3000);
}

// --- Обробники подій ---

// Делегування подій для списку
taskList.addEventListener('click', async (event) => {
    const target = event.target;
    const taskItem = target.closest('.task-item');
    if (!taskItem) return;
    const taskId = Number(taskItem.dataset.id);

    if (target.classList.contains('task-delete')) {
        await deleteTask(taskId, taskItem);
    }
    if (target.classList.contains('task-checkbox')) {
        await toggleTask(taskId, target.checked, taskItem);
    }
});

// Додавання нового завдання
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    showLoader();
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({ title, completed: false, userId: 1 }),
            headers: { 'Content-type': 'application/json' }
        });
        const newTask = await res.json();
        newTask.id = Date.now(); // Для унікальності в локальному масиві
        allTasks.unshift(newTask);
        renderTasks(allTasks);
        taskInput.value = '';
        addBtn.disabled = true;
    } catch (e) { showError('Не вдалося додати.'); }
    finally { hideLoader(); }
});

// Блокування кнопки
taskInput.addEventListener('input', () => {
    addBtn.disabled = !taskInput.value.trim();
});

// Пошук з Debounce
function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

const handleSearch = debounce((query) => {
    const filtered = allTasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
    renderTasks(filtered);
}, 300);

searchInput.addEventListener('input', (e) => handleSearch(e.target.value));

// Фільтрація
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(button => button.classList.remove('active'));
        btn.classList.add('active');

        const filterType = btn.dataset.filter;
        let filteredTasks = allTasks;

        if (filterType === 'active') filteredTasks = allTasks.filter(t => !t.completed);
        if (filterType === 'completed') filteredTasks = allTasks.filter(t => t.completed);

        renderTasks(filteredTasks);
    });
});

// --- Старт ---
loadData();