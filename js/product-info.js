const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (productId) {
  const productDetailsUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
  const productCommentsUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;
  function cargarComentarios(product) {
    fetch(productCommentsUrl)
      .then(response => response.json())
      .then(comments => {
        const commentsContainer = document.getElementById('comments-container');
        comments.forEach(comment => {
          const commentDiv = document.createElement('div');
          commentDiv.classList.add('comment');
          const scoreElement = document.createElement('div');
          scoreElement.textContent = `Puntuación: ${comment.score} estrellas`;

          const userElement = document.createElement('div');
          userElement.textContent = `Usuario: ${comment.user}`;

          const dateElement = document.createElement('div');
          dateElement.textContent = `Fecha: ${comment.dateTime}`;

         
          commentDiv.appendChild(scoreElement);
          commentDiv.appendChild(userElement);
          commentDiv.appendChild(dateElement);
          commentDiv.appendChild(document.createElement('hr')); 

          commentsContainer.appendChild(commentDiv);
        });
      })
      .catch(error => {
        console.error('Error al obtener comentarios:', error);
      });
  }

  fetch(productDetailsUrl)
    .then(response => response.json())
    .then(product => {
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
      product.images.forEach(imageUrl => {
        const image = document.createElement('img');
        image.src = imageUrl;
        imagesContainer.appendChild(image);
      });
      product.relatedProducts.forEach(relatedProduct => {
        const relatedProductElement = document.createElement('div');
        relatedProductElement.innerHTML = `
          <h3>${relatedProduct.name}</h3>
          <img src="${relatedProduct.image}" alt="${relatedProduct.name}">
        `;
        relatedProductsContainer.appendChild(relatedProductElement);
      });
      cargarComentarios(product);
    })
    .catch(error => {
      console.error('Error al obtener detalles del producto:', error);
    });
} else {
  console.error('ID de producto no válido.');
}








//comentarios
const commentForm = document.getElementById('comment-form');
commentForm.addEventListener('submit', function (e) {
  e.preventDefault(); 
  const commentText = document.getElementById('comment').value;
  const rating = document.getElementById('rating').value;

  
  if (rating < 1 || rating > 5) {
    alert('La puntuación debe estar entre 1 y 5.');
    return;
  }

  
  const currentUser = localStorage.getItem('currentUser');

  const currentDateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

  const commentsContainer = document.getElementById('comments-container');
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');
  const scoreElement = document.createElement('div');
  scoreElement.textContent = `Puntuación: ${rating} estrellas`;
  const userElement = document.createElement('div');
  userElement.textContent = `Usuario: ${currentUser}`;
  const dateElement = document.createElement('div');
  dateElement.textContent = `Fecha: ${currentDateTime}`;
  const commentTextElement = document.createElement('div');
  commentTextElement.textContent = `Comentario: ${commentText}`;
  commentDiv.appendChild(scoreElement);
  commentDiv.appendChild(userElement);
  commentDiv.appendChild(dateElement);
  commentDiv.appendChild(commentTextElement);
  commentDiv.appendChild(document.createElement('hr'));
  commentsContainer.appendChild(commentDiv);
  document.getElementById('comment').value = '';
  document.getElementById('rating').value = '';

  alert('Comentario agregado con éxito. (Este mensaje es solo para demostración, no se envía al servidor)');
});
