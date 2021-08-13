// Создает новый элемент с переданными параметрами. parentNode и tag - являются обязательными
function createElement(parentNode, tag, classList, attribute) {
    const element = document.createElement(tag);

    if (classList) element.classList.add(...classList);

    if (attribute) element.setAttribute(...attribute);

    parentNode.appendChild(element);
    
    return element;
}

// Заменяет переданный чекбокс на галочку (выполненное задание)
function replaceCheckbox(taskCheckbox) {
    const taskBlock = taskCheckbox.parentElement;
    taskBlock.removeChild(taskCheckbox);

    const block = createElement(taskBlock, 'div');
    createElement(block, 'i', ['fa', 'fa-check'], ['aria-hidden', 'true']);
}

// Устанавливает обработку события change для переданного чекбокса
function setTaskCheckedEvent(taskCheckbox) {
    taskCheckbox.addEventListener("change", () => {
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

// Подготавливает все события на странице
function prepareEvent() {
    setTasksCheckedEvent();
}

prepareEvent();