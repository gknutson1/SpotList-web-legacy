document.getElementById("home-button").addEventListener("click", function(){
    window.location = "/index";
});


document.getElementById("add-rule-btn").addEventListener("click", function(){
    addRule();
})

document.getElementById("rule-one").childNodes[1].elements[1].addEventListener("change", function(e){
    alert(e.target.value);


})

function addRule(){
    const ruleTemp = document.getElementById("rule-one");

    const copy = ruleTemp.cloneNode("true");

    copy.childNodes[1].elements[1].addEventListener("change", function(e){
        if(e.target.value.match(/^released./)){
            copy.childNodes[1].elements[2].type ="date";
        }
        else{
            copy.childNodes[1].elements[2].type ="text";
        }
    })


    document.getElementById("rules-list").appendChild(copy);
}

function generateRule(){
    
}