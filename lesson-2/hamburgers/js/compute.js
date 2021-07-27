'use strict';

class Burger {
    constructor() {
        this.type = document.getElementById('burger').value;
        this.filling = document.getElementById('filling').value;
        this.addition = document.getElementById('addition').value;
        this._interpret();
        this._render();
    }
    _interpret() {
        switch (this.type) {
            case 'small':
                this.price = 50;
                this.caloricСontent = 20;
                break;
            case 'big':
                this.price = 100;
                this.caloricСontent = 40;
                break;
        }
        switch (this.filling) {
            case 'cheese':
                this.price += 10;
                this.caloricСontent += 20;
                break;
            case 'lettuce':
                this.price += 20;
                this.caloricСontent += 5;
                break;
            case 'potatoes':
                this.price += 15;
                this.caloricСontent += 10;
                break;
        }
        switch (this.addition) {
            case 'spice':
                this.price += 15;
                break;
            case 'mayonnaise':
                this.price += 20;
                this.caloricСontent += 5;
                break;
        }
    }
    _render() {
        document.getElementById('sum').innerText = this.price;
        document.getElementById('cal').innerText = this.caloricСontent;
    }
}