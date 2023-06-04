document.getElementById("home-button").addEventListener("click", function(){
    window.location = "/index";
});


document.getElementById("add-rule-btn").addEventListener("click", addRule);
//document.getElementById("add-rule-btn").addEventListener("click", checkRuleOneSave);

applyListeners(document.getElementById("rule-one").childNodes[1].elements);

function addRule(){
    const ruleTemp = document.getElementById("rule-one");

    let newRule = ruleTemp.cloneNode("true");
    newRule = cleanClone(newRule);

    document.getElementById("rules-list").appendChild(newRule);
}

function applyListeners(ruleForm){
    ruleForm[1].addEventListener("change", function(){
        if(ruleForm[1].value.match(/^released./)){
            ruleForm[2].type ="date";
            ruleForm[2].value = "2016-10-13";
        }
        else{
            ruleForm[2].type ="text";
            ruleForm[2].value = "";

        }
    });
    ruleForm[3].addEventListener("click", function(){
        ruleForm[0].disabled = true;
        ruleForm[1].disabled = true;
        ruleForm[2].disabled = true;
        ruleForm[3].disabled = true;
        ruleForm[4].disabled = false;

    });
    ruleForm[4].addEventListener("click", function(){
        ruleForm[0].disabled = false;
        ruleForm[1].disabled = false;
        ruleForm[2].disabled = false;
        ruleForm[3].disabled = false;
        ruleForm[4].disabled = true;

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
    applyListeners(ruleForm);
    ruleForm[1].options[1].selected = true;
    ruleForm[2].type ="text";
    ruleForm[2].value = "";
    ruleForm[5].disabled = false;
    return newRule;
}