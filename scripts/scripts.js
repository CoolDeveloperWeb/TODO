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
        taskCheckbox.parentElement.classList.add('done');
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


// Подготавливает все события на странице
function prepareEvent() {
    setTasksCheckedEvent();
    setChangeDayNightCheckedEvent();
}

prepareEvent();