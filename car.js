// define what cars require & validate inputs

class Car {

    constructor(description){
        if (description) {
            this.id = description.id;
            this.make = description.make;
            this.model = description.model;
            this.year = description.year;
            this.mileage = description.mileage;

            this.lastOil = description.lastOil;
            this.lastTire = description.lastTire;
        }
        
        this.errors = [];
    }

    isValid(){
        this.errors = [];

        if (!this.model || this.model.length <= 0){
            this.errors.push("Car must have a model");
        }

        if (!this.year || parseInt(this.year) > 2030 || parseInt(this.year) < 1900){
            this.errors.push("Car must have a valid year");
        }

        if (!this.mileage || parseInt(this.mileage) < 0){
            this.errors.push("Car must have a valid milage number");
        }

        if (!this.lastOil || parseInt(this.lastOil) < 0 || parseInt(this.lastOil) > parseInt(this.mileage)){
            this.errors.push("Car must have a valid last oil change number");
        }

        if (!this.lastTire || parseInt(this.lastTire) < 0 || parseInt(this.lastTire) > parseInt(this.mileage)){
            this.errors.push("Car must have a valid last tire rotation number");
        }

        return this.errors.length <= 0;
    }

    isValidMiles() {
        if (!this.mileage || parseInt(this.mileage) < 0){
            this.errors.push("Car must have a valid milage number");
        }
    }

}

module.exports = Car;