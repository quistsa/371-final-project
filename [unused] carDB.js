// store & instantiate cars
// .requires ./car

let Car = require('./car');

class carDB {

    static allCars() {
        return this.carsList;
    }

    static find(id){
        return this.carsList.find((item) => item.id == id);
    }

    static create(carDescription){
        let newCar = new Car(carDescription);

        if(newCar.isValid()){
            newCar.id = this.carsList.length + 1;
            this.carsList.push(newCar);
        }
        
        return newCar;
    }

    static update(car){

    }

}

carDB.carsList = [];
carDB.create({ user: "1", title: "issue", desc: "this is a problem", issue: "issue", prio: "medium", status: "monitor"}); 
carDB.create({ user: "2", title: "Its a feature", desc: "trust me its ok", issue: "feature", prio: "low", status: "closed"});
carDB.create({ user: "3", title: "Needs more cars", desc: "the more cars the better", issue: "enhancement", prio: "high", status: "open"});

module.exports = carDB;