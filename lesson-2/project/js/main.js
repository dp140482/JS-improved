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
        this._products = {
            items: [],
            count: []
        };
    }
    render() {
        return `<div class="cart">${_renderItems()}</div>`;
    }
    addProduct(product) {
        let i = _findProductIndex(product.id);
        if (i >= 0) {
            // Товар данного типа уже в корзине
            _products.count[i]++;
        } else {
            // Поступил товар нового типа
            _products.items.push(product);
            _products.count.push(1);
        }
    }
    deleteProduct(id) {
        let i = _findProductIndex(id);
        if (i >= 0) {
            _products.count[i]--;
            if (_products.count[i] === 0) {
                // Товара не осталось: удаляем позицию
                _products.items.splice(i, 1);
                _products.count.splice(i, 1);
            }
        }
    }
    _findProductIndex(id) {
        return _products.items.findIndex(element => element.id === id);
    }
    _renderItem(i) {
        return `<div class="cart-item">
                        ${_products.items[i].render()}
                        <p class="cart-count">${_products.count[i]}</p>
                    </div>`;
    }
    _renderItems() {
        let s = '';
        for (let i = 0; i < _products.items.length; i++) {
            s += _renderItem(i);
        }
        return s;
    }
    _getSumByProduct() {
        let sums = [];
        for (let i = 0; i < _products.items.length; i++) {
            sums.push(_products.items[i].price * _products.count[i]);
        }
        return sums;
    }
    _getSum() {
        return _getSumByProduct().reduce((finaleSum, sum) => finaleSum + sum);
    }
}

let list = new ProductList();