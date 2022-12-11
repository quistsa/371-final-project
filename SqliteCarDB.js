var sqlite3 = require('sqlite3').verbose();
let Car = require('./car');
let OilChange = require('./oilChange');
let TireRotation = require('./tireRotation');

class SqliteCarDB {

    static initialize() {
        this.db.serialize(() => {
            this.db.run('DROP TABLE IF EXISTS Cars');
            this.db.run(`CREATE TABLE Cars (id INTEGER PRIMARY KEY, make INTEGER NOT NULL, model TEXT NOT NULL, year TEXT NOT NULL, mileage NOT NULL, lastOil NOT NULL, lastTire NOT NULL);`);
            this.db.run('INSERT INTO Cars (make, model, year, mileage, lastOil, lastTire) VALUES ("Ford", "Fusion", "2010", "138000", "133000", "128000");');
            this.db.run('INSERT INTO Cars (make, model, year, mileage, lastOil, lastTire) VALUES ("Honda", "Accord", "2020", "30000", "27500", "20000");');
            this.db.run('INSERT INTO Cars (make, model, year, mileage, lastOil, lastTire) VALUES ("Toyota","Prius", "2015", "100000", "90000", "1000");');
            
            this.db.run('DROP TABLE IF EXISTS OilChanges');
            this.db.run(`CREATE TABLE OilChanges (id INTEGER PRIMARY KEY, carID INTEGER NOT NULL, date NOT NULL, mileage NOT NULL)`);
            this.db.run('INSERT INTO OilChanges (carID, date, mileage) VALUES ("1, date, 1000');
            this.db.run('INSERT INTO OilChanges (carID, date, mileage) VALUES ("1, date2, 2000');
            
            this.db.run('DROP TABLE IF EXISTS TireRotations');
            this.db.run(`CREATE TABLE TireRotations (id INTEGER PRIMARY KEY, carID INTEGER NOT NULL, date NOT NULL, mileage NOT NULL)`);
        
        });
    }

    static allCars() {
        return new Promise((resolve, reject) => {
           this.db.all('SELECT * from Cars', (err, response) => {
                  resolve(response.map((item) => new Car(item)));
           });
        });
    }

    static findCar(id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * from Cars where (id == ${id})`, (err, rows) => {
                if (rows.length >= 1) {
                    resolve(new Car(rows[0]));
                } else {
                    reject(`Id ${id} not found`);
                }
            });
        });
    }

    static createCar(desc) {
        let newCar = new Car(desc);
        if (newCar.isValid()) {
            return new Promise((resolve, reject) => {
                this.db.run(`INSERT INTO Cars (make, model, year, mileage, lastOil, lastTire) VALUES ("${newCar.make}", "${newCar.model}", "${newCar.year}", "${newCar.mileage}", "${newCar.lastOil}", "${newCar.lastTire}");`,
                    function(err, data) {
                        newCar.id = this.lastID;
                        resolve(newCar);
                    });
            });
        } else {
            return newCar;
        }
    }

    static updateCar(car) {
        this.db.run(`UPDATE Cars SET make="${car.make}", model="${car.model}", year="${car.year}", mileage="${car.mileage}", lastOil="${car.lastOil}", lastTire="${car.lastTire}" where id="${car.id}"`);
    }

    static removeCar(car) {
        this.db.run(`DELETE FROM Cars WHERE id="${car.id}"`);
    }

    static oilChanges(id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT date, mileage FROM OilChanges WHERE carID == ${id}`, (err, rows) => {
                if (rows.length >= 1) {
                    resolve(new OilChange(rows[0]));
                } else {
                    reject(`Id ${id} not found`);
                }
            });
        });
    }

    static tireRotations(id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT date, mileage FROM TireRotations WHERE (carID == ${id})`, (err, rows) => {
                if (rows.length >= 1) {
                    resolve(new TireRotation(rows[0]));
                } else {
                    reject(`Id ${id} not found`);
                }
            });
        });
    }
}

SqliteCarDB.db = new sqlite3.Database('cars.sqlite');

module.exports = SqliteCarDB;