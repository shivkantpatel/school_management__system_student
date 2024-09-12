const express = require('express');
const router = express();
let conn = require('../../database/connection');

router.get('/marks', (req, res) => {

    if (req.session.user) {

        let studentRollNo = req.session.user.student_rollNo;    
        let query = 'select Class , student_rollNo  from student_mast where student_rollNo = ? ';

        conn.query(query,[studentRollNo],(err,result)=>{
            res.render('result/marks',{result:result})
            
        })

    } else {
        res.redirect('/')
    }

});


router.post('/resultCheck',(req,res)=>{
    

    const{studentRollNo , studentClass , exam_type , date  }= req.body;

    let query = ` 
    
    SELECT  marks_obtain.subject_code ,marks_obtain.marks , subject_Master.min_marks, subject_Master.max_marks
    FROM student_mast
    INNER JOIN marks_obtain ON marks_obtain.roll_no = student_mast.student_rollNo
    INNER JOIN marks_master ON student_mast.Class = marks_master.class_code 
    INNER JOIN subject_Master ON marks_obtain.subject_code = subject_Master.subject_name 
    WHERE student_mast.student_rollNo = ? 
    AND marks_master.class_code = ? 
    AND marks_master.exam_type = ?
    AND marks_master.dateOfExam = ?
    `;

    conn.query(query,[studentRollNo ,studentClass,exam_type,date],(err,result)=>{
        
        if(result.length > 0){
           res.json({marks:result})
        }else{
            res.send('Enter Correct Value')
            
        }
        
    })
    
})


module.exports = router;