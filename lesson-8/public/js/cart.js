Vue.component('cart', {
    data() {
        return {
            countGoods: 0,
            amount: 0,
            show: false,
            goods: []
        }
    },
    mounted() {
        this.$root.getJson('http://localhost:3000/api/cart')
            .then(data => {
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                for (let item of data.contents) {
                    this.goods.push(item);
                }
            });
    },
    template: `
    <div class="cart scalable" @click="show = !show">
        <img src="img/cart.svg" alt="cart" class="no-phone no-phone_pic">
        <div class="goods no-phone">{{ countGoods }}</div>
        <cart-window v-show="show" ref="cartWindow" :cart-items="goods" :amount="amount"></cart-window>
    </div>
    `
});

Vue.component('cart-window', {
    props: ['cartItems', 'amount'],
    template: `
    <div class="cartwindow">
        <p class="total-sum">Total sum: \${{ amount }}</p>
        <cart-item v-for="item of cartItems" :cart-item="item"></cart-item>
    </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    methods: {
        removeJson(url, data) {
            return fetch(url, {
                    method: 'DELETE',
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => { this.$root.$refs.error.text = 'Connection failed'; });
        },
        deleteProduct(product) {
            this.$root.$refs.cart.amount -= product.price;
            this.$root.$refs.cart.countGoods--;
            if (product.quantity > 1) {
                let item = this.$root.$refs.cart.goods.find(element => element.id === product.id);
                this.$root.putJson(`http://localhost:3000/api/cart/${item.id}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    })
                    .catch(error => { this.$root.$refs.error.text = 'Connection failed'; });
            } else {
                this.removeJson(`http://localhost:3000/api/cart/${product.id}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.$root.$refs.cart.goods.splice(this.$root.$refs.cart.goods.indexOf(product), 1);
                        }
                    })
                    .catch(error => { this.$root.$refs.error.text = 'Connection failed'; });
            }
        }
    },
    template: `
    <div class="cart-item">
        <img :src="cartItem.imgPath" class="cart-img" :alt="cartItem.description">
        <div class="cart-item-desc">
            <h3 class="product-title">{{ cartItem.name }}</h3>
            <p class="product-single-price">Price: \${{ cartItem.price }}. Quantity: {{ cartItem.quantity }}.</p>
        </div>
        <div class="right-block">
            <button class="del-btn" @click.prevent = "deleteProduct(cartItem)">&times;</button>
            <p class="product-price">\${{ cartItem.quantity * cartItem.price }}</p>
        </div>
    </div>
    `
});