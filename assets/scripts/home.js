const newTask = document.getElementById("new-task");
const warning = document.querySelector('.warning');

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
        // logica do botao (criacao da div, gerar novo id, e anexar a div pai)
    }
}