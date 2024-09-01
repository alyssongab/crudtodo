document.addEventListener('DOMContentLoaded', function() {

// ************************************************** //

const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', function() {
    logout();
});

function logout() {
    window.alert("You have been logged out");
    window.location.href = "login.html";
}


const newTask = document.getElementById("new-task");

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

// Agora tanto a tecla enter quanto o botão de adicionar tarefas, chamam a função 'addTask'
newTask.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
        this.blur(); 
    }
});

// auxiliares para a função de adicionar tarefa.

let taskIdCounter = 0;
const warning = document.querySelector('.warning');
const spanNoTask = document.querySelector('.no-task');
const img = document.querySelector('.img-task')

const addButton = document.getElementById('add-btn');
addButton.addEventListener('click', function() {
    addTask();
});

// Função para adicionar uma tarefa (agora implementada diretamente no javascript).
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

    // Remove o span e a imagem; adiciona a classe 'has-task' ao bloco de tasks, que é tratada no css
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
    const newImgDiv = createImgButtons(taskId);

    newTaskDiv.appendChild(newCheckbox);
    newTaskDiv.appendChild(newImgDiv);

    return newTaskDiv;

}

let selected = 0;
const tasks = [];

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

    // Adiciona o ouvinte de eventos para riscar o texto ao marcar o checkbox
    newInput.addEventListener('change', function() {
        if (newInput.checked) {
            newLabel.style.textDecoration = 'line-through'; // Risca o texto
            selected++;
            tasks.push(taskValue); // adiciona a(s) tarefa(s) marcada(s) para o array 'tasks'.
            console.log(selected);
            console.log(tasks);
        } else {
            newLabel.style.textDecoration = 'none'; // Remove o riscado se desmarcado
        }
    });

    checkboxDiv.appendChild(newInput);
    checkboxDiv.appendChild(newLabel);

    return checkboxDiv;
}

// Função para criar a div dos ícones e os botões edit e remove

function createImgButtons(taskId) {

    const imgDiv = document.createElement('div');
    imgDiv.className = 'img-box';

    const btnEdit = createImgButton('../assets/img/edit-svg.svg', 'edit', 40, 35, `edit-btn-${taskId}`);
    const btnRemove = createImgButton('../assets/img/remove-svg.svg', 'remove', 40, 30, `remove-btn-${taskId}`);

    btnEdit.addEventListener('click', function(){
        editTask(taskId);
    });

    btnRemove.addEventListener('click', function(){
        removeTask(taskId);
    });

    imgDiv.appendChild(btnEdit);
    imgDiv.appendChild(btnRemove);

    return imgDiv;
}

// Função para criar as imagens(botões) individualmente, utilizando os parâmetros

function createImgButton(src, alt, width, height, id) {

    const button = document.createElement('button');
    button.id = id;
    button.className = 'img-btn';

    const img = document.createElement('img');

    img.src = src;
    img.alt = alt;
    img.width = width;
    img.height = height;

    button.appendChild(img);

    return button;
}

// Função para remover uma tarefa pelo seu ID.
function removeTask(id) {
    const removedTask = document.getElementById(`task-${id}`);
    if(removedTask) {
        removedTask.remove();

        // Após remover, verifica se o bloco de tasks está vazio
        checkIfTasksAreEmpty();
    }
}

// Função para editar uma tarefa pelo seu ID.
function editTask(id) {
    const editedTask = document.getElementById(`task-${id}`);

    if(editedTask) {
        const label = document.querySelector('.checkbox-label');

        // Novo input para editar a tarefa
        const input = document.createElement('input');
        input.type = 'text';
        input.value = label.textContent;
        input.className = 'edit-input';

        // Substitui a label pelo input
        label.parentNode.replaceChild(input, label);
        input.focus();

        // Função para salvar o texto da nova tarefa
        function saveEdit() {
            const newText = input.value.trim();
            if(newText != '') {
                label.textContent = newText;
            }
            input.parentNode.replaceChild(label, input);
        }

        // Salva ao apertar enter
        input.addEventListener('keypress', function(e) {
            if(e.key === 'Enter'){
                saveEdit();
            }
        });

        // Salva ao tirar o foco do input
        input.addEventListener('blur', saveEdit);
    }
}

// Função para verificar se o bloco de tasks está vazio
function checkIfTasksAreEmpty() {
    const taskBox = document.getElementById('tasks');

    // Verifica se o container está vazio para chamar a função que restaura a div.
    if(taskBox.children.length === 0) {
        restoreEmptyBlock();
    }
}

// Função para voltar o span e a imagem, caso não haja tasks
function restoreEmptyBlock() {
    const taskBox = document.getElementById('tasks');
    taskBox.appendChild(spanNoTask);
    taskBox.appendChild(img);

    // Remove a classe has-task para que as configurações css voltem ao padrão
    taskBox.classList.remove('has-task');

}


// ******** DOM CONTENT LOADED *********
});

