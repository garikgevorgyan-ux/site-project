const products = [
    { id: 1, name: "Nike Air Max 270", price: 129.99, image: "photos/Nike max 270 black.png", desc: "Lightweight everyday sneaker with comfortable cushioning and a sporty design" },
    { id: 2, name: "Adidas Ultraboost 22", price: 159.99, image: "photos/Adidas Ultraboost 22.png", desc: "Responsive cushioning and a comfortable it designed for running and everyday use" },
    { id: 3, name: "Air Jordan 1 Mid", price: 149.99, image: "photos/Air Jordan 1 Mid.png", desc: "Classic basketball-inspired silhouette with a timeless streetwear design." },
    { id: 4, name: "Puma RS-X", price: 119.99, image: "photos/Puma RS-X.png", desc: "Bold retro-inspired design with comfortable cushioning for everyday wear." },
];

let cardPlace = [];
window.addEventListener('DOMContentLoaded', () => {
    cardsStructure(products);
})
function cardsStructure(items) {
    const grid = document.querySelector('.featured_card_grid');
    if (products.length === 0) {
        grid.innerHTML = `
            <div class="featured_not_founded_card">
                <h3>Nothing found for your request.</h3>
            </div>
        `;
        return;
    }
    grid.innerHTML = products.map(item => {
        const productsCards = cardPlace.includes(item.id);
        return `
        <div class="product_card" onclick="openProduct(${item.id})">
            <!--card picture and favorite heard--->
            <div class="product_picture_favorite_heard">
                <img class="product_picture" src="${item.image}">
                <button class="heard_button" onclick="toggleHeard()">
                    <svg class="heart" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </button>
            </div>

            <!---information-->
            <div class="product_info">
                <h4 class="product_info_text">${item.name}</h4>
            </div>

            <!---price--->
            <div class="product_price">
                <p class="Product_price_value">$${item.price}</p>
            </div>

            <!---buy button--->
            <div class="product_buy_element">
                <button class="product_buy_button" onclick="productBuying()">ADD TO CART</button>
            </div>
        </div>
        `;
    }).join("");

}
function openProduct(id) {
    const product = products.find(item => item.id == id);
    const allProductModel = document.querySelector('.product_model')
    const ProductModel = document.querySelector('.product_model_conteiner');

    ProductModel.innerHTML = `
        <div class="product_model_picture">
            <img class="product_model_src" src="${product.image}">
        </div>
        <div class="product_model_cloesd">
            <button class="closed_button" onclick="closedButton()">X</button>
        </div>
        <div class="product_model_information">
            <p class="product_model_name">${product.name}</p>
            <p class="product_model_price">$${product.price}</p>
            <p class="product_model_desc">${product.desc}</p>
            <div class="product_model_sizes">
                <p>Size</p>
                <div class="size_buttons">
                    <button onclick="modelButtons(this)">40</button>
                    <button onclick="modelButtons(this)">41</button>
                    <button class="active" onclick="modelButtons(this)">42</button>
                    <button onclick="modelButtons(this)">43</button>
                    <button onclick="modelButtons(this)">44</button>
                </div>
            </div>
            <div class="product_model_quantity">
                <p>Quantity</p>
                <div class="quantity_elements">
                    <button onclick="deductQuantity()">-</button>
                    <span class="quantity_value">1</span>
                    <button onclick="addQuantity()">+</button>
                </div>
            </div>
            <button class="product_model_buy_button" onclick="productBuying(products.find(item => item.id == ${product.id}))">ADD TO CART</button>
        </div>
    `;
    allProductModel.classList.add('active');
}
let quantity = 1; document.querySelector('.quantity_value');
const allProductModel = document.querySelector(".product_model");

function deductQuantity() {
    if (quantity > 1) {
        quantity--;
        document.querySelector('.quantity_value').textContent = quantity;

    }
}
function addQuantity() {
    quantity++;
    document.querySelector('.quantity_value').textContent = quantity;
}
function modelButtons(button) {
    const buttons = document.querySelectorAll(".size_buttons button");
    if (button.classList.toggle("active") == true) {
        buttons.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove("active");
            }
        });
    }

}
function closedButton() {
    allProductModel.classList.remove('active');
}

