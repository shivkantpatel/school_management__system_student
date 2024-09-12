$(document).ready(function () {


    $('.headerTopToogleBtn').click(function () {

        $(this).find('i').toggleClass('fa-xmark fa-bars ');
        $('.topHeaderMeanubar').toggleClass('top-14 top-[-200px] opacity-100 opacity-0')

    });

    $('.usereProfileModel').click(function () {

        $('.TopheaderModelOuterRow').removeClass('hidden')
      

        setTimeout(() => {
            $('.TopheaderModelInnerrow').removeClass('opacity-0 scale-75').addClass('opacity-100 scale-100')
        }, 50);
      

    })
    $('.UserModelCloseBtn').click(function () {    
        
        $('.TopheaderModelOuterRow').addClass('hidden');
        setTimeout(()=>{
            $('.TopheaderModelInnerrow').addClass('opacity-0 scale-75').removeClass('opacity-100 scale-100')
        },50)
             
        
    })


})