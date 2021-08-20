Vue.component('error', {
    data() {
        return {
            text: ''
        }
    },
    computed: {
        isVisible() {
            return this.text !== ''
        }
    },
    template: `
    <div class="error-block" v-if="isVisible">
        <p>{{ text }}</p>
        <button class="error-close-btn" @click="text=''">&times;</button>
    </div>
    `
})