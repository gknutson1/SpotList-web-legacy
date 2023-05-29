

document.getElementById("connect").addEventListener("click",async function(){
    var link = await getAuthLink();
	window.location.href = link;

} );



document.getElementById("home-button").addEventListener("click", function(){
    window.location = "index.html";
});

document.getElementById("confirmSearch").addEventListener("click", function(){
    console.log("hello world");
});