Vue.component('cart', {
    data() {
        return {
            goodsNum: 0,
            show: false,
            goods: []
        }
    },
    template: `
    <div class="cart scalable" @click="show = !show">
        <img src="img/cart.svg" alt="cart" class="no-phone no-phone_pic">
        <div class="goods no-phone">{{ goodsNum }}</div>
        <cart-window v-show="show" ref="cartWindow" :cart-items="goods"></cart-window>
    </div>
    `
});

Vue.component('cart-window', {
    props: ['cartItems'],
    template: `
    <div class="cartwindow">
        <cart-item v-for="item of cartItems" :cart-item="item"></cart-item>
    </div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    data() {
        return {
            imgSrc: ''
        }
    },
    mounted() {
        this.imgSrc = `img/pic${ cartItem.id }.jpeg`;
    },
    template: `
    <div class="cart-item">
        <img :src="imgSrc" :alt="cartItem.description">
        <div class="cart-item-desc">
            <h3 class="product-title">{{ cartItem.name }}</h3>
            <p class="product-single-price">\${{ cartItem.price }} за шт.</p>
        </div>
        <div class="right-block">
            <button class="del-btn">&times;</button>
            <p class="product-price">\${{ cartItem.quantity * cartItem.price }}</p>
        </div>
    </div>
    `
});