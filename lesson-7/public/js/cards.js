Vue.component('cards', {
    data() {
        return {
            products: []
        }
    },
    mounted() {
        let opts = {
            headers: {
                'mode': 'no-cors'
            }
        }
        fetch('http://localhost:3000/api/products', opts)
            .then(result => result.json())
            .catch(error => { console.log(error); })
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                }
            })
            .catch(error => { console.log(error); });
    },
    template: `
        <div class="featured-items">
            <card v-for="product of products" :product="product"></card>
        </div>
    `
});

Vue.component('card', {
    props: ['product'],
    data() {
        return {
            imgSrc: '',
            imgAlt: ''
        }
    },
    template: `
            <div class="card-block">
                <a href="product.html" class="card">
                    <img :src="imgSrc" :alt="imgAlt" class="card-pic">
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
        buy(product) {
            this.$root.$refs.cart.goodsNum++;
        }
    },
    mounted() {
        this.imgAlt = `pic${ this.product.id }`;
        this.imgSrc = `img/pic${ this.product.id }.jpeg`;
    }
});