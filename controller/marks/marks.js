$(document).ready(function () {
    
    
     // user detel is emmpty () so btn is hide ()------------------------
    
    function toggleButtonState() {
        ($('#exam_type').val() !== null && $('#DATE').val() !== '')?
        $('#chekResultBtn').show()
        : $('#chekResultBtn').hide(); 
    };

    toggleButtonState();

    $('#exam_type').change(toggleButtonState);
    $('#DATE').change(toggleButtonState);
    
// user detel is emmpty () so btn is hide ()---------------------------     

    $('#chekResultBtn').click(function () {

        let resultCheckForm = $('#resultCheckForm').serialize();

        $.ajax({
            url: '/resultCheck',
            type: 'POST',
            data: resultCheckForm,
            success: function (response) {

                if (response.marks) {
                    marks(response)
                   
                    $('#chekResultBtn').prop('disabled', true);
                    $('#chekResultBtn').removeClass('bg-blue-700').addClass('bg-gray-600');
                    $('.result_div').removeClass('hidden');

                    $('#ERRPTAG').html('')
                  
                }else{
                    $('#ERRPTAG').html(`${response}`)
                }


            }
        });
    });




//--------------- marks handle ------------------
    let marks = async (result)=>{

        let watingResult = await result;

        let total_marks = 0;
        let totalNumberPercentage = 0;

        let checlGrade = "";

        watingResult.marks.forEach(element => {

            total_marks += parseFloat(element.marks);
            totalNumberPercentage += parseFloat(element.max_marks) / 100;


            //--- grader section start -----------------
                     
            checlGrade = ((total_marks / totalNumberPercentage <= 33 || element.marks < element.min_marks) ? 'Fail' : 'PASS');


            $('.tBODY').append(`
            
                <tr class="border shadow-xl">
                    <td class="px-6 py-4 uppercase">${element.subject_code}</td>
                    <td class="px-6 py-4 ">${element.min_marks}</td>
                    <td class="px-6 py-4 ">${element.max_marks}</td>
                    <td class="px-6 py-4 ${element.marks < element.min_marks ? 'text-red-600' : ''} ">${element.marks}  <span class=" uppercase text-red-600 font-semibold pl-3">${element.marks < element.min_marks ? 'fail' : ''}</span></td>
                    
                </tr>
            
            `);
        });

        //--------------------------- grade  
        let gRaderating;
        const percentage = (total_marks / totalNumberPercentage) ;
        
        if (percentage <= 33) {
            gRaderating = 'fail';
        } else if (percentage > 33 && percentage <= 45) {
            gRaderating = 'C';
        } else if (percentage > 45 && percentage <= 60) {
            gRaderating = 'B';
        } else if (percentage > 60 && percentage <= 70) {
            gRaderating = 'A';
        } else if (percentage > 70 && percentage <= 100) {
            gRaderating = 'A+';
        }

        console.log(checlGrade);
        
        $('.TfooterR').append(`
                            
            <tr class="border shadow-xl">
                <td class="px-6 py-4 " >TOTAL = <span class=" text-green-600 font-semibold pl-[6px]">${total_marks}</span> </td>
                <td class="px-6 py-4 uppercase " >percentage : <span class=" text-gray-600 font-semibold pl-[6px]">${ Math.floor(total_marks / totalNumberPercentage)}</span> </td>
                <td class="px-6 py-4 uppercase " >Grade = <span class="  ${gRaderating ==='fail'?'text-red-600':'text-green-600'}  font-semibold pl-[6px]">${gRaderating}</span> </td>
                <td class="px-6 py-4 uppercase"> 
                    Result: 
                    <span class=" font-semibold pl-[6px] ${checlGrade == 'Fail' ? 'text-red-600' : 'text-green-600'}">
                        ${checlGrade}
                    </span>
                </td>

            </tr>
        
        `)
        
    }

});