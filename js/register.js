document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    // Função para salvar o usuário no LocalStorage
    function saveUser(user) {
        // Recupera a lista de usuários existente ou inicializa como vazio
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Verifica se o email já foi registrado
        const emailExists = users.some(existingUser => existingUser.email === user.email);
        if (emailExists) {
            alert('This email is already registered. Please use a different email.');
            return false;
        }

        // Adiciona o novo usuário à lista e salva no LocalStorage
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    // Evento de submissão do formulário
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Previne o recarregamento da página

        // Obtém os valores dos campos do formulário
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const role = document.getElementById('role').value;

        // Valida se todos os campos foram preenchidos
        if (!name || !email || !password || !role) {
            alert('All fields are required. Please fill in all the fields.');
            return;
        }

        // Cria o objeto do usuário
        const newUser = { name, email, password, role };

        // Tenta salvar o usuário
        if (saveUser(newUser)) {
            alert('Registration successful! You can now log in.');
            window.location.href = 'index.html'; // Redireciona para a página de login
        }
    });
});
