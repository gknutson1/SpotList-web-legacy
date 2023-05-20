

$("#click").on("click", async function(){
    var link = await getAuthLink();
	window.location.href = link;

});


//get code and state from callack url DONE
//send them to the /exchange/
//recieves token and user name
//get the actual playlist using get temp playlist
//display playlist using jsons

async function getAuthLink(){
    
	const response = await fetch("https://spotlist.patchyserver.xyz/api/auth", {
	method: 'GET',
	headers: {
		'Accept': 'application/json',
  		'Content-Type': 'application/json'
	}
	}).catch((error)=>{
		console.error('Error:',error);
	})
	return response.json();
}

var code;
var state;


/*
getCodeAndState() return the user's code and state for usage in /exchange route. THis is is only
called within the callback.html will is just an intermediate URL
*/
function getCodeAndState(){

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	code = urlParams.get('code');
	state = urlParams.get('state');
	window.location.href = "/index";

}