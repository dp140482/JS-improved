const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        img: 'https://via.placeholder.com/200x150',
        products: [],
        userSearch: '',
        filtered: []
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        _fit(product) {
            return product.product_name.search(new RegExp(this.userSearch, 'i')) > -1;
        },
        onInput() {
            if (this.userSearch === '') {
                this.filtered = this.products;
            } else {
                this.filtered = [];
                for (let product of this.products) {
                    if (this._fit(product)) {
                        this.filtered.push(product);
                    }
                }
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
    }
});