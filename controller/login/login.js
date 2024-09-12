


$(document).ready(function () {

    $('.loginModelOpen').click(function () {


        $('.loginModelWindow').removeClass('top-[-400px] opacity-0').addClass('top-[20%] sm:left-[32%] left-[16%] opacity-100 animate__heartBeat');


    });


    $('.modelXcloseWindow').click(function () {
        $('.loginModelWindow').removeClass('top-[20%] left-[32%] opacity-100 animate__heartBeat').addClass('top-[-400px] opacity-0');

    });


    $('.loginModelSubmitBtn').prop('disabled', true);


    $('#remember').change(function () {

        let inputChekOrNot = $('#remember');

        if (inputChekOrNot.is(':checked')) {
            $('.loginModelSubmitBtn').prop('disabled', false);
            $('.loginModelSubmitBtn').addClass('bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50').removeClass('border')
        } else {
            $('.loginModelSubmitBtn').prop('disabled', false);
            $('.loginModelSubmitBtn').removeClass('bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50').addClass('border')

        }


    });



    // -------------------------------- loginModelSubmitBtn --------------------------------------- 

    let errObjectPass = {}

    $('.loginModelSubmitBtn').click(function () {

        let formdata = $('#modelForm').serialize();



        $.ajax({
            url: '/login', // Update to the correct port
            type: 'POST',
            data: formdata,
            success: function (response) {
                if (response.error) {
                    loginModelErrors(response);
                } else if (response.success) {

                    console.log(response);
                    
                    $.ajax({
                        url: '/protected',
                        method: 'GET',
                        headers: {
                            'Authorization': response.token
                        },
                        success: function (response) {
                            if(response.success){
                                window.location.href = '/userDashboard'
                                
                                
                            }
                        },
                        error: function (error) {
                            console.log('Access denied:', error);
                        }
                    });
                }else if(response.datasuccess){
                    console.log(response);

                    let data = '';

                    data = response.datasuccess
                    $('.spantagErr').html(data)
                    $('.modelErr').removeClass('right-[-55%] opacity-0 ').addClass('right-[10%] opacity-100')
                    setTimeout(() => {
                        $('.modelErr').addClass(' right-[-55%] opacity-0 ').removeClass('right-[10%] opacity-100')
                    }, 3000);
                    
                    
                }



            },
            error: function (error) {
                console.error('An error occurred during the request:', error);
            }
        });



    });



    async function loginModelErrors(result) {

        let watingResult = await result;

        console.log(watingResult);


        errObjectPass = {}

        watingResult.error.errors.forEach(element => {

            errObjectPass[element.path] = element.msg

        });



        let ShowErrPTag = ['studentRollNo', 'passwor_d'];

        ShowErrPTag.forEach(element => {

            if (errObjectPass[element]) {

                $('.' + element).html(errObjectPass[element])

            } else {
                $('.' + element).html('')
            }


        });


    };



    const loginModelSuccess = async (result) => {

        let watingResult = await result;



    };



    


    // -------------------------------- loginModelSubmitBtn --------------------------------------- 
})