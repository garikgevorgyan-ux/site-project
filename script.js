const products = [
    {id: 1, name:"Nike Air Max 270", price: 129.99, rating: 4.7, image:"photos/Nike max 270 black.png", desc: "Lightweight everyday sneaker with comfortable cushioning and a sporty design"},
    {id: 2, name:"Adidas Ultraboost 22", price: 159.99, rating: 4.4, image:"photos/Adidas Ultraboost 22.png", desc: "Responsive cushioning and a comfortable it designed for running and everyday use"},
    {id: 3, name:"Air Jordan 1 Mid", price: 149.99, rating: 4.9, image:"photos/Air Jordan 1 Mid.png", desc: "Classic basketball-inspired silhouette with a timeless streetwear design."},
    {id: 4, name:"Puma RS-X", price: 119.99, rating: 4.8, image:"photos/Puma RS-X.png", desc: "Bold retro-inspired design with comfortable cushioning for everyday wear."},
];

let cardPlace = [];
window.addEventListener('DOMContentLoaded', () => {
    cardsStructure(products);
})
function cardsStructure(items){
    const grid = document.querySelector('.featured_card_grid');

    if(products.length === 0){
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
        <div class="product_card">
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
                <p class=""Product_price_value>${item.price}</p>
            </div>

            <!---buy button--->
            <div class="product_buy_element">
                <button class="product_buy_button" onclick="productBuying()">ADD TO CARD</button>
            </div>
        </div>
        `;
    }).join("");

}