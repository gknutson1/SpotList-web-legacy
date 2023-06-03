document.getElementById("home-button").addEventListener("click", function(){
    window.location = "/index";
});

// function checkRuleOneSave(){
//     const formElements = document.getElementById("rule-one").childNodes[1].elements;
//     const searchField = formElements[2].value;

//     if(searchField === null || searchField.trim() === ""){
//         alert("Please enter in search for first rule");
//     }
//     else{
//         document.getElementById("add-rule-btn").removeEventListener("click",checkRuleOneSave,false);
//         addRule();
//         document.getElementById("add-rule-btn").addEventListener("click", function(){
//             addRule();
//         });
//     }

// }
document.getElementById("add-rule-btn").addEventListener("click", addRule);
//document.getElementById("add-rule-btn").addEventListener("click", checkRuleOneSave);

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
            ruleForm[2].value = "2016-10-13";
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
    ruleForm[2].value = "";

    return newRule;
}