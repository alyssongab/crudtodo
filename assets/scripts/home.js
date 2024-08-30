const newTask = document.getElementById("new-task");
const warning = document.querySelector('.warning');

const spanNoTask = document.querySelector('.no-task');
const img = document.querySelector('.img-task');

let taskIdCounter = 0;

// ************************************************** //

function logout() {
    window.alert("You have been logged out");
    window.location.href = "login.html";
}

document.getElementById("new-task").addEventListener('focus', function() {
    if(this.value === 'Create new task...') {
        this.value = '';
    }
});

document.getElementById("new-task").addEventListener('blur', function() {
    if(this.value === '') {
        this.value = 'Create new task...';
    }
});

function addTask() {
    if(newTask.value === '' || newTask.value === 'Create new task...') {
        warning.style.visibility = 'visible';
    } else {
        // incrementa o contador de tarefas (para a geração do id)
        taskIdCounter++;
    
        // cria uma nova div
        const newTaskDiv = document.createElement('div');

        // 2 sub-divs: uma para checkbox e label e outra para as imagens;
        const checkboxDiv = document.createElement('div');
        newTaskDiv.appendChild(checkboxDiv);
        checkboxDiv.className = 'checkbox-div'

        const imgDiv = document.createElement('div');
        imgDiv.className = 'img-box';
        newTaskDiv.appendChild(imgDiv);

        // Gerar um id para a div criada
        newTaskDiv.id = `task-${taskIdCounter}`;

        // Gera uma classe geral para cada div criada
        newTaskDiv.classList.add('task-item');

        // Novo input e label
        const newInput = document.createElement('input');
        newInput.type = 'checkbox';
        newInput.className = 'checkbox-task';
        checkboxDiv.appendChild(newInput);
        
        const newLabel = document.createElement('label');
        newLabel.htmlFor = `task-${taskIdCounter}`;
        newLabel.className = 'checkbox-label';
        newLabel.innerHTML = newTask.value;
        checkboxDiv.appendChild(newLabel);


        // anexa a div ao container tasks
        document.getElementById('tasks').appendChild(newTaskDiv);

        // log para o backend
        console.log('Tarefa criada. ID: ', newTaskDiv.id);

        // Limpando o campo de input
        newTask.value = 'Create new task...';

        // Chama a função para limpar a div 'no-task'
        styleNewTask();

        // Imagens que serão um botão, para editar e remover tarefas
        const imgEdit = document.createElement('img');
        imgEdit.setAttribute('src', '../assets/img/edit-svg.svg');
        imgEdit.setAttribute('alt', 'edit');
        imgEdit.setAttribute('width', '40px');
        imgEdit.setAttribute('height', '35px');
        imgDiv.appendChild(imgEdit);

        const imgRemove = document.createElement('img');
        imgRemove.setAttribute('src', '../assets/img/remove-svg.svg');
        imgRemove.setAttribute('alt', 'remove');
        imgRemove.setAttribute('width', '40px');
        imgRemove.setAttribute('height', '30px');
        imgDiv.appendChild(imgRemove);

        createButton(imgEdit, imgRemove);

    }
}


function styleNewTask() {

    warning.style.visibility = 'hidden';
    spanNoTask.remove();
    img.remove();
    document.getElementById('tasks').classList.add('tasks-class');
        
}

function createButton(imgEdit, imgRemove) {
    const btn = document.createElement('button').className = 'bttn';

    btn.appendChild(imgEdit);
    btn.appendChild(imgRemove);

}