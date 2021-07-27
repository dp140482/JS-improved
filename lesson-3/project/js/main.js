const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    }
    _fetchProducts() {
        // Переписано для получения данных с сервера GitHub
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.error(error);
            })
            .then(data => {
                this.goods = data.map(item => {
                    // Переименование полей данных путём деструктуризации
                    const { id_product: id, price, product_name: title } = item;
                    return { id, price, title };
                });
                this.render();
            });
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }

    sumOfPrices() {
        return this.goods.reduce((sum, product) => sum + product.price);
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some image">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
    }
    renderForCart() {
        return `${this.title}. ID: ${this.id}. Цена: ${this.price} руб.`;
    }
}

// Класс корзины товаров
class Cart {
    constructor() {
        this._products = [];
        this.amount = 0;
    }
    render() {
        return `<div class="cart">
                        ${this._products.map(cartItem => cartItem.render()).join('')}
                    </div>`;
    }
    _findProductIndex(id) {
        return _products.findIndex(element => element.product.id === id);
    }
    addProduct(product) {
        let i = _findProductIndex(product.id);
        if (i >= 0) {
            // Товар данного типа уже в корзине
            _products[i].count++;
        } else {
            // Поступил товар нового типа
            _products.push(new CartItem(product));
        }
    }
    deleteProduct(id) {
        let i = _findProductIndex(id);
        if (i >= 0) {
            _products[i].count--;
            if (_products[i].count === 0) {
                // Товара не осталось: удаляем позицию
                _products.splice(i, 1);
            }
        }
    }
    _getSumByProduct() {
        return this._products.map(cartItem => cartItem.price * cartItem.count);
    }
    _updateSum() {
        this.amount = _getSumByProduct().reduce((finaleSum, sum) => finaleSum + sum);
    }
    fetchCart() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.error(error);
            })
            .then(data => {
                const { amount, countGoods, contents } = data;
                this.amount = amount;
                this._products = contents.map(item => {
                    const { id_product: id, product_name: title, price, quantity: count } = item;
                    const product = new ProductItem({ id, title, price });
                    return new CartItem(product, count);
                });
                return this.render();
            });
    }
}

class CartItem {
    constructor(product, count = 1) {
        this.product = product;
        this.count = count;
    }
    render() {
        return `<p class="cart-item">
                        ${this.product.renderForCart()}
                        В корзине ${this.count} шт.
                    </p>`;
    }
}

let list = new ProductList();
let cart = new Cart();
document.querySelector('button.btn-cart').addEventListener('click', () => {
    cart.fetchCart()
        .then(str => {
            document.querySelector('main').insertAdjacentHTML('beforeend', str);
        });
});