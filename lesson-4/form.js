'use strict';

class FormTester {
    constructor(formID = 'form') {
        this.form = document.getElementById(formID);
        this.init();
        this.form.addEventListener('submit', this.submitCallback);
    }

    init() {
        this._initError('name', 'Неверный формат. Вводите только буквы.');
        this._initError('phone', 'Неверный формат. Вводите в формате +7(000)000-0000.');
        this._initError('mail', 'Неверный формат. Вводите в формате mymail@mail.ru.');
    }

    _initError(inputID, message) {
        this[inputID + 'Input'] = document.getElementById(inputID);
        this[inputID + 'Input'].insertAdjacentHTML('afterend', `<p class="errorbox invisible" id="error-in-${inputID}">
            ${message}
        </p>`);
        this[inputID + 'Error'] = document.getElementById(`error-in-${inputID}`);
    }

    test(inputID, regexp) {
        let result = this[inputID + 'Input'].value.match(regexp) == this[inputID + 'Input'].value;
        if (!result) {
            this[inputID + 'Input'].classList.add('invalid');
            this[inputID + 'Error'].classList.remove('invisible');
        } else {
            this._clearError(inputID);
        }
        return result;
    }

    _clearError(inputID) {
        this[inputID + 'Input'].classList.remove('invalid');
        this[inputID + 'Error'].classList.add('invisible');
    }

    clearErrors() {
        this._clearError('name');
        this._clearError('phone');
        this._clearError('mail');
    }
    submitCallback(event) {
        event.preventDefault();
        if (tester.test('name', /[a-zа-яё]+/i)) {
            if (tester.test('phone', /\+7\(\d{3}\)\d{3}-\d{4}/)) {
                if (tester.test('mail', /[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}/i)) {
                    tester.clearErrors();
                    setTimeout(() => { alert('Сообщение отправлено.'); }, 100);
                }
            }
        }
    }
}

let tester = new FormTester();