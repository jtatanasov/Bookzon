var validator = (function () {
    return {
        isValidMail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },

        isValidString: function (str) {
            return (typeof str === 'string' && str.length > 0);
        },

        hasNumber: function (str) {
            return /\d/.test(str);
        },

        isValidPassword: function (pass) {
            return (typeof pass === 'string' && pass.length >= 6 && this.hasNumber(pass))
        },

        isValidPhoneNumber: function (phone) {
            var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            return re.test(String(phone));
        },

        isValidNumber: function (num) {
            num = +num;
            return (typeof num == 'number' && num > 0);
        },
        isCreditCardNumberValid: function (inputNum) {
            return inputNum.toString().length == 16;
        },
        isCvvNumberValid: function(inputNum) {
            return inputNum.toString().length == 3;
        },
        isCreditCardInfoValid: function(creditCard) {
            return this.isValidString(creditCard.name) 
                    && this.isCreditCardNumberValid(creditCard.cardNumber)
                    && this.isCvvNumberValid(creditCard.cvvNumber)
                    && creditCard.expirationDate != 'undefined';
        }
    }
})();
