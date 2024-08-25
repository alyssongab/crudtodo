
document.querySelector("form").addEventListener("submit", (e) => {
   
    // Impede que o formulário seja enviado
    e.preventDefault();
   
    // Input do formulario
    const emailInput = document.querySelector("#email-input");
    const passwordInput = document.querySelector("#password-input");

    // Valor dos inputs do formulario
    const email = emailInput.value;
    const password = passwordInput.value;

    // Span de credenciais inválidas
    const spanIncorrect = document.querySelector("#incorrect");

    if (email != "cleitinhodasilva@gmail.com" || password != "sergios2024") {
        
        // Altera a visibilidade do span
        // spanIncorrect.style.visibility = 'visible';
        spanIncorrect.classList.add('visible');

        // Mantém a mensagem do email e apaga o input da senha
        emailInput.value = email;
        passwordInput.value = '';

    } else {
        window.location.href = "home.html"; // Redireciona para a página home.
    }

});


// ***********************************************************************
//  Script para ser implementado junto com a vericação no backend 

// document.addEventListener("DOMContentLoaded", () => {
//     const form = document.getElementById("login-form");
//     const emailInput = document.getElementById("email-input");
//     const passwordInput = document.getElementById("password-input");
//     const emailError = document.getElementById("email-error");
//     const passwordError = document.getElementById("password-error");

//     form.addEventListener("submit", (e) => {
//         let valid = true;

//         // Resetar mensagens de span do email e senha
//         emailError.textContent = '';
//         passwordError.textContent = '';

//         // Validar email
//         if(!emailInput.value) {
//             emailError.textContent = 'Email is required!';
//             valid = false;
//         } 
//         else if(!validarEmail(emailInput.value)) {
//             emailError.textContent = 'Invalid email format.';
//             valid = false;
//         }

//         // Validar senha
//         if(!passwordInput.value) {
//             passwordError.textContent = 'Password is required';
//             valid = false;
//         }
        
//         if(!valid) {
//             e.preventDefault();
//         }

//     });

//     function validarEmail(email) {

//         // Regex de email simples
//         const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return re.test(email);
//     }

// });