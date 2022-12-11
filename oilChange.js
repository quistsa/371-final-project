class OilChange {

    constructor(description){
        if (description) {
            this.id = description.id;
            this.date = description.date;
            this.mileage = description.mileage;
        }
        
        this.errors = [];
    }

    isValid(){
        this.errors = [];

            if (!this.mileage || parseInt(this.mileage) < 0){
                this.errors.push("Car must have a valid milage number");
            }

        return this.errors.length <= 0;
    }



}

module.exports = OilChange;