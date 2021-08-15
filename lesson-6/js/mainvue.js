const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        basketUrl: '/getBasket.json',
        img: 'https://via.placeholder.com/200x150',
        cartImg: 'https://via.placeholder.com/50x100',
        products: [],
        filtered: [],
        cart: [],
        showCart: false,
        errorFlag: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        buy(product) {
            let item = this.cart.find(element => element.id_product === product.id_product);
            if (item) {
                item.quantity++;
            } else {
                this.cart.push(Object.assign({ quantity: 1 }, product));
            }
        },
        remove(product) {
            if (product.quantity > 1) {
                product.quantity--;
            } else {
                this.cart.splice(this.cart.indexOf(product), 1);
            }
        }
    },
    mounted() {
        this.getJson(API + this.catalogUrl)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
                this.filtered = this.products;
            })
            .catch(error => { this.errorFlag = true; });
        this.getJson(API + this.basketUrl)
            .then(data => {
                for (let el of data.contents) {
                    this.cart.push(el);
                }
            })
            .catch(error => { this.errorFlag = true; });
    }
});