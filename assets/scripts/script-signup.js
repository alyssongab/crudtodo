function cadastrar(e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    const cadastroBloco = document.querySelector('.editable');
    const success = document.getElementById('success');
    cadastroBloco.style.display = 'none';
    success.style.display = 'block';
}

// Adiciona um ouvinte de eventos ao formulário para chamar a função cadastrar
document.querySelector("form").addEventListener("submit", cadastrar);
