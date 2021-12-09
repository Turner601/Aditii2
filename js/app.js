class Shopping {
    constructor() {
        this.itemsInCart = {
            itemCount: 0,
            subTotal: 0,
        };

        // Menu inventory
        this.inventory = {

            item1: {
                id: 1,
                img: 'media/bag1-350x350.jpg',
                alt: 'leather backpack',
                class: 'bag',
                price: 199.99,
                qty: 0,
                name: 'Leather backpack',
            },

            item2: {
                id: 2,
                img: 'media/bag2-350x350.jpg',
                alt: 'gucci bag',
                class: 'bag',
                price: 499.99,
                qty: 0,
                name: 'Gucci bag'
            },

            item3: {
                id: 3,
                img: 'media/bag3-350x350.jpg',
                alt: 'gator bag',
                class: 'bag',
                price: 349.99,
                qty: 0,
                name: 'Gator bag'
            },

            item4: {
                id: 4,
                img: 'media/shoe1-350x350.jpg',
                alt: 'red shoes',
                class: 'shoes',
                price: 149.99,
                qty: 0,
                name: 'Red shoes'
            },

            item5: {
                id: 5,
                img: 'media/shoes2-350x350.jpg',
                alt: 'green shoes',
                class: 'shoes',
                price: 159.99,
                qty: 0,
                name: 'Green shoes'
            },

            item6: {
                id: 6,
                img: 'media/shoe3-350x350.jpg',
                alt: 'white shoes',
                class: 'shoes',
                price: 239.99,
                qty: 0,
                name: 'White shoes'
            },

            item7: {
                id: 7,
                img: 'media/short1-350x350.jpg',
                alt: 'beach shorts',
                class: 'shorts',
                price: 79.99,
                qty: 0,
                name: 'Beach shorts'
            },

            item8: {
                id: 8,
                img: 'media/short2-350x350.jpg',
                alt: 'skateboard shorts',
                class: 'shorts',
                price: 99.99,
                qty: 0,
                name: 'Skateboard shorts'
            },

            item9: {
                id: 9,
                img: 'media/short3-350x350.jpg',
                alt: 'laughing shorts',
                class: 'shorts',
                price: 129.99,
                qty: 0,
                name: 'Laughing shorts'
            },

            item10: {
                id: 10,
                img: 'media/t-shirt1-350x350.jpg',
                alt: 'hiking shirt',
                class: 'shirts',
                price: 59.99,
                qty: 0,
                name: 'Hiking shirt'
            },

            item11: {
                id: 11,
                img: 'media/t-shirt2-350x350.jpg',
                alt: 'lighthouse shirt',
                class: 'shirts',
                price: 59.99,
                qty: 0,
                name: 'Lighthouse shirt'
            },

            item12: {
                id: 12,
                img: 'media/t-shirt3-350x350.jpg',
                alt: 'skateboard shirt',
                class: 'shirts',
                price: 59.99,
                qty: 0,
                name: 'Skateboard shirt'
            },

            item13: {
                id: 13,
                img: 'media/wallet1-350x350.jpg',
                alt: 'brown wallet',
                class: 'wallets',
                price: 89.99,
                qty: 0,
                name: 'Brown wallet'
            },

            item14: {
                id: 14,
                img: 'media/wallet2-350x350.jpg',
                alt: 'glowing wallet',
                class: 'wallets',
                price: 129.99,
                qty: 0,
                name: 'Glowing wallet'
            },

            item15: {
                id: 15,
                img: 'media/wallet3-350x350.jpg',
                alt: 'pink wallet',
                class: 'wallets',
                price: 99.99,
                qty: 0,
                name: 'Pink wallet'
            }
        };
    }

    init() {
        this.addToCart();
        this.checkout();
    }

    addToCart() {
        // Set variables
        let buttons = document.querySelectorAll('.add-button');
        let cartItems = document.getElementById('cartItems');
        let cartSubTotal = document.getElementById('cartSubTotal');
        let itemCount = 0;
        let price = 0;

        // For in loop to loop through this.inventory
        for (const key in this.inventory) {
            const item = this.inventory[key];
            // Add event listener to each button
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    // if the id of the data attribute matches item.id
                    if (button.dataset['id'] == item.id) {
                        itemCount++;
                        price = price + item.price;
                        // Store changed itemCount and price into this.itemsInCart
                        this.itemsInCart.itemCount = itemCount;
                        this.itemsInCart.subTotal = price;

                        item.qty++;
                        // console.log(item);
                        // console.log(this.itemsInCart);
                    }

                    // Sending back to the DOM
                    cartItems.innerText = itemCount;
                    cartSubTotal.innerText = price.toFixed(2);
                });
            });
        }
    }

    checkout() {
        // Set variables
        let table = document.getElementById('tbody');
        let checkout = document.getElementById('checkout');
        let checkoutPage = document.querySelector('.checkout-page');
        // let homePage = document.querySelector('.home-page');
        let salePage = document.querySelector('.sale-page');
        let subTimesQty = 0;
        let subtotalValue = document.getElementById('subtotalValue');
        let taxValue = document.getElementById('taxValue');
        let totalValue = document.getElementById('totalValue');
        let tax = 0;
        let shippingValue = document.getElementById('shippingValue');
        let checkoutItemCount = document.getElementById('checkoutItemCount');
        let shipping = 100;

        checkout.addEventListener('click', () => {
            if (salePage.classList.contains('d-none')) return;
            // Remove d-none from checkout and add d-none to homePage
            checkoutPage.classList.remove('d-none');
            salePage.classList.add('d-none');

            if (this.itemsInCart.itemCount == 1) {
                checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`;
            } else {
                checkoutItemCount.innerText = `${this.itemsInCart.itemCount} items`;
            }

            // Load content on checkout page
            for (const key in this.inventory) {
                const item = this.inventory[key];

                subTimesQty = (item.qty * item.price).toFixed(2);
                subtotalValue.innerText = this.itemsInCart.subTotal.toFixed(2);
                shippingValue.innerText = shipping.toFixed(2);
                tax = this.itemsInCart.subTotal * .07;
                taxValue.innerText = tax.toFixed(2);
                totalValue.innerText = (this.itemsInCart.subTotal + tax + shipping).toFixed(2);

                // If the qty > 0 (item has been added to cart)
                if (item.qty > 0) {

                    const tableRow = document.createElement('tr');
                    tableRow.className = 'product-checkout';

                    tableRow.innerHTML += `
                        <td id="checkoutImg">
                            <img src="${item.img}" alt="${item.alt}" class="img-fluid checkout-img"
                            <div class="product-desc">
                                <p class="item-name">${item.name}</p>
                            </div>
                        </td>
                        <td>
                            <p class="unit-price">${item.price.toFixed(2)}</p>
                        </td>
                        <td>
                            <div id="itemQuantity">
                                <p id="qtyInput">${item.qty}</p>
                            </div>
                        </td>
                        <td id="itemSubtotal">${subTimesQty}</td>`;

                        table.append(tableRow);
                }
            }
        });
    }
}

let action = new Shopping();

action.init();