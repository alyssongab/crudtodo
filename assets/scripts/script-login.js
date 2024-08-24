
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
        spanIncorrect.style.visibility = 'visible';

        // Mantém a mensagem do email e apaga o input da senha
        emailInput.value = email;
        passwordInput.value = '';

    } else {
        window.location.href = "home.html";
    }

});