document.getElementById("home-button").addEventListener("click", function(){
    window.location = "/index";
});


document.getElementById("add-rule-btn").addEventListener("click", function(){
    addRule();
})

document.getElementById("rule-one").childNodes[1].elements[1].addEventListener("change", function(e){
    alert(e.target.label);


})

function addRule(){
    const ruleTemp = document.getElementById("rule-one");

    const newRule = ruleTemp.cloneNode("true");
    newRule.childNodes[1].elements[0].options[1].disabled = false;

    newRule.childNodes[1].elements[1].addEventListener("change", function(e){
        if(e.target.value.match(/^released./)){
            newRule.childNodes[1].elements[2].type ="date";
        }
        else{
            newRule.childNodes[1].elements[2].type ="text";
        }
    })

    document.getElementById("rules-list").appendChild(newRule);
}

function generateRule(){
    
}