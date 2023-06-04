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
            ruleForm[2].value = "";

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

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.addEventListener("click", function(){
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", function() {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(e){
  if(e.target == modal) {
    modal.style.display = "none";
  }
});