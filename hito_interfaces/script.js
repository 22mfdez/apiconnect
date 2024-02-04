document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('productList');
    const cartContainer = document.getElementById('cartContainer');
    const cartList = document.getElementById('cartList');
    const searchInput = document.getElementById('searchInput'); // Agregamos el campo de búsqueda
    const commentUsernameInput = document.getElementById('commentUsername');

    // Definir cartItems como un objeto
    const cartItems = {};
    let allProducts = []; // Variable para almacenar todos los productos

    fetch('https://fakestoreapi.com/products?limit=16')
        .then(response => response.json())
        .then(products => {
            allProducts = products; // Almacenar todos los productos
            displayProducts(products); // Llamar a la función para mostrar productos
        })
        .catch(error => console.error('Error fetching data:', error));

    function displayProducts(products) {
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('col-md-3', 'p-2', 'product-item', 'text-center');

            productItem.innerHTML = `
                <div class="product-container">
                    <div class="collection-img">
                        <img src="${product.image}" class="w-50 product-image img-custom mx-auto" alt="${product.title}">
                    </div>
                    <div class="text-center mt-3">
                        <p class="text-capitalize my-1"><strong>${product.title}</strong></p>
                        <span class="fw-bold">${product.price}€</span><br>
                        <button class="btn btn-primary mt-2 btn-sm add-to-cart-btn" data-product-id="${product.id}">Añadir al carrito</button>
                    </div>
                </div>
            `;

            productList.appendChild(productItem);

            const addToCartBtn = productItem.querySelector('.add-to-cart-btn');
            addToCartBtn.addEventListener('click', function () {
                const productId = addToCartBtn.getAttribute('data-product-id');
                addToCart(productId);
            });
        });
    }

    function addToCart(productId) {
        if (cartItems[productId]) {
            cartItems[productId]++;
        } else {
            cartItems[productId] = 1;
        }

        renderCart();
    }

    function renderCart() {
        cartList.innerHTML = '';

        for (const [productId, quantity] of Object.entries(cartItems)) {
            const product = document.createElement('li');
            product.classList.add('list-group-item');
            product.innerHTML = `ID de producto: ${productId}, Cantidad: ${quantity}`;
            cartList.appendChild(product);
        }
    }

    // Agregamos la lógica de búsqueda
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = allProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
        );

        // Limpiamos la lista de productos y mostramos los resultados filtrados
        productList.innerHTML = '';
        displayProducts(filteredProducts);
    });
});




