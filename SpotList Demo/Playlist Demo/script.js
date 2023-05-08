$button = $(":button");



$button.click(function(){

    if($(this).next().find(".playlist:first").css('display') === "none"){
    $(this).next().find(".playlist:first").slideDown(300);
    $(this).next().find(".playlist:first").css("display", "flex");
    $(this).next().find(".title:first").css("border-bottom", "silver");

    }
    else{
        
        $(this).next().find(".playlist:first").slideUp(300);
        $(this).next().find(".title:first").css("border-bottom", "lightgreen");


    }
   
});

