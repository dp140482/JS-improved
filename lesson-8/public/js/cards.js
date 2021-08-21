Vue.component('cards', {
    data() {
        return {
            products: [],
            filtered: []
        }
    },
    mounted() {
        this.$root.getJson('http://localhost:3000/api/products')
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(Object.assign({ imgPath: `img/pic${item.id}.jpeg` }, item));
                }
                this.$data.filtered = this.$data.products;
            })
            .catch(error => { this.$root.$refs.error.text = 'Connection failed'; });
    },
    template: `
        <div class="featured-items">
            <card v-for="product of filtered" :product="product"></card>
        </div>
    `
});

Vue.component('card', {
    props: ['product'],
    template: `
            <div class="card-block">
                <a href="product.html" class="card">
                    <img :src="product.imgPath" :alt="product.imgPath" class="card-pic">
                    <div class="text-box">
                        <p class="card-header">{{ product.name }}</p>
                        <p class="card-text">{{ product.description }}</p>
                        <p class="card-price">\${{ product.price.toFixed(2) }}</p>
                    </div>
                </a>
                <div class="add-box" @click="buy(product)">
                    <div class="add">
                        <img src="img/cart.svg" alt="chart">
                        <p class="add-text">Add to Cart</p>
                    </div>
                </div>
            </div>
    `,
    methods: {
        postJson(url, data) {
            return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => { this.$root.$refs.error.text = 'Connection failed'; });
        },
        buy(product) {
            this.$root.$refs.cart.countGoods++;
            this.$root.$refs.cart.amount += product.price;
            let item = this.$root.$refs.cart.goods.find(element => element.id === product.id);
            if (item) {
                this.$root.putJson(`http://localhost:3000/api/cart/${item.id}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity++;
                        }
                    })
                    .catch(error => { this.$root.$refs.error.text = 'Connection failed'; });
            } else {
                let cartProduct = Object.assign({ quantity: 1 }, product);
                this.postJson(`http://localhost:3000/api/cart`, cartProduct)
                    .then(data => {
                        if (data.result === 1) {
                            this.$root.$refs.cart.goods.push(cartProduct);
                        }
                    })
                    .catch(error => { this.$root.$refs.error.text = 'Connection failed'; });
            }
        }
    }
});