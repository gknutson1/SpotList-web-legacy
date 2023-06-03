document.getElementById("home-button").addEventListener("click", function(){
    window.location = "/index";
});


document.getElementById("add-rule-btn").addEventListener("click", function(){
    addRule();
})

applyChangeListener(document.getElementById("rule-one").childNodes[1].elements);

function addRule(){
    const ruleTemp = document.getElementById("rule-one");

    let newRule = ruleTemp.cloneNode("true");
    newRule = cleanClone(newRule);

    document.getElementById("rules-list").appendChild(newRule);
}

function applyChangeListener(ruleForm){
    ruleForm[1].addEventListener("change", function(){
        if(ruleForm[1].value.match(/^released./)){
            ruleForm[2].type ="date";
        }
        else{
            ruleForm[2].type ="text";
        }
    });
}

function generateRule(){
    
}
/*
CleanClone() will clean clone of orignal first rule.
*/
function cleanClone(newRule){
    const ruleForm = newRule.childNodes[1].elements;

    ruleForm[0].options[1].disabled = false;

    applyChangeListener(ruleForm);
    ruleForm[1].options[1].selected = true;
    ruleForm[2].type ="text";

    return newRule;
}