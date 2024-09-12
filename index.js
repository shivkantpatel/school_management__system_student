const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
app.use('/controller', express.static(path.join(__dirname, 'controller')));
app.use(express.static(path.join(__dirname,'uploads')));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const { body, validationResult } = require('express-validator');
const http = require('http');

const session = require('express-session')


app.use(session({
    secret: 'secretKey',  
    resave: false,
    saveUninitialized: false, 
    cookie: {
        secure: false, 
        httpOnly: true, 
        maxAge: 360000000 
    }
}));





//----------------------- homeLogin ---------------------------------

let homeLogin = require('./router/loginPage/login');

app.use(homeLogin)

//----------------------- homeLogin ---------------------------------



// --------------------------------------userLogin-------------------------
const userLogin = require('./router/afterLogin/user');
app.use(userLogin)
// --------------------------------------userLogin-------------------------

// --------------------------------------fee-------------------------
const fee = require('./router/feeSection/fee');
app.use(fee)
// --------------------------------------fee-------------------------


// result --------------------------------------------

const marks = require('./router/result/marks');

app.use(marks)

app.listen(5200);










function datevalidaion (result){

    let dateData = result.split('/');
    let day = parseFloat(dateData[0]);
    let month = parseFloat(dateData[1])-1;
    let year = parseFloat(dateData[2]);
    

    let dateObject = new Date(year, month, day);

    if (
        dateObject.getFullYear() === year &&
        dateObject.getMonth() === month &&
        dateObject.getDate() === day
    ) {
        console.log("Valid date");
    } else {
        console.log("Invalid date");
    }
    
    
}
// datevalidaion('23/12/2024');


function countDaysBetween(date1, date2) {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
        
    let dayDifference = (d2 - d1) / (1000 * 60 * 60 * 24);
    
    return dayDifference;    
}

// console.log(countDaysBetween("05/12/2005", "10/12/2006")); 

function a (){
    let a = 5 ;
    let b = 2 ;

    // parseFloat(b)
    // console.log(a/b);
    // Math.ceil(b);
    // console.log(a/b);

    // console.log(23%5);
    
    let subject1 = 40;
    let subject2 = 60;
    let subject3 = 100;

    let allsubjectPercentage = subject1+subject2+subject3;

    if(allsubjectPercentage/3 >= 50){
        console.log('pass');
        
    }else{
        console.log('fail');
        
    }


    let male = 25 ;
    let female = 30;

    if(male >= 30){

    }else if(female >=25){

    }
    
}
