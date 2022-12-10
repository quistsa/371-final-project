var sqlite3 = require('sqlite3').verbose();
let Car = require('./car');

class SqliteCarDB {

    static initialize() {
        this.db.serialize(() => {
            this.db.run('DROP TABLE IF EXISTS Cars');
            this.db.run(`CREATE TABLE Cars (id INTEGER PRIMARY KEY, userID INTEGER NOT NULL, title TEXT NOT NULL, desc TEXT NOT NULL, type NOT NULL, prio NOT NULL, status NOT NULL);`);
            this.db.run('INSERT INTO Cars (userID, title, desc, type, prio, status) VALUES ("1", "issue", "this is a problem", "issue", "medium", "monitor");');
            this.db.run('INSERT INTO Cars (userID, title, desc, type, prio, status) VALUES ("2", "Its a feature", "trust me its ok", "feature", "low", "closed");');
            this.db.run('INSERT INTO Cars (userID, title, desc, type, prio, status) VALUES ("3","Needs more cars", "the more cars the better", "enhancement", "high", "open");');
            });
    }

    static allCars() {
        return new Promise((resolve, reject) => {
           this.db.all('SELECT * from Cars', (err, response) => {
                  resolve(response.map((item) => new Car(item)));
           });
        });
    }

    static lastThree(){
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM (SELECT * FROM Cars ORDER BY id DESC LIMIT 3);', (err, response) => {
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
                this.db.run(`INSERT INTO Cars (userID, title, desc, type, prio, status) VALUES ("${newCar.userID}", "${newCar.title}", "${newCar.desc}", "${newCar.type}", "${newCar.prio}", "${newCar.status}");`,
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
        this.db.run(`UPDATE Cars SET userID="${car.userID}", title="${car.title}", desc="${car.desc}", type="${car.type}", prio="${car.prio}", status="${car.status}" where id="${car.id}"`);
    }

    static removeCar(car) {
        this.db.run(`DELETE FROM Cars WHERE id="${car.id}"`);
    }
}

SqliteCarDB.db = new sqlite3.Database('cars.sqlite');

module.exports = SqliteCarDB;