Vue.component('search', {
    data() {
        return {
            userSearch: ''
        }
    },
    methods: {
        onInput() {
            if (this.userSearch === '') {
                this.$root.filtered = this.$root.products;
            } else {
                this.$root.filtered = this.$root.products.filter(product => new RegExp(this.userSearch, 'i').test(product.product_name));
            }
        }
    },
    template: `<form action="#" class="search-form">
    <input type="text" class="search-field" v-model="userSearch" @input="onInput">
    <button class="btn-search" type="submit">
        <i class="fas fa-search"></i>
    </button>
    </form>`
});