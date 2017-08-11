"use strict";

let app = new Vue({
    el: "#app",
    data: {
        formData: {
            formStepOne: true,
            calcOverlay: false,
            weight: '',
            weightUnitChecked: false,
            height: '',
            feet: '',
            inches: '',
            heightUnitChecked: false,
            age: '',
            name: '',
            email: '',
            firstValidCounter: 0
        },
        windowWidth: 0
    },
    mounted: function mounted() {
        this.$nextTick(function () {
            window.addEventListener('resize', this.getWindowWidth);

            //Init
            this.getWindowWidth();
        });
    },
    beforeDestroy: function beforeDestroy() {
        window.removeEventListener('resize', this.getWindowWidth);
    },

    methods: {
        isNum: function isNum(value) {
            return !isNaN(value);
        },
        isEmail: function isEmail(email) {
            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        goToSecondStep: function goToSecondStep() {
            let dataArr = [this.formData.weight, this.formData.height, this.formData.age, this.formData.feet, this.formData.inches];
            let counter = 0;
            let vm = this;

            dataArr.forEach(function (item) {
                if (item && vm.isNum(item)) {
                    counter += 1;
                }
            });

            console.log(counter);

            if (counter >= 3) {
                console.log('We can push the button');
                this.formData.calcOverlay = true;
                let self = this;

                setTimeout(function () {
                    self.formData.calcOverlay = false;
                    self.formData.formStepOne = false;
                }, 3000);

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

                if (this.formData.feet == '') {
                    this.formData.feet = 'Enter data';
                }

                if (this.formData.inches == '') {
                    this.formData.inches = 'Enter data';
                }
            }
        },
        getWindowWidth: function getWindowWidth(event) {
            this.windowWidth = document.documentElement.clientWidth;
        }
    },
    computed: {
        weightUnit() {
            return this.formData.weightUnitChecked ? 'kg' : 'lbs';
        },
        heightUnit() {

            if  (!this.formData.heightUnitChecked) {
                console.log('display two fields');
            }

            return this.formData.heightUnitChecked ? 'cm' : 'ft';
        },
        weightStyles() {
            return {
                'calc-form__input_valid': this.formData.weight && this.isNum(this.formData.weight),
                'calc-form__input_invalid': this.formData.weight && !this.isNum(this.formData.weight)
            };
        },
        heightStyles() {
            return {
                'calc-form__input_valid': this.formData.height && this.isNum(this.formData.height),
                'calc-form__input_invalid': this.formData.height && !this.isNum(this.formData.height)
            };
        },
        feetStyles() {
            return {
                'calc-form__input_valid': this.formData.feet && this.isNum(this.formData.feet),
                'calc-form__input_invalid': this.formData.feet && !this.isNum(this.formData.feet)
            };
        },
        inchesStyles() {
            return {
                'calc-form__input_valid': this.formData.inches && this.isNum(this.formData.inches),
                'calc-form__input_invalid': this.formData.inches && !this.isNum(this.formData.inches)
            };
        },
        ageStyles() {
            return {
                'calc-form__input_valid': this.formData.age && this.isNum(this.formData.age),
                'calc-form__input_invalid': this.formData.age && !this.isNum(this.formData.age)
            };
        },
        nameStyles() {
            return {
                'calc-form__input_valid': this.formData.name && this.isNum(this.formData.name),
                'calc-form__input_invalid': this.formData.name && !this.isNum(this.formData.name)
            };
        },
        emailStyles() {
            return {
                'calc-form__input_valid': this.formData.email && this.isEmail(this.formData.email),
                'calc-form__input_invalid': this.formData.email && !this.isEmail(this.formData.email)
            };
        }
    }
});