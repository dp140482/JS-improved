Vue.component('cards', {
    data() {
        return {
            products: [{
                    id: 1,
                    name: "ELLERY X M'O CAPSULE: clothes 1",
                    description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
                    price: 51
                },
                {
                    id: 2,
                    name: "ELLERY X M'O CAPSULE: clothes 2",
                    description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
                    price: 52
                },
                {
                    id: 3,
                    name: "ELLERY X M'O CAPSULE: clothes 3",
                    description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
                    price: 53
                },
                {
                    id: 4,
                    name: "ELLERY X M'O CAPSULE: clothes 4",
                    description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
                    price: 54
                },
                {
                    id: 5,
                    name: "ELLERY X M'O CAPSULE: clothes 5",
                    description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
                    price: 55
                },
                {
                    id: 6,
                    name: "ELLERY X M'O CAPSULE: clothes 6",
                    description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
                    price: 56
                }
            ]
        }
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