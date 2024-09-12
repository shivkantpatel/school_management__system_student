const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const secretKey = 'token123';
const http = require('http');


router.get('/', (req, res) => {
    res.render('home/loginPage')
});



let loginValidaion = require('../../middleware/login/login');
let conn = require('../../database/connection');
const session = require('express-session');
const { decode } = require('punycode');
const { error } = require('console');


router.post('/login', loginValidaion, (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({ error: errors })
    };


    const { studentRollNo, passwor_d } = req.body

    let query = 'SELECT * FROM student_mast WHERE student_rollNo = ? AND PWD = ?';


    conn.query(query, [studentRollNo, passwor_d], (err, result) => {
        if (err) {
            res.json({ err: err })
        };

        if (result.length > 0) {

            let studentId = result[0]['id'];
            let student_rollNo = result[0]['student_rollNo'];

            const token = jwt.sign({ id: studentId, student_rollNo: student_rollNo }, secretKey, { expiresIn: '1h' });

            res.json({
                success: true,
                token: token,

            });

        } else {
            res.json({ datasuccess: 'Enter Correct Details' });

        }


    });


});




const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
};
router.get('/protected', verifyToken, (req, res) => {

    
    req.session.user = {
        id: req.user.id,
        student_rollNo: req.user.student_rollNo
    };

    res.json({ success:true });

});



router.get('/sessionDestroy', (req, res) => {

    req.session.destroy((err) => {
        res.redirect('/') 
      })

});




router.get('/headerSet', (req, res) => {

    res.render('first')

});



router.post('/getHeader', (req, res) => {
    const { aa, bb } = req.body;
    const payload = {
        userId: aa,
        username: bb
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '10h' });

    return res.status(200).send({ success: true, message: 'Logged in successfully', data: token })
});



router.get('/getHeaderValue', (req, res) => {
    
  res.send('helloworld')

});



module.exports = router;