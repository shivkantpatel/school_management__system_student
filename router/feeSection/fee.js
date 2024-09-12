const express = require('express');
const router = express();
const conn = require('../../database/connection');
const { Result } = require('express-validator');


router.get('/fee',(req,res)=>{
    
    
    
    
    if(req.session.user){

        let studentRollNo = req.session.user.student_rollNo ;

        let query = `
            SELECT mfc.feemonth, mfc.paid_by, mfc.fee_id , mfc.totalfee, mfc.receipt_date ,sm.student_name , sm.Class , sm.section , sm.father_mobile_no
            FROM student_mast sm
            INNER JOIN monthly_fee_receipt mfc ON mfc.fee_id = sm.student_rollNo
            WHERE sm.student_rollNo = ?;

        `

        conn.query(query,[studentRollNo],(err,result)=>{
            

            res.render('feeSection/feeCheck',{result:result});
              
        })
        
        
       
        
    }else{
        res.redirect('/')
    }

});



module.exports = router