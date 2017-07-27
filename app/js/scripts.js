"use strict";

let app = new Vue({
    el: "#app",
    data: {
        formData: {
            formStepOne: true,
            weight: '',
            weightUnitChecked: false,
            height: '',
            heightUnitChecked: false,
            age: '',
            name: '',
            email: '',
            firstValidCounter: 0
        }
    },
    methods: {
        isNum(value) {
            return !isNaN(value);
        },
        isEmail(email) {
            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        goToSecondStep() {
            let dataArr = [this.formData.weight, this.formData.height, this.formData.age];
            let counter = 0;
            let vm = this;

            dataArr.forEach(function (item) {
                if (item && vm.isNum(item)) {
                    counter +=1;
                }
            });

            console.log(counter);

            if (counter == 3) {
                console.log('We can not push the button');
                this.formData.formStepOne = false;
                counter = 0;
            } else {
                console.log('We can not do it');
            }
        }
    },
    computed: {
        weightUnit() {
            return this.formData.weightUnitChecked ? 'kg' : 'lbs';
        },
        heightUnit() {
            return this.formData.heightUnitChecked ? 'cm' : 'in';
        },
        weightStyles() {
            return {
              'calc-form__input_valid': this.formData.weight && this.isNum(this.formData.weight),
              'calc-form__input_invalid': this.formData.weight && !this.isNum(this.formData.weight)
            }
        },
        heightStyles() {
            return {
                'calc-form__input_valid': this.formData.height && this.isNum(this.formData.height),
                'calc-form__input_invalid': this.formData.height && !this.isNum(this.formData.height)
            }
        },
        ageStyles() {
            return {
                'calc-form__input_valid': this.formData.age && this.isNum(this.formData.age),
                'calc-form__input_invalid': this.formData.age && !this.isNum(this.formData.age)
            }
        },
        nameStyles() {
            return {
                'calc-form__input_valid': this.formData.name && this.isNum(this.formData.name),
                'calc-form__input_invalid': this.formData.name && !this.isNum(this.formData.name)
            }
        },
        emailStyles() {
            return {
                'calc-form__input_valid': this.formData.email && this.isEmail(this.formData.email),
                'calc-form__input_invalid': this.formData.email && !this.isEmail(this.formData.email)
            }
        },
    }
});