"use strict";

var app = new Vue({
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
        isNum: function isNum(value) {
            return !isNaN(value);
        },
        isEmail: function isEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        goToSecondStep: function goToSecondStep() {
            var dataArr = [this.formData.weight, this.formData.height, this.formData.age];
            var counter = 0;
            var vm = this;

            dataArr.forEach(function (item) {
                if (item && vm.isNum(item)) {
                    counter += 1;
                }
            });

            console.log(counter);

            if (counter == 3) {
                console.log('We can push the button');
                this.formData.formStepOne = false;
                counter = 0;
            } else {
                console.log('We can not do it');
                if (this.formData.weight == '') {
                    this.formData.weight = 'Enter numerical data';
                }

                if (this.formData.height == '') {
                    this.formData.height = 'Enter numerical data';
                }

                if (this.formData.age == '') {
                    this.formData.age = 'Enter numerical data';
                }
            }
        }
    },
    computed: {
        weightUnit: function weightUnit() {
            return this.formData.weightUnitChecked ? 'kg' : 'lbs';
        },
        heightUnit: function heightUnit() {
            return this.formData.heightUnitChecked ? 'cm' : 'in';
        },
        weightStyles: function weightStyles() {
            return {
                'calc-form__input_valid': this.formData.weight && this.isNum(this.formData.weight),
                'calc-form__input_invalid': this.formData.weight && !this.isNum(this.formData.weight)
            };
        },
        heightStyles: function heightStyles() {
            return {
                'calc-form__input_valid': this.formData.height && this.isNum(this.formData.height),
                'calc-form__input_invalid': this.formData.height && !this.isNum(this.formData.height)
            };
        },
        ageStyles: function ageStyles() {
            return {
                'calc-form__input_valid': this.formData.age && this.isNum(this.formData.age),
                'calc-form__input_invalid': this.formData.age && !this.isNum(this.formData.age)
            };
        },
        nameStyles: function nameStyles() {
            return {
                'calc-form__input_valid': this.formData.name && this.isNum(this.formData.name),
                'calc-form__input_invalid': this.formData.name && !this.isNum(this.formData.name)
            };
        },
        emailStyles: function emailStyles() {
            return {
                'calc-form__input_valid': this.formData.email && this.isEmail(this.formData.email),
                'calc-form__input_invalid': this.formData.email && !this.isEmail(this.formData.email)
            };
        }
    }
});