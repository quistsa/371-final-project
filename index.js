//Sam Quist

const express = require('express');
const session = require('express-session')

const CarController = require('./carController');
const carController = new CarController();

const LoginController = require('./loginController');
const loginController = new LoginController();

const bodyParser = require('body-parser');
const { response } = require('express');

//start server
const app = express();
const port = 3000;

//session info
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'abcdefghijklmnopqrstuvwxzy'
}));

function isAuthenticated(req, res, next) {

    console.log('Enter isAuthenticated')
    console.log(req.session)
    if (req.session.user) {
        console.log("Already logged in :)")
        next()
    } else {
        console.log("redirecting to login page")
        res.redirect('/login')
    }
}

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
    loginController.loginPage(req, res)
})

app.post('/login', (req, res) => {
    loginController.requestLogin(req, res)
})

//display all cars on GET request
app.get('/cars', isAuthenticated, (req, res) => {
    carController.index(req,res);
});

// make a new car on POST request
app.post('/cars', isAuthenticated, (req, res) =>{
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

app.get('/oilInfo', (req, res) =>{
    res.render('oilChangeInfo');
});

app.get('/tireInfo', (req, res) =>{
    res.render('tireRotateInfo');
});

app.get('/cars/:id/oil', (req, res) =>{
    carController.editOil(req, res);
});

app.get('/cars/:id/tire', (req, res) =>{
    carController.editTire(req, res);
});

app.get('/cars/:id/miles', (req, res) => {
    carController.updateMiles(req, res); 
 });

app.post('/cars/:id/miles', (req, res) => {
   carController.update(req, res); 
});

app.post('/cars/:id/oil', (req, res) =>{
    carController.updateOil(req, res);
    console.log("oil post");
});

app.post('/cars/:id/tire', (req, res) =>{
    carController.updateTire(req, res);
    console.log("tire post");
});

/////////////////////
//launch the server//
/////////////////////
app.listen(port, () => console.log(`Example listening on port ${port}`));