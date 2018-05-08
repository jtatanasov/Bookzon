var validator = (function () {
    const PASSWORD_MIN_LENGTH = 6;
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
            return (typeof pass === 'string' && pass.length >= PASSWORD_MIN_LENGTH && this.hasNumber(pass))
        },

        isValidPhoneNumber: function (phone) {
            var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            return re.test(String(phone));
        },

        isValidNumber: function (num) {
            num = +num;
            return (typeof num == 'number' && num > 0);
        },
        isCvvNumberValid: function (inputNum) {
            var regex = new RegExp("^[0-9]{3,4}$");
            return regex.test(inputNum);
        },

        validateCardNumber: function (number) {
            var regex = new RegExp("^[0-9]{16}$");
            if (!regex.test(number)) {
                return false;
            }

            return this.luhnCheck(number);
        },

        luhnCheck: function (val) {
            var sum = 0;
            for (var i = 0; i < val.length; i++) {
                var intVal = parseInt(val.substr(i, 1));
                if (i % 2 == 0) {
                    intVal *= 2;
                    if (intVal > 9) {
                        intVal = 1 + (intVal % 10);
                    }
                }
                sum += intVal;
            }
            return (sum % 10) == 0;
        },
        isCreditCardInfoValid: function (creditCard) {
            console.log(this.isCvvNumberValid(creditCard.cvvNumber));
            return this.isValidString(creditCard.name)
                && this.validateCardNumber(creditCard.cardNumber)
                && this.isCvvNumberValid(creditCard.cvvNumber)
                && creditCard.expirationDate != 'undefined';
        }
    }
})();
