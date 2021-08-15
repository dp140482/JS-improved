Vue.component('error', {
    props: ['status'],
    template: `
        <p class="error-block" v-show="status">
            Ошибка в процессе связи с сервером!
        </p>
    `
});