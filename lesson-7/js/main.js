const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        products: [{
                id: 1,
                name: "ELLERY X M'O CAPSULE: clothes 1",
                description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
                price: 51
            },
            {
                id: 2,
                name: "ELLERY X M'O CAPSULE: clothes 2",
                description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
                price: 52
            },
            {
                id: 3,
                name: "ELLERY X M'O CAPSULE: clothes 3",
                description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
                price: 53
            },
            {
                id: 4,
                name: "ELLERY X M'O CAPSULE: clothes 4",
                description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
                price: 54
            },
            {
                id: 5,
                name: "ELLERY X M'O CAPSULE: clothes 5",
                description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
                price: 55
            },
            {
                id: 6,
                name: "ELLERY X M'O CAPSULE: clothes 6",
                description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
                price: 56
            }
        ]
    }
});