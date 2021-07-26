class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render(); //вывод товаров на страницу
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
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
        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

// Класс корзины товаров
class Cart {
    constructor() {
        this._products = [];
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
    _getSum() {
        return _getSumByProduct().reduce((finaleSum, sum) => finaleSum + sum);
    }
}

class CartItem {
    constructor(product, count = 1) {
        this.product = product;
        this.count = count;
    }
    render() {
        return `<div class="cart-item">
                        ${this.product.render()}
                        <p class="cart-count">${this.count}</p>
                    </div>`;
    }
}

let list = new ProductList();