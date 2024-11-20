// Função para obter parâmetros da URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Função para preencher os campos do formulário
function fillForm(product) {
    document.getElementById("productId").value = product.id;
    document.getElementById("name").value = product.name;
    document.getElementById("shortDescription").value = product.shortDescription;
    document.getElementById("fullDescription").value = product.fullDescription;
    document.getElementById("brand").value = product.brand;
    document.getElementById("category").value = product.category;
    document.getElementById("listPrice").value = product.listPrice;
    document.getElementById("discountPercent").value = product.discountPercent;
    document.getElementById("enabled").checked = product.enabled;
    document.getElementById("inStock").checked = product.inStock;
    document.getElementById("length").value = product.dimensions.length;
    document.getElementById("width").value = product.dimensions.width;
    document.getElementById("height").value = product.dimensions.height;
    document.getElementById("weight").value = product.weight;
    document.getElementById("cost").value = product.cost;

    // Preencher imagens
    document.getElementById("currentMainImage").innerHTML = `Current Main Image: <em>${product.mainImage}</em>`;
    document.getElementById("currentFeaturedImages").innerHTML = `Current Featured Images: <em>${product.featuredImages.join(", ")}</em>`;

    // Preencher detalhes adicionais
    const productDetails = document.getElementById("productDetails");
    productDetails.innerHTML = ""; // Limpar qualquer conteúdo anterior
    product.details.forEach(detail => {
        const detailHTML = `
            <input type="text" value="${detail.name}" placeholder="Detail Name">
            <input type="text" value="${detail.value}" placeholder="Detail Value">
            <button type="button">Remove</button>
            <br>
        `;
        productDetails.innerHTML += detailHTML;
    });
}

// Carregar produto com base no ID
const productId = parseInt(getQueryParam("id"), 10);
const product = products.find(p => p.id === productId);

if (product) {
    fillForm(product);
} else {
    alert("Product not found!");
}
