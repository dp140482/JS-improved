const app = new Vue({
    el: '#app',
    data: {
        goodsNum: 0
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => { this.$root.$refs.error.text = 'Connection failed'; });
        },
        putJson(url, data) {
            return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => { this.$root.$refs.error.text = 'Connection failed'; });
        }
    }
});