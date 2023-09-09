const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Verificar si productId es válido antes de hacer la solicitud
if (productId) {
  const productDetailsUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;

  fetch(productDetailsUrl)
    .then(response => response.json())
    .then(product => {
      // Actualizar los elementos HTML con los datos del producto
      const titleElement = document.getElementById('product-title');
      const imageElement = document.getElementById('product-image');
      const descriptionElement = document.getElementById('product-description');
      const costElement = document.getElementById('product-cost');
      const currencyElement = document.getElementById('product-currency');
      const soldCountElement = document.getElementById('product-soldCount');
      const categoryElement = document.getElementById('product-category');
      const imagesContainer = document.getElementById('product-images');
      const relatedProductsContainer = document.getElementById('related-products');

      titleElement.textContent = product.name;
      imageElement.src = product.images[0];
      descriptionElement.textContent = product.description;
      costElement.textContent = `Precio: ${product.cost} ${product.currency}`;
      soldCountElement.textContent = `Vendidos: ${product.soldCount}`;
      categoryElement.textContent = `Categoría: ${product.category}`;

      // Agregar imágenes del producto
      product.images.forEach(imageUrl => {
        const image = document.createElement('img');
        image.src = imageUrl;
        imagesContainer.appendChild(image);
      });

      // Agregar productos relacionados
      product.relatedProducts.forEach(relatedProduct => {
        const relatedProductElement = document.createElement('div');
        relatedProductElement.innerHTML = `
          <h3>${relatedProduct.name}</h3>
          <img src="${relatedProduct.image}" alt="${relatedProduct.name}">
        `;
        relatedProductsContainer.appendChild(relatedProductElement);
      });
    })
    .catch(error => {
      console.error('Error al obtener detalles del producto:', error);
    });
} else {
  console.error('Identificador de producto no válido.');
}
