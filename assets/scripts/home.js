// ************************************************** //

const newTask = document.getElementById("new-task");

function logout() {
    window.alert("You have been logged out");
    window.location.href = "login.html";
}

// Evento 'focus' - limpa o placeholder e ajusta o font-weight
newTask.addEventListener('focus', function() {
    if (this.value === 'Create new task...') {
        this.value = '';
    }
    this.style.fontWeight = 'bold'; // Coloca o texto em negrito quando o input recebe foco
});

// Evento 'blur' - restaura o placeholder e ajusta o font-weight
newTask.addEventListener('blur', function() {
    if (this.value === '') {
        this.value = 'Create new task...';
        this.style.fontWeight = 'normal'; // Retorna ao peso normal quando o input perde foco e está vazio
    } else if (this.value !== 'Create new task...') {
        this.style.fontWeight = 'bold'; // Mantém o negrito se houver texto
    }
});

// Evento 'input' - ajusta o font-weight conforme o texto é digitado
newTask.addEventListener('input', function() {
    if (this.value !== '' && this.value !== 'Create new task...') {
        this.style.fontWeight = 'bold'; // Coloca o texto em negrito quando o usuário digita
    } else {
        this.style.fontWeight = 'normal'; // Retorna ao peso normal se o input ficar vazio ou igual ao placeholder
    }
});

let taskIdCounter = 0;
const warning = document.querySelector('.warning');
const spanNoTask = document.querySelector('.no-task');
const img = document.querySelector('.img-task');

function addTask() {

    const taskValue = newTask.value.trim();

    if (!taskValue || taskValue === 'Create new task...') {
        warning.style.display = 'block';
        return;
    } 

    warning.style.display = 'none';

    // incrementa o contador de tarefas (para a geração do id)
    taskIdCounter++;

    // chama a função que cria uma nova div
    const newTaskDiv = createTaskElement(taskValue, taskIdCounter);
    document.getElementById('tasks').appendChild(newTaskDiv);

    // Remove o span, a imagem e adiciona a classe 'has-task' ao bloco de tasks, que é tratado no css
    if(spanNoTask) spanNoTask.remove();
    if(img) img.remove();
    document.getElementById('tasks').classList.add('has-task');

    // Limpando o campo de input
    newTask.value = 'Create new task...';
    newTask.style.fontWeight = 'normal';

    // log para o backend
    console.log('Tarefa criada. ID: ', newTaskDiv.id);
   
}

// Função para criar a div que irá conter a task

function createTaskElement(taskValue, taskId) {

    const newTaskDiv = document.createElement('div');
    newTaskDiv.id = `task-${taskId}`;
    newTaskDiv.classList.add('task-item');

    const newCheckbox = createCheckbox(taskValue, taskId);
    const newImgDiv = createImgButtons();

    newTaskDiv.appendChild(newCheckbox);
    newTaskDiv.appendChild(newImgDiv);

    return newTaskDiv;

}


// Função para criar a div do checkbox e o nome da tarefa

function createCheckbox(taskValue, taskId) {
    const checkboxDiv = document.createElement('div');
    checkboxDiv.className = 'checkbox-div';

    const newInput = document.createElement('input');
    newInput.type = 'checkbox';
    newInput.className = 'checkbox-task';

    const newLabel = document.createElement('label');
    newLabel.htmlFor = `task-${taskId}`;
    newLabel.className = 'checkbox-label';
    newLabel.textContent = taskValue;

    checkboxDiv.appendChild(newInput);
    checkboxDiv.appendChild(newLabel);

    return checkboxDiv;
}

// Função para criar a div dos botões edit e remove

function createImgButtons() {

    const imgDiv = document.createElement('div');
    imgDiv.className = 'img-box';

    const imgEdit = createImgButton('../assets/img/edit-svg.svg', 'edit', 40, 35);
    const imgRemove = createImgButton('../assets/img/remove-svg.svg', 'remove', 40, 30);

    imgDiv.appendChild(imgEdit);
    imgDiv.appendChild(imgRemove);

    return imgDiv;
}

// Função para criar as imagens individualmente, utilizando os parâmetros

function createImgButton(src, alt, width, height) {
    const img = document.createElement('img');

    img.src = src;
    img.alt = alt;
    img.width = width;
    img.height = height;

    return img;
}
