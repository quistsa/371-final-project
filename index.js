//Sam Quist

const express = require('express');

const CarController = require('./carController');
const carController = new CarController();

const bodyParser = require('body-parser');

//start server
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

//display all cars on GET request
app.get('/cars', (req, res) => {
    carController.index(req,res);
});

// make a new car on POST request
app.post('/cars', (req, res) =>{
    carController.create(req, res);
});

//form for creating a new car
app.get('/cars/new', (req, res) =>{
    carController.newCar(req, res);
});

//detailed info on a car with :id
app.get('/cars/:id', (req, res) => {
    carController.show(req, res);
});

//form for editing a car
app.get('/cars/:id/edit', (req, res) => {
    carController.edit(req, res);
});

//update a car
app.post('/cars/:id', (req, res) =>{
    carController.update(req, res);
});

//delete a car
app.get('/cars/:id/delete', (req, res) => {
    carController.delete(req, res);
});

app.get('/init', (req, res) => {
    require('./SqliteCarDB').initialize();
    res.send("Initialized");
});

//splash screen/home
app.get('/', (req, res) => {
    carController.home(req, res);
});

/////////////////////
//launch the server//
/////////////////////
app.listen(port, () => console.log(`Example listening on port ${port}`));