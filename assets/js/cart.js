// Carrito v1
// #1 BASE DE DATOS
const products = [

  {
    id: 1,
    name: 'procesador i9',
    price: 300,
    image: 'assets/img/i9.png',
    category: 'procesadores',
    quantity: 5
  },

  {
    id: 2,
    name: 'procesador i7',
    price: 250,
    image: 'assets/img/i7.png',
    category: 'procesadores',
    quantity: 10
  },

  {
    id: 3,
    name: 'placa base',
    price: 375,
    image: 'assets/img/placa-base.png',
    category: 'placa-madre',
    quantity: 4
  },
  {
    id: 4,
    name: 'tarjeta grafica 1',
    price: 500,
    image: 'assets/img/rtx1.png',
    category: 'tarjetas-graficas',
    quantity: 7
  },
  {
    id: 5,
    name: 'tarjeta grafica 2',
    price: 479,
    image: 'assets/img/rtx2.png',
    category: 'tarjetas-graficas',
    quantity: 3
  }
]

//#2 pintar los productos en el DOM
const productContainer = document.getElementById('products__content')
function printProducts() {
  let html = ''

  for (let product of products) {
    html += ` <article class="products__card hoodies">
<div class="products__shape">
  <img src="${product.image}"  alt="${product.name}" class="products__img">
</div >

    <div class="products__data">
      <h2 class="products__name">${product.name
      } </h2>
      <div class="">
        <h3 class="products__price">$${product.price
      } </h3>
        <span class="products__quantity">Productos restantes: ${product.quantity
      } </span>
      </div>
      <button type="button" class="button products__button addToCart" data-id="${product.id
      } ">
        <i class="bx bx-plus"></i>
      </button>
    </div>
</article > `

  }
  productContainer.innerHTML = html
}

printProducts()

//#3 Carrito
let cart = []
const cartContainer = document.getElementById('cart__container')

const cartCount = document.getElementById('cart-count')
const itemsCount = document.getElementById('items-count')
const cartTotal = document.getElementById('cart-total')

function printCart() {
  let html = ''
  for (let article of cart) {
    const product = products.find(p => p.id === article.id)
    html += `
    <article class="cart__card">
   <div class="cart__box">
     <img src="${product.image}" alt="${product.name}" class="cart__img">
   </div>

   <div class="cart__details">
     <h3 class="cart__title">${product.name}<span class="cart__price"$${product.price}</span></h3>

     <div class="cart__amount">
       <div class="cart__amount-content">
         <span class="cart__amount-box removeToCart" data-id="${product.id}">
           <i class="bx bx-minus"></i>
         </span>

         <span class="cart__amount-number">${article.qty}</span>

         <span class="cart__amount-box addToCart" data-id="${product.id}">
           <i class="bx bx-plus"></i>
         </span>
       </div>

       <i class="bx bx-trash-alt cart__amount-trash deleteToCart" data-id="${product.id}"></i>
     </div>

     <span class="cart__subtotal">
       <span class="cart__stock">Quedan ${product.quantity - article.qty} unidades</span>
       <span class="cart__subtotal-price">$${product.price * article.qty}</span>
     </span>
   </div>
 </article>`
  }
  cartContainer.innerHTML = html
  cartCount.innerHTML = totalArticles()
  itemsCount.innerHTML = totalArticles()
  cartTotal.innerHTML = totalAmount()

  if (cart.length > 0) {
    document.getElementById('cart-checkout').removeAttribute('disabled', 'disabled')
    document.getElementById('cart-empty').removeAttribute('disabled', 'disabled')
  } else {
    document.getElementById('cart-checkout').setAttribute('disabled', 'disabled')
    document.getElementById('cart-empty').setAttribute('disabled', 'disabled')

  }
}


//#4 agregar al carrito 

function addTocart(id, qty = 1) {

  const product = products.find(p => p.id === id)
  const article = cart.find(a => a.id === id)

  if (product && product.quantity > 0) {
    if (article) {

      if (checkStock(id, qty + article.qty)) {

        article.qty++
      } else {
        window.alert('no hay mas en stock')
      }


    } else {
      cart.push({ id, qty })
    }

  } else {
    window.alert('producto agotado')
  }
  printCart()

}
function checkStock(id, qty) {
  const product = products.find(p => p.id === id)
  return product.quantity - qty >= 0
}

//#5 remover articulos
function removeFrontCard(id, qty = 1) {
  const article = cart.find(a => a.id === id)
  if (article && article.qty - qty > 0) {
    article.qty--
  } else {
    const confirm = window.confirm('Estas Segur@??')

    if (confirm) {
      cart = cart.filter(a => a.id !== id)
    }

  }
  printCart()
}

// #6 Eliminar del carrito
function deleteFormCart(id) {
  const article = cart.find(a => a.id == id)
  cart.splice(cart.indexOf(article), 1)
  printCart()
}

//#7 contar articulos
function totalArticles() {
  let acc = 0
  for (let article of cart) {
    acc += article.qty
  }
  return acc
}

//#8 El total
function totalAmount() {
  return cart.reduce((acc, article) => {
    const product = products.find(p => p.id === article.id)
    return acc + product.price * article.qty
  }, 0)
}

//#9 Limpiar el carrito

function clearCart() {
  // cart = []
  cart.length = 0
  printCart()


}

//# Comprar 

function checkout() {
  cart.forEach(article => {
    const product = products.find(p => p.id === article.id)
    product.quantity -= article.qty
  })
  clearCart()
  printProducts()
  window.alert('Gracias por su compra')
  printCart()

}




productContainer.addEventListener('click', function (e) {

  const add = e.target.closest('.addToCart')
  if (add) {
    const id = +add.dataset.id
    addTocart(id)
  }
})

cartContainer.addEventListener('click', function (e) {
  const remove = e.target.closest('.removeToCart')
  const add = e.target.closest('.addToCart')
  const deleteCart = e.target.closest('.deleteToCart')

  if (remove) {
    const id = +remove.dataset.id
    removeFrontCard(id)
  }

  if (add) {
    const id = +add.dataset.id
    addTocart(id)
  }

  if (deleteCart) {
    const id = +deleteCart.dataset.id
    deleteFormCart(id)
  }

})

const actionButtons = document.getElementById('action-buttons')

actionButtons.addEventListener('click',
  function (e) {
    const clear = e.target.closest('#cart-empty')
    const buy = e.target.closest('#cart-checkout')

    if (clear) {
      clearCart()
    }
    if (buy) {
      checkout()
    }
  }
)
