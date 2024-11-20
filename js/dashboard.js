document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('authenticatedUser'));

    if (!user || !['admin', 'salesperson', 'shipper'].includes(user.role)) {
        alert('Access denied. Please log in with an authorized account.');
        window.location.href = 'index.html'; // Redireciona para a página de login
        return;
    }

    const welcomeMessage = document.querySelector('#welcomeMessage');
    welcomeMessage.innerHTML = `
        Welcome, ${user.name} (${capitalize(user.role)})
        <button id="logoutBtn">Logout</button>
    `;

    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('authenticatedUser');
        alert('Logged out successfully.');
        window.location.href = 'index.html';
    });

    let products = JSON.parse(localStorage.getItem('products')) || [];
    const productTableBody = document.getElementById('productList');
    const pagination = document.getElementById('pagination');

    // Função para exibir os produtos
    function displayProducts(products, page = 1, perPage = 5) {
        productTableBody.innerHTML = ''; // Limpa a tabela
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const productsToDisplay = products.slice(start, end);

        productsToDisplay.forEach(product => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', product.id); // Adiciona um atributo para o ID do produto

            // Verificar se o caminho da imagem está correto
            let imageSrc = product.image ? product.image : 'images/default-image.png'; // Usar uma imagem padrão se não tiver imagem
            if (!imageSrc.startsWith('images/')) {
                imageSrc = 'images/' + imageSrc; // Corrige se o caminho não estiver correto
            }

            row.innerHTML = `
                <td>${product.id}</td>
                <td><img src="${imageSrc}" alt="${product.name}" style="width: 100px; height: 100px;"></td>
                <td>${product.name}</td>
                <td>${product.brand}</td>
                <td>${product.category}</td>
                <td>
                    <button class="view-details-btn">View Details</button>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            productTableBody.appendChild(row);
        });

        // Controle de paginação
        if (products.length > perPage) {
            pagination.style.display = 'block';
            const totalPages = Math.ceil(products.length / perPage);
            const pageButtons = Array.from(pagination.querySelectorAll('button'));

            pageButtons.forEach((button, index) => {
                if (index < totalPages) {
                    button.style.display = 'inline-block';
                    button.textContent = index + 1;
                    button.onclick = () => displayProducts(products, index + 1);
                } else {
                    button.style.display = 'none';
                }
            });
        } else {
            pagination.style.display = 'none';
        }
    }

    // Exibe os produtos na tabela
    displayProducts(products);

    // Função para deletar produto
    productTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const row = event.target.closest('tr');
            const productId = row.getAttribute('data-id');

            const confirmation = confirm("Are you sure you want to delete this product?");
            if (confirmation) {
                // Filtra o produto a ser removido
                products = products.filter(product => product.id !== productId);
                localStorage.setItem('products', JSON.stringify(products));
                displayProducts(products);
            }
        }

        // Redireciona para a página de detalhes do produto
        productTableBody.addEventListener('click', (event) => {
            if (event.target.classList.contains('view-details-btn')) {
                const productId = event.target.closest('tr').getAttribute('data-id');
                
                // Salva o ID do produto selecionado no localStorage
                localStorage.setItem('selectedProductId', productId);
                
                // Redireciona para a página de detalhes do produto
                window.location.href = 'view-product.html';
            }
        });

        // Redireciona para a página de edição do produto
        if (event.target.classList.contains('edit-btn')) {
            const row = event.target.closest('tr');
            const productId = row.getAttribute('data-id');
            localStorage.setItem('currentProductId', productId); // Armazena o ID do produto no localStorage
            window.location.href = 'edit-product.html'; // Redireciona para a página de edição
        }
    });

    // Função para adicionar um novo produto
    document.getElementById('addProductBtn').addEventListener('click', () => {
        window.location.href = 'create-product.html'; // Redireciona para a página de criação do produto
    });

    // Resetar produtos ao estado inicial
    document.getElementById('resetProductsBtn').addEventListener('click', () => {
        const initialProducts = [
            {
                id: '1',
                name: 'Guided by Voices - Bee Thousand',
                brand: 'Matador Records',
                category: 'CD',
                image: 'images/gbv-bee-thousand-cover.jpeg'
            },
            {
                id: '2',
                name: 'Pavement - Slanted and Enchanted',
                brand: 'Domino Recording Co',
                category: 'MP3',
                image: 'images/pavment-slanted-and-enchanted-cover.jpeg'
            },
            {
                id: '3',
                name: 'Neutral Milk Hotel T-Shirt',
                brand: 'Merge Records',
                category: 'T-Shirt',
                image: 'images/neutral-milk-hotel-in-the-aeroplane-over-the-sea-tshirt.jpeg'
            },
            {
                id: '4',
                name: 'Miles Davis',
                brand: 'Abril Cultural',
                category: 'Music - Disco',
                image: 'images/disco-jazz.jpg'
            },
            {
                id: '5',
                name: 'Legião Urbana',
                brand: 'Abril Cultural',
                category: 'Music - Disco',
                image: 'images/disco-legiao.jpg'
            },
            {
                id: '6',
                name: 'Guitar keychain',
                brand: 'no',
                category: 'Keychain',
                image: 'images/guitarra-chaveiro.jpg'
            },
            {
                id: '7',
                name: 'Metallica mug',
                brand: 'no',
                category: 'Mug',
                image: 'images/metalica-caneca.jpg'
            },
            {
                id: '8',
                name: 'Music keyboard',
                brand: 'Yamaha',
                category: 'Musical Instrument',
                image: 'images/teclado.jpg'
            },
            {
                id: '9',
                name: 'Turntable',
                brand: 'no',
                category: 'Eletro - Disco',
                image: 'iimages/toca-discos.jpg'
            }
        ];

        localStorage.setItem('products', JSON.stringify(initialProducts));
        displayProducts(initialProducts);
    });

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});
