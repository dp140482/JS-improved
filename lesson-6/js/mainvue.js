const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        basketUrl: '/getBasket.json',
        img: 'https://via.placeholder.com/200x150',
        cartImg: 'https://via.placeholder.com/50x100',
        products: [],
        userSearch: '',
        filtered: [],
        cart: [],
        showCart: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        onInput() {
            if (this.userSearch === '') {
                this.filtered = this.products;
            } else {
                this.filtered = this.products.filter(product => new RegExp(this.userSearch, 'i').test(product.product_name));
            }
        },
        buy(product) {
            let item = cart.find(element => element.product_id === id);
            if (item) {
                cart.push(Object.assign({ quantity: 1 }, product));
            } else {
                item.quantity++;
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
            });
        this.getJson(API + this.basketUrl)
            .then(data => {
                for (let el of data.contents) {
                    this.cart.push(el);
                }
            });
    }
});