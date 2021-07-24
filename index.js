const products = [{
  id: 1,
  name: 'Notebook',
  price: 100
},{
  id: 2,
  name: 'TV',
  price: 200
},{
  id: 3,
  name: 'Apple',
  price: 0.50
},{
  id: 4,
  name: 'Chair',
  price: 20
}];

const productsDiv = document.querySelector('#products');

for(let product of products) {
  const article = createProductArticle(product);

  const buyButton = article.querySelector('button');

  buyButton.addEventListener('click', function() {
    console.log(`added to basket: ${product.name}`);
  });

  productsDiv.appendChild(article);
}

function createProductArticle(product) {
  const article = document.createElement('article');
  article.classList.add('product');

  article.innerHTML = `    
    <h4>${product.name}</h4>
    <span>${product.price}</span>
    <div>
      <button>Buy</button>
    </div>
  `;

  return article;
}