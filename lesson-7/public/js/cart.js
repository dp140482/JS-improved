Vue.component('cart', {
    data() {
        return {
            countGoods: 0,
            amount: 0,
            show: false,
            goods: []
        }
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
        deleteProduct(product) {
            this.$root.$refs.cart.amount -= product.price;
            this.$root.$refs.cart.countGoods--;
            if (product.quantity > 1) {
                product.quantity--;
            } else {
                this.$root.$refs.cart.goods.splice(this.$root.$refs.cart.goods.indexOf(product), 1);
            }
        }
    },
    template: `
    <div class="cart-item">
        <img :src="cartItem.imgPath" class="cart-img" :alt="cartItem.description">
        <div class="cart-item-desc">
            <h3 class="product-title">{{ cartItem.name }}</h3>
            <p class="product-single-price">\${{ cartItem.price }} за шт.</p>
        </div>
        <div class="right-block">
            <button class="del-btn" @click.prevent = "deleteProduct(cartItem)">&times;</button>
            <p class="product-price">\${{ cartItem.quantity * cartItem.price }}</p>
        </div>
    </div>
    `
});