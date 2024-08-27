function cadastrar(e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    const cadastroBloco = document.querySelector('.editable');
    const success = document.getElementById('success');
    
    cadastroBloco.style.display = 'none';
    success.style.display = 'block'; // Torna o bloco visível para aplicar a animação
    setTimeout(() => {
        success.classList.add('show'); // Adiciona a classe que ativa a animação
    }, 10); // Um pequeno atraso para garantir que a mudança de display tenha efeito
}

// Adiciona um ouvinte de eventos ao formulário para chamar a função cadastrar
document.querySelector("form").addEventListener("submit", cadastrar);

