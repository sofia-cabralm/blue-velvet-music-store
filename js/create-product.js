document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createProductForm');
    const addDetailBtn = document.getElementById('addDetailBtn');
    const productDetailsContainer = document.getElementById('productDetails');
    
    let details = [];

    // Adicionar detalhes do produto
    addDetailBtn.addEventListener('click', () => {
        const detailName = productDetailsContainer.querySelector('input[placeholder="Detail Name"]').value;
        const detailValue = productDetailsContainer.querySelector('input[placeholder="Detail Value"]').value;

        if (detailName && detailValue) {
            details.push({ name: detailName, value: detailValue });
            productDetailsContainer.querySelector('input[placeholder="Detail Name"]').value = '';
            productDetailsContainer.querySelector('input[placeholder="Detail Value"]').value = '';
        } else {
            alert('Please fill in both detail name and value.');
        }
    });

    // Função para enviar o formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Coleta os dados do formulário
        const name = document.getElementById('name').value;
        const shortDescription = document.getElementById('shortDescription').value;
        const fullDescription = document.getElementById('fullDescription').value;
        const brand = document.getElementById('brand').value;
        const category = document.getElementById('category').value;
        const listPrice = parseFloat(document.getElementById('listPrice').value);
        const discountPercent = parseFloat(document.getElementById('discountPercent').value);
        const enabled = document.getElementById('enabled').checked;
        const inStock = document.getElementById('inStock').checked;
        const length = parseFloat(document.getElementById('length').value);
        const width = parseFloat(document.getElementById('width').value);
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const cost = parseFloat(document.getElementById('cost').value);

        const mainImage = document.getElementById('mainImage').files[0];
        const featuredImages = document.getElementById('featuredImages').files;

        // Verifica se o usuário selecionou uma imagem principal e se é um arquivo PNG
        if (!mainImage) {
            alert('Please select a main image for the product.');
            return;
        }

        if (mainImage.type !== 'image/png') {
            alert('The main image must be a PNG file.');
            return;
        }

        const mainImageUrl = URL.createObjectURL(mainImage);
        const featuredImageUrls = Array.from(featuredImages).map(file => {
            if (file.type !== 'image/png') {
                alert('All featured images must be PNG files.');
                return;
            }
            return URL.createObjectURL(file);
        }).filter(url => url !== undefined); // Filtra imagens inválidas

        // Cria o novo produto
        const newProduct = {
            id: (Date.now()).toString(), // ID único baseado no timestamp
            name,
            shortDescription,
            fullDescription,
            brand,
            category,
            mainImage: mainImageUrl,
            featuredImages: featuredImageUrls,
            listPrice,
            discountPercent,
            enabled,
            inStock,
            dimensions: { length, width, height },
            weight,
            cost,
            details
        };

        // Obtém os produtos armazenados ou cria um array vazio
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(newProduct);

        // Armazena os produtos no localStorage
        localStorage.setItem('products', JSON.stringify(products));

        alert('Product added successfully!');
        window.location.href = 'dashboard.html'; // Redireciona para o dashboard após adicionar o produto
    });
});
