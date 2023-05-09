
$("#press").click(function(){

    if($(this).next().css('display') === "none"){
    $(this).next().slideDown(300);
    $(this).next().css("border-bottom-color", "silver");

    }
    else{
        
        $(this).next().slideUp(300);

    }
   
});

