const app = new Vue({
    el: '#app',
    data: {
        goodsNum: 0
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => { console.log(error); });
        }
    }
});