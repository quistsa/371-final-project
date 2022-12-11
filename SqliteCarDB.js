var sqlite3 = require('sqlite3').verbose();
let Car = require('./car');

class SqliteCarDB {

    static initialize() {
        this.db.serialize(() => {
            this.db.run('DROP TABLE IF EXISTS Cars');
            this.db.run(`CREATE TABLE Cars (id INTEGER PRIMARY KEY, make INTEGER NOT NULL, model TEXT NOT NULL, year TEXT NOT NULL, mileage NOT NULL, lastOil NOT NULL, lastTire NOT NULL);`);
            this.db.run('INSERT INTO Cars (make, model, year, mileage, lastOil, lastTire) VALUES ("Ford", "Fusion", "2010", "138000", "133000", "128000");');
            this.db.run('INSERT INTO Cars (make, model, year, mileage, lastOil, lastTire) VALUES ("Honda", "Accord", "2020", "30000", "27500", "20000");');
            this.db.run('INSERT INTO Cars (make, model, year, mileage, lastOil, lastTire) VALUES ("Toyota","Prius", "2015", "100000", "90000", "1000");');
            this.db.run('INSERT INTO Cars (make, model, year, mileage, lastOil, lastTire) VALUES ("Hyundai","Veloster", "2016", "80000", "70000", "65000");');
            this.db.run('INSERT INTO Cars (make, model, year, mileage, lastOil, lastTire) VALUES ("Ford","Focus ST", "2017", "68000", "67000", "67000");');
            this.db.run('INSERT INTO Cars (make, model, year, mileage, lastOil, lastTire) VALUES ("Jeep","Cherokee", "2009", "200000", "100", "0");');
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
}

SqliteCarDB.db = new sqlite3.Database('cars.sqlite');

module.exports = SqliteCarDB;