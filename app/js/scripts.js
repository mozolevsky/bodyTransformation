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
            email: ''
        }
    },
    methods: {
        isNum(value) {
            return !isNaN(value);
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
                'calc-form__input_valid': this.formData.email && this.isNum(this.formData.email),
                'calc-form__input_invalid': this.formData.email && !this.isNum(this.formData.email)
            }
        }
    }
});