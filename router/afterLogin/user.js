const express = require('express');
const router = express();
const conn = require('../../database/connection')


router.get('/userDashboard',(req,res)=>{
    
    if (req.session.user) {
        
    let id = req.session.user.id;
    
    let query = 'select * from student_mast where id = ?';

    conn.query(query,[id],(err,result)=>{
        res.render('userDashboard/userDashboard',{result:result})
        
    })
     

    } else {
        res.redirect('/')
    }
    
    
   
    
})
router.get('/userProfile',(req,res)=>{
    console.log(req.session.user);
    
    if (req.session.user) {
        
    } else {
        res.redirect('/')
    }

    
    
    
})


module.exports = router