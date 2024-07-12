/** @format */

const urlapi = `https://fakestoreapi.com/products?limit=4`;
let products;
async function getProducts() {
	try {
		const response = await fetch(urlapi);
		products = await response.json();
		const productDisplay = document.querySelector(".product-wrapper");
		console.log(products);
		const storedProd = JSON.parse(localStorage.getItem("products")) || [];

		localStorage.setItem("products", JSON.stringify(storedProd));

		let productHtml = "";
		products.forEach((product) => {
			productHtml += ` <div data-id="${product.id}" class="product-items">
                                <div class="product-img">
                                    <img src="${product.image}" alt="" />
                                </div>
                                <div class="prod-details-wrap">
                                    <div class="product-titleandprice">
                                        <span class="title">${product.title}</span>
                                        <span class="price">$${product.price}</span>
                                    </div>
                                    <div class="prod-count">5 types of shoes available</div>
                                    <div class="product-rating">
                                        <div class="stars">
                                            <i class="fas fa-star ratings"></i>
                                            <i class="fas fa-star ratings"></i>
                                            <i class="fas fa-star ratings"></i>
                                            <i class="fas fa-star ratings"></i>
                                            <i class="fas fa-star ratings"></i>
                                        </div>
                                        <div class="counts">${product.rating.count}</div>
                                    </div>
                                    <div class="btn">
                                        <button  
                                        
                                        onclick ='addToCart(${product.id})'
                                        
                                        class="addBtn">Add to Cart</button>
                                    </div>
                                </div>
                            </div>`;
		});

		productDisplay.innerHTML = productHtml;

		// Add event listeners after products are rendered
		// const addButtons = document.querySelectorAll(".addBtn");
		// addButtons.forEach((button) => {
		// 	button.addEventListener("click", addToCart);
		// });
	} catch (error) {
		console.error(error);
	}
}

const cart = [
	{
		id: " ",
		quantity: 0,
		image: "",
		price: 122,
	},
];

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

function saveCartData() {
	localStorage.setItem("cartItems", JSON.stringify(cartItems));
	console.log("Cart saved to localStorage:", cartItems);
}

getProducts();
const renderProd = JSON.parse(localStorage.getItem("products"));
console.log(renderProd);

function addToCart(id) {
	console.log(id);

	let foundProd = false;

	cartItems.forEach((item) => {
		if (item.id === id) {
			item.quantity++;
			foundProd = true;
		}
		saveCartData();
		updateCartDisplay();
	});

	if (!foundProd) {
		const items = renderProd.find((item) => id === item.id);
		if (items) {
			cartItems.push({
				id: id,
				title: items.title,
				quantity: 1,
				image: items.image,
				price: items.price,
			});
			saveCartData();
			updateCartDisplay();
			displayCartCount();
		} else {
			console.error(`Product with id ${id} not found in renderProd`);
		}
	}

	let totalqtys = 0;
	cartItems.forEach((item) => {
		totalqtys += item.quantity;
	});
	localStorage.setItem("cartCount", JSON.stringify(totalqtys));
	displayCartCount();

	console.log(cartItems);
}
function updateCartDisplay() {
	const cartItemContainer = document.querySelector(".cartItem");
	cartItemContainer.innerHTML = "";

	const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
	cartItems.forEach((item, index) => {
		renderCartDetails(
			item.image,
			item.title,
			item.price * item.quantity,
			item.quantity,
			index
		);
	});

	const totalPrice = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	document.querySelector(".totalamount").innerHTML = `$${totalPrice.toFixed(
		2
	)}`;
}
updateCartDisplay();

function renderCartDetails(img, title, price, qty, index) {
	let displayCart = "";
	displayCart += `
    <div class = 'cart-item' >
     <div class="cart-left">
                        <div class="cart-imag">
                            <img src="${img}" alt="" />
                        </div>
                        <div class="cart-title-price">
                            <span class="title"> ${title}</span>
                            <span class="price">$${price}</span>
                        </div>
                    </div>
                    <div class="cart-right">
                        <div data-index =${index}  class="deleteBtn">
                              <i class="fas fa-trash-alt"></i>    

                              
                        </div>
                        <div class="cart-increments">
                            <div class="increaseandecrease">
                                <span class="reduce">-</span>
                                <input class="input" type="text" value="${qty}" >
                                <span class="increase">+</span>
                            </div>
                        </div>
                    </div></div>
                   
             `;

	const cartItem = document.querySelector(".cartItem");
	cartItem.insertAdjacentHTML("beforeend", displayCart);

	const deleteBtn = document.querySelectorAll(".deleteBtn");
	if (deleteBtn) {
		deleteBtn.forEach((button) => {
			button.addEventListener("click", function (e) {
				e.preventDefault();
				const index = this.getAttribute("data-index");
				console.log(index);
				deleteCartItem(index);
				
				updateCartDisplay();
			});
		});
	}
}

function deleteCartItem(index) {
	const getCart = JSON.parse(localStorage.getItem("cartItems")) || [];
	getCart.splice(index, 1);
    updateCartDisplay();
    displayCartCount()
     
	localStorage.setItem("cartItems", JSON.stringify(getCart));

	
}

function displayCartCount() {
    const getCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    let displayCount = JSON.parse(localStorage.getItem("cartCount")) || [];
    if(getCart.length === 0){
     
    }
	let prodCounter = document.querySelector(".items-counter");
    prodCounter.innerHTML = '';
	
	console.log(displayCount);
	prodCounter.innerHTML = displayCount;
	updateCartDisplay();

    
}
displayCartCount();


