//perform operations on cars (create, edit, update)
// .requires ./car & ./carDB

const { test } = require('media-typer');
const Car = require('./car');
const carDB = require('./SqliteCarDB');

class carController{

    async index(req, res) {
        let cars = await carDB.allCars();
        res.render('carIndex', { cars: cars });
    }

    async home(req, res) {
        res.render('home');
    }

    async show(req, res) {
        let id = req.params.id;
        let car = await carDB.findCar(id);

        if (!car) {
            res.send("Couldn't find a car with ID of " + id);
        } else {
            res.render('carShow', { car: car});
        }
    }

    newCar(req, res) {
        res.render('carNew', {car: new Car()});
    }

    async create(req, res) {
        console.log("Creating new car");
        
        let newCar = await carDB.createCar(req.body.car);

        if (newCar.isValid()) {
            res.writeHead(302, { 'Location': `/cars/${newCar.id}`});
            res.end();
        } else {
            res.render('carNew', { car: newCar });
        }
    }

    async edit(req, res) {
        let id = req.params.id;
        let car = await carDB.findCar(id);

        if (!car) {
            res.send("Couldn't find a car with id " + id);
        } else {
            res.render('carEdit', { car: car });
        }
    }

    async update(req, res) {
        let id = req.params.id;
        let car = await carDB.findCar(id);

        let testCar = new Car(req.body.car);
        if (!testCar.isValid()) {
            testCar.id = car.id;
            res.render('carEdit', { car: testCar });
            return;
        }

        if (!car) {
            res.send("Could not find car with id of " + id);
        } else {
            car.make = req.body.car.make;
            car.model = req.body.car.model;
            car.year = req.body.car.year;
            car.mileage = req.body.car.mileage;
            
            car.lastOil = req.body.car.lastOil;
            car.lastTire = req.body.car.lastTire;

            console.log("Updating car");
            carDB.updateCar(car);

            res.writeHead(302, { 'Location': `/cars/${car.id}` });
            res.end();
        }

    }

    async delete(req, res) {
        let id = req.params.id;
        let car = await carDB.findCar(id);
        

        if (!car) {
            res.send("Couldn't find a car with id " + id);
        } else {
            carDB.removeCar(car);
            let cars = await carDB.allCars();
            res.render('carIndex', { cars: cars });
        }
    }

    async rawIndex(req, res) {
        let cars = await carDB.allCars();
        res.send(cars);
    }

    async editOil(req, res) {
        let id = req.params.id;
        let car = await carDB.findCar(id);

        if (!car) {
            res.send("Couldn't find a car with id " + id);
        } else {
            res.render('oilChange', { car: car });
        }
    }

    async editTire(req, res) {
        let id = req.params.id;
        let car = await carDB.findCar(id);

        if (!car) {
            res.send("Couldn't find a car with id " + id);
        } else {
            res.render('tireRotate', { car: car });
        }
    }

    async updateOil (req, res) {
        let id = req.params.id;
        let car = await carDB.findCar(id);

        let testCar = new Car(req.body.car);
        if (!testCar.isValid()) {
            testCar.id = car.id;
            res.render('carEdit', { car: testCar });
            return;
        }

        if (!car) {
            res.send("Could not find car with id of " + id);
        } else {
            car.make = req.body.car.make;
            car.model = req.body.car.model;
            car.year = req.body.car.year;
            car.mileage = req.body.car.mileage;
            
            car.lastOil = req.body.car.mileage;
            car.lastTire = req.body.car.lastTire;

            console.log("Updating car");
            carDB.updateCar(car);

            res.writeHead(302, { 'Location': `/cars/${car.id}` });
            res.end();
        }
    
        }

    async updateTire (req, res) {
        let id = req.params.id;
        let car = await carDB.findCar(id);

        let testCar = new Car(req.body.car);
        if (!testCar.isValid()) {
            testCar.id = car.id;
            res.render('carEdit', { car: testCar });
            return;
        }

        if (!car) {
            res.send("Could not find car with id of " + id);
        } else {
            car.make = req.body.car.make;
            car.model = req.body.car.model;
            car.year = req.body.car.year;
            car.mileage = req.body.car.mileage;
            
            car.lastOil = req.body.car.lastOil;
            car.lastTire = req.body.car.mileage;

            console.log("Updating car");
            carDB.updateCar(car);

            res.writeHead(302, { 'Location': `/cars/${car.id}` });
            res.end();
        }
    }
}

module.exports = carController;