let basketProducts = [];

function busketElement() {
    const allBasketModel = document.querySelector(".basket_model");
    const basketModel = document.querySelector(".basket_model_container");
    basketModel.innerHTML = `
        <div class="basket_model_header">
            <h2 class="basket_header_text">YOUR CART</h2>
            <button class="basket_model_closer" onclick="basketClosed()">X</button>
        </div>
        <hr>
        <div class="basket_model_products">
            
        </div>
        <hr>
        <div class="basket_model_total_panel">
            <div class="subtotal_elements">
                <p class="subtotal_text">Subtotal</p>
                <p class="subtotal_price"></p>
            </div>
            <div class="shipping_elements">
                <p class="shipping_text">Shipping</p>
                <p class="shipping_price">$0.00</p>
            </div>
            <div class="basket_model_total_buttons">
                <button class="checkout_button" onclick="checkoutButton()">CHECKOUT</button>
            </div>
        </div>
    `;
    allBasketModel.classList.add('active');
    renderBasketProducts();
    calculateSubtotal();
}
function productBuying(product) {
    if (!product){ 
        return;
    }
    if (!document.querySelector(".basket_model_products")) {
        busketElement();
    }

    const selectedSize = document.querySelector(".size_buttons button.active");
    const size = selectedSize.textContent;

    const price = calculatePrice(product, quantity);
    const productQuantity = quantity;

    const existingProduct = basketProducts.find(item => 
        item.product.id == product.id && item.size == size
    );
    if(existingProduct){
        existingProduct.quantity += productQuantity;
    }
    else{
        basketProducts.push({
        product: product,
        size: size,
        quantity: productQuantity
    });
    }

    if(!document.querySelector(".basket_model_products")){
        busketElement();
    }
    else{
        renderBasketProducts();
        calculateSubtotal();
    }

}

function renderBasketProducts(){
    const basketProductsDiv = document.querySelector('.basket_model_products');
    if(!basketProductsDiv){
        return;
    }
    basketProductsDiv.innerHTML = "";

    basketProducts.forEach(item => {
        const basketProductDiv = document.createElement('div');
        basketProductDiv.classList = "basket_product_container";

        const price = calculatePrice(
            item.product, 
            item.quantity
        );

        basketProductDiv.innerHTML = `
        <div class="basket_product_picture">
            <img class="basket_product_src" src="${item.product.image}">
        </div>
        <div class="basket_product_info">
            <p class="basket_product_name">${item.product.name}</p>
            <p class="basket_product_size">Size: ${item.size}</p>
            <p class="basket_product_price">$${price.toFixed(2)}</p>
            <div class="basket_quantity_elements">
                <button onclick="changeBasketQuantity(${basketProducts.indexOf(item)},-1)">-</button>
                <span class="basket_quantity_value">${item.quantity}</span>
                <button onclick="changeBasketQuantity(${basketProducts.indexOf(item)},1)">+</button>
            </div>
        </div>  
    `;

    basketProductsDiv.appendChild(basketProductDiv);
    });
}
function calculatePrice(product, quantity) {
    return product.price * quantity
}
function basketClosed(){
    const allBasketModel = document.querySelector('.basket_model');
    allBasketModel.classList.remove('active');
}
function changeBasketQuantity(index, change){
    const item = basketProducts[index]; //x[i]

    if(!item){
        return;
    }

    item.quantity += change;

    if(item.quantity <= 0){
        basketProducts.splice(index,1);
    }

    renderBasketProducts();
    calculateSubtotal();
}

function calculateSubtotal(){
    const subtotalElement = document.querySelector('.subtotal_price');

    if(!subtotalElement){
        return;
    }

    const subtotal = basketProducts.reduce((total, item) =>{
        return total + calculatePrice(item.product, item.quantity);
    },0);

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
}