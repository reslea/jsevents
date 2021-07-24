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
    addToBasket(product);
  });

  productsDiv.appendChild(article);
}

function createProductArticle(product) {
  const article = document.createElement('article');
  article.classList.add('product');
  
  article.setAttribute('data-product-id', product.id);

  article.innerHTML = `    
    <h4>${product.name}</h4>
    <span>${product.price}</span>
    <div>
      <button>Buy</button>
    </div>
  `;

  return article;
}

let basket = [];
function addToBasket(product) {
  const productFromBasket = basket.find(p => p.id === product.id);

  if(!productFromBasket) {
    product.count = 1;
    basket.push(product);
    
    const article = createBasketArticle(product);
    subscribeToBasketCountEvent(product, article);
    subscribeToBasketRemove(product, article);
    
  } else {
    refreshCountAndTotal(productFromBasket);
  }

  updateTotalPrice(basket);
}

const basketDiv = document.querySelector('#basket');

function createBasketArticle(product) {
  const article = document.createElement('article');
  article.classList.add('basket-item');  
  article.setAttribute('data-basket-id', product.id);

  const totalPrice = product.price * product.count;

  article.innerHTML = `
    <h3>${product.name}</h3>
    <span class="product-price">price: <b>${product.price}</b></span>
    <label>
      count:
      <input type="number" value="${product.count}" />
    </label>
    <span class="product-total-price">total: <em><b>${totalPrice}</b></em></span>
    <button>❌</button>
  `;

  basketDiv.appendChild(article);

  return article;
}

function refreshCountAndTotal(product) {
  const productArticle = document.querySelector(`[data-basket-id='${product.id}']`);

  updateCount(product, productArticle);

  updateProductPrices(product, productArticle);
}

function updateCount(product, basketArticle) {
  const count = ++product.count;
  const countInput = basketArticle.querySelector('input');
  countInput.value = count;
}

function updateProductPrices(product, basketArticle) {
  const price = basketArticle.querySelector('.product-price b');
  const totalSpan = basketArticle.querySelector('.product-total-price b');
  
  price.textContent = product.price;
  totalSpan.textContent = product.price * product.count;
}

function subscribeToBasketCountEvent(product, basketArticle) {
  const countInput = basketArticle.querySelector('input');

  countInput.addEventListener('input', function() {
    product.count = countInput.value;
    
    updateProductPrices(product, basketArticle);
    updateTotalPrice(basket);
  });
}

const totalPriceEl = document.querySelector('#total-price b');
function updateTotalPrice(basket) {
  let sum = 0;
  for(let product of basket) {
      sum += product.price * product.count;
  }

  totalPriceEl.textContent = sum;
}

function subscribeToBasketRemove(product, basketArticle) {
  const removeButton = basketArticle.querySelector('button');

  removeButton.addEventListener('click', function() {
    const shouldOfferDiscount = confirm(`Are you sure you want to remove ${product.name}`);
    
    if(!shouldOfferDiscount) return;

    product.price = product.price * 0.95;
    const totalWithDiscount = product.price * product.count;
    const shouldRemove = confirm(`We can offer you a 5% discount:
    ${product.price} * ${product.count} = ${totalWithDiscount}`);

    if(shouldRemove) {
      basket = basket.filter(p => p.id !== product.id);
      basketArticle.remove();

      updateTotalPrice(basket);
    }

    updateProductPrices(product, basketArticle);
    updateTotalPrice(basket);
  });
}