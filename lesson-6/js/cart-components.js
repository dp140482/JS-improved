Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility'],
    template: `
        <div class="cart-block" v-show="visibility">
            <cart-item v-for="item of cartItems" :img="img" :cart-item="item">
            </cart-item>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="img" alt="Фото товара в корзине">
                <div class="cart-item-desc">
                    <h3 class="product-title">{{ cartItem.product_name }}</h3>
                    <p class="product-quantity">{{ cartItem.quantity }} шт.</p>
                    <p class="product-single-price">\${{ cartItem.price }} за шт.</p>
                </div>
            </div>
            <div class="right-block">
                <p class="product-price">Всего: \${{ cartItem.quantity * cartItem.price }}</p>
                <button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>
            </div>
        </div>
    `
});