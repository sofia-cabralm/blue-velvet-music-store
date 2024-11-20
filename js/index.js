document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm'); // Formulário de login
    const loginStatus = document.getElementById('loginStatus'); // Div para mensagens de erro

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Previne o recarregamento da página

        // Obtém os valores do formulário
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Recupera usuários cadastrados no LocalStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Verifica se o email e a senha são válidos
        const authenticatedUser = users.find(
            (user) => user.email === email && user.password === password
        );

        if (authenticatedUser) {
            // Armazena o usuário autenticado no LocalStorage
            localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));

            // Redireciona para o dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Exibe mensagem de erro
            loginStatus.style.display = 'block';
        }
    });
});
