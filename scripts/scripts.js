// Тестовый масив заданий на проверку инфрормации о задании
let tasks = [
    {
        id: 1,
        name: 'Сделать 1',
        discription: 'Что непонятного, сделать первое задание, мде',
        done: false
    },
    {
        id: 2,
        name: 'Сделать 2',
        discription: 'Что непонятного, сделать второе задание, мде',
        done: false
    },
];

const store = {
    tasks: [
        {
            id: 1
        },
        {
            id: 2
        }
    ],
    lastId() {
        console.log(this.tasks);
    }
}

function input(value) {
    console.log(value)
}

function setZIndexAndOpacity(element, zIndex, opacity) {
    element.style.zIndex = zIndex.toString();
    element.style.opacity = opacity;
}

function openModalWindowAddTask(modal, back) {
    setZIndexAndOpacity(back, 1, 0.3);
    setZIndexAndOpacity(modal, 1, 1);
}

function closeModalAddTask(modal, back) {
    console.log(modal)
    console.log(back);
    const inputs = document.querySelectorAll('.item-form-add input');

    setZIndexAndOpacity(modal, -1, 0);
    setZIndexAndOpacity(back, -1, 0);
    
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function addEventClickAddTask(modal, back) {
    const buttonAdd = document.querySelector('.add-task-button');

    buttonAdd.addEventListener('click', () => openModalWindowAddTask(modal, back));
    back.addEventListener('click', () => closeModalAddTask(modal, back));
}

function changeInput(input) {
    const label = input.nextElementSibling;

    if (input.value.length) {
        label.classList.add('full-text');
    } else {
        label.classList.remove('full-text');
    }
}

function addEventChangeInput() {
    const inputs = document.querySelectorAll('.item-form-add input');

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', () => changeInput(inputs[i]));
    }
}

function clickAddTask(modal, back) {
    const list = document.querySelector('.list-tasks');
    const fieldNameTask = document.getElementById('name-task');
    const record = document.createElement('li');
    record.className = 'task-item';
    record.textContent = fieldNameTask.value;
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'task-checkbox';
    record.append(checkBox);
    list.append(record);
    closeModalAddTask(modal, back);
}

// Скрывает блок с описанием задачи
function setHiddenAboutTaskBlock() {
    const aboutTaskBlock = document.querySelector('.about-task');
    if(!aboutTaskBlock.classList.contains('hidden')) aboutTaskBlock.classList.add('hidden');
}

// Показывает блок с описанием задачи
function setVisibleAboutTaskBlock() {
    const aboutTaskBlock = document.querySelector('.about-task');
    if(aboutTaskBlock.classList.contains('hidden')) aboutTaskBlock.classList.remove('hidden');
}

// Заполняет блок описания задачи данными.
// Сделал для того, чтобы можно было очистить блок,
// Передав пустые строки. Если 'display: none' сразу очищает
// поля, то уберу эту функцию.
function fullInfoTaskBlock(name, discription, status) {
    const nameTaskBlock = document.querySelector('.about-task .about-task-name');
    const discriptionTaskBlock = document.querySelector('.about-task .about-task-discription');

    if(status) {
        nameTaskBlock.classList.add('done-task');
        discriptionTaskBlock.classList.add('done-task');
    }

    nameTaskBlock.value = name;
    discriptionTaskBlock.value = discription;   

    setVisibleAboutTaskBlock();
}

// Выводит подробную информацию о задании с указанным id
function getInfoTask(id) {
    const neededTask = tasks.find(elem => (elem.id === id));

    fullInfoTaskBlock(neededTask.name, neededTask.discription, neededTask.done);
}

// Удаляет задание task со страницы и с массива заданий
function deleteTask(task) {
    const neededId = parseInt(task.id);
    tasks = tasks.filter(elem => (elem.id !== neededId));

    task.remove();
}

function addTaskModal(modal, back) {
    const addButton = document.querySelector('.modal-add-button');
    addButton.addEventListener('click', () => clickAddTask(modal, back));
}

//Нужно сделать обработку полей
function modalAddTask() {
    const modal = document.querySelector('.modal-add-task');
    const back = document.querySelector('.modal');

    addEventClickAddTask(modal, back);
    addEventChangeInput();
    addTaskModal(modal, back);
}

// Создает новый элемент с переданными параметрами. parentNode и tag - являются обязательными
function createElement(parentNode, tag, classList, attributes) {
    const element = document.createElement(tag);

    if (classList) element.classList.add(...classList);

    if (attributes) Object.entries(attributes).forEach(attribute => element.setAttribute(...attribute));

    parentNode.appendChild(element);
    
    return element;
}

// Заменяет переданный чекбокс на галочку (выполненное задание)
function replaceCheckbox(taskCheckbox) {
    const taskBlock = taskCheckbox.parentElement;
    taskBlock.removeChild(taskCheckbox);

    const block = createElement(taskBlock, 'div');

    const objAttributes = {
        'aria-hidden': 'true',
    };

    createElement(block, 'i', ['fa', 'fa-check'], {...objAttributes});
}

// Устанавливает обработку события change для переданного чекбокса
function setTaskCheckedEvent(taskCheckbox) {
    taskCheckbox.addEventListener('change', () => {
        taskCheckbox.checked = false;
        taskCheckbox.parentElement.parentElement.classList.add('done');
        replaceCheckbox(taskCheckbox);
    })
}

// Устанавливает обработку change для существующих чекбоксов
function setTasksCheckedEvent() {
    const taskCheckboxes = document.querySelectorAll('.task-checkbox');

    for(let i = 0; i < taskCheckboxes.length; i++) {
        setTaskCheckedEvent(taskCheckboxes[i]);
    }
}

// Устанавливает событие смены ночного и дневного режима
function setChangeDayNightCheckedEvent() {
    const toggleDayNight = document.querySelector('#change-color');

    toggleDayNight.addEventListener('change', () => {
        console.log(toggleDayNight.nextElementSibling.firstElementChild.classList.toggle('night'));
    });
}

// Устанавливает событие клика для одного блока подробной информации о задании
function setClickInfoTaskEvent(block) {
    block.addEventListener('click', () => {
        getInfoTask(parseInt(block.parentElement.parentElement.parentElement.id));
    });
}

// Устанавливает событие клика для всех блоков подробной информации о задании
function setClickInfoTasksEvent() {
    const infoTaskBlocks = document.querySelectorAll('.info-icon');

    for(let i = 0; i < infoTaskBlocks.length; i++) {
        setClickInfoTaskEvent(infoTaskBlocks[i]);
    }
}

// Устанавливает событие клика для одного блока удаления задания
function setClickDeleteTaskEvent(block) {
    block.addEventListener('click', () => {
        deleteTask(block.parentElement.parentElement.parentElement);
    });
}

// Устанавливает событие клика для всех блоков удаления задания
function setClickDeleteTasksEvent() {
    const deleteTaskBlocks = document.querySelectorAll('.delete-icon');

    for(let i = 0; i < deleteTaskBlocks.length; i++) {
        setClickDeleteTaskEvent(deleteTaskBlocks[i]);
    }
}

// Подготавливает все события на странице
function prepareEvent() {
    setTasksCheckedEvent();
    setClickDeleteTasksEvent();
    setClickInfoTasksEvent();

    setChangeDayNightCheckedEvent();

    modalAddTask();
}

prepareEvent();