

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const path = require('path');
const port = process.env.PORT || 3000;

require("./database/conn");
const Form = require("./module/tour")


// initialize passport-config ---->>>

const initializePassport = require('./passport-config')
const { log } = require('console')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)
// End ---->>>>


const users = []


app.use(express.json());
app.set('view-engine', 'ejs');
app.use(flash());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: false })); // To get the data , not show undefined


// <<<<------------- Router ---------->>>>


app.use(express.static(path.join(__dirname, 'public'))) //image adding

// If user LogIn -------->>>>>>

app.get('/', checkAuthenticated, (req, res) => {
    res.render('userDashBoard.ejs', { name: req.user.name })
})
app.get('/tour', checkAuthenticated, (req, res) => {
    res.render('tour.ejs', { name: req.user.name })
})
app.get('/submit', checkAuthenticated, (req, res) => {
    res.render('submit.ejs', { name: req.user.name })
})

// if user not logIn ------------>>>>>>>>>>

app.get('/index', checkNotAuthenticated, (req, res) => {
    res.render('index.ejs')
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})


// user to connect database , the router action path same for the post data / checkAuthenticated
app.post('/tour', checkAuthenticated,  (req, res) => {
    try {
        const dataOfEmployee = new Form({
            Bill_Entry_date: req.body.Bill_Entry_date,
            Old_sequence_number: req.body.Old_sequence_number,
            Project_name: req.body.Project_name,
            Customer_Name: req.body.Customer_Name,
            Project_location: req.body.Project_location,
            Consumer_name:req.body.Consumer_name,
            Work_Order_number:req.body.Work_Order_number,
            Start_date:req.body.Start_date,
            End_date:req.body.End_date,
        })
        // console.log(dataOfEmployee)
        const dataPost =  dataOfEmployee.save(); //Schema
        // res.send(dataPost);
        res.status(201).render('submit.ejs',  { name: req.user.name });
    } catch (e) {
        res.status(400).send(e);
    }
})


// End Routing ---->>>



app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

// register User ----->>>
app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash( req.body.password, 10 )
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch (e) {
        console.log(e);
        res.redirect('/register')
    }
})


// for logOut  (user are delete permanent, then Re-register user for logIN)
app.delete('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
});


// checkAuthenticated   User are logIn or Not---->>>> 
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/index')
}

// if user already log In
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(port, () => {
    console.log(`${port}`)
})
