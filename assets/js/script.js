/**
 *  OBJETO DE PRODUTOS PARA CONSULTA E MANIPULAÇÃO
 */

const products = [
  {
    code: 1,
    name: 'Camiseta',
    price: 29.99,
  },
  {
    code: 2,
    name: 'Caneca',
    price: 9.99,
  },
  {
    code: 3,
    name: 'Mouse Pad',
    price: 4.99,
  },
  {
    code: 4,
    name: 'Mochila',
    price: 99.99,
  },
];

/**
 *  ÁREA DA BUSCA  USANDO O CAMPO VAZIO EXIBE TODO OBJETO PARA PODER TESTAR
 */

document.getElementById('search-button').addEventListener('click', function () {
  const searchInput = document
    .getElementById('product-name')
    .value.trim()
    .toLowerCase();
  const resultContainer = document.getElementById('search-result-container');
  resultContainer.innerHTML = '';

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchInput)
  );

  if (filteredProducts.length > 0) {
    filteredProducts.forEach((product) => {
      const productElement = document.createElement('div');
      productElement.className = 'search-result-product';
      productElement.innerHTML = `
        <div class="product-details">
          <div class="search-result-icon"><i class="fa-solid fa-tag"></i></div>
          <div class="product-code"><small>Código:</small> ${product.code}</div>
          <div class="product-name">${product.name}</div>
        </div>
        <div class="product-price">
          <div class="value-sign"><small>R$</small></div>
          <div class="price">${product.price.toFixed(2)}</div>
        </div>
        <div class="product-buy">
          <a href="#" class="btn-buy" title="Adicionar ao carrinho" data-code="${
            product.code
          }">
            <i class="fa-solid fa-cart-plus"></i>
          </a>
        </div>
      `;
      resultContainer.appendChild(productElement);
    });

    /**
     *  ADICIONA O EVENTO DE CLIQUE PARA O BOTÃO DO CARRINHO COM A FUNCAO DE ADICIONAR AO CARRINHO
     */
    document.querySelectorAll('.btn-buy').forEach((button) => {
      button.addEventListener('click', function (event) {
        const productCode = parseInt(this.getAttribute('data-code'), 10);
        const product = products.find((p) => p.code === productCode);

        if (product) {
          addToCart(product);
        }
        event.preventDefault();
      });
    });
  } else {
    resultContainer.innerHTML =
      '<div class="no-result"> <i class="fa-solid fa-circle-exclamation icon-error"></i> Produto não encontrado ou não cadastrado</div>';
  }
});

/**
 *  VÊ SE EXISTE O OBJETO NA LOCAL STORAGE E RETORNA O CARRINHO
 */
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}
/**
 *  ADCIONA AO CARRINHO E SALVA
 */
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 *  CONTA OS ELEMENTOS, SOMA OS VALORES E ATUALIZA A UI
 */
function updateCartUI() {
  const cart = getCart();
  const total = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const itemCount = cart.reduce((acc, product) => acc + product.quantity, 0);

  document.getElementById('itens-cart').textContent = itemCount
    ? `${itemCount} itens`
    : 'vazio';
  document.getElementById('itens').textContent = itemCount
    ? `${itemCount} itens`
    : '0 itens';
  document.getElementById('total').textContent = total.toFixed(2);
}

/**
 *  SE O PRODUTO EXISTE AO ADICIONAR, INCREMENTA A QUANTIDADE PARA QUE DEPOIS FAÇA A SOMA
 * TBM ATUALIZA A UI
 */

function addToCart(product) {
  const cart = getCart();
  const existingProduct = cart.find((p) => p.code === product.code);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  updateCartUI();
}

document.addEventListener('DOMContentLoaded', updateCartUI);
