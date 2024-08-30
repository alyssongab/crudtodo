// const newTask = document.getElementById("new-task");

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
