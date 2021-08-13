function openModalWindowAddTask(modal, back) {
    back.style.zIndex = '1';
    back.style.opacity = 0.3;
    modal.style.zIndex = '1';
    modal.style.opacity = 1;
}

function clickBackModalAddTask(modal, back) {
    const inputs = document.querySelectorAll('.item-form-add input');
    modal.style.zIndex = '-1';
    modal.style.opacity = 0;
    back.style.zIndex = '-1';
    back.style.opacity = 0;

    
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function addEventClickAddTask() {
    const buttonAdd = document.querySelector('.add-task-button');
    const modal = document.querySelector('.modal-add-task');
    const back = document.querySelector('.modal');

    buttonAdd.addEventListener('click', () => openModalWindowAddTask(modal, back));
    back.addEventListener('click', () => clickBackModalAddTask(modal, back));
}

function changeInput(input) {
    const label = input.nextElementSibling;
    console.log(label);
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

addEventClickAddTask();
addEventChangeInput();