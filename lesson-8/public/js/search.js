Vue.component('search', {
    data() {
        return {
            userSearch: ''
        }
    },
    methods: {
        onInput() {
            if (this.userSearch === '') {
                this.$root.$refs.cards.filtered = this.$root.$refs.cards.products;
            } else {
                this.$root.$refs.cards.filtered = this.$root.$refs.cards.products.filter(product => new RegExp(this.userSearch, 'i').test(product.name));
            }
        }
    },
    template: `
            <form action="#" class="search-form">
                <input type="text" class="search-field" v-model="userSearch" @input="onInput">
                <button type="submit" class="btn-search">
                    <img src="img/mglass.svg " alt="mglass" class="mgpic scalable">
                </button>
            </form>
            `
});