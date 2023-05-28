

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
var urlParams;

/*
getCodeAndState() return the user's code and state for usage in /exchange route. THis is is only
called within the callback.html will is just an intermediate URL
*/
async function getCodeAndState(){

	const queryString = window.location.search;
	urlParams = new URLSearchParams(queryString);

	code = urlParams.get('code');
	state = urlParams.get('state');
	setIDandToken();
	var playlist = await getPlaylistInfo();
	console.log(playlist);
	window.location.href = "/userview";

}
var newURL;
async function getTokenandID(){
	newURL = "https://spotlist.patchyserver.xyz/api/exchange?code=" + code + "&state=" + state;
	const response = await fetch(newURL,{
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Accept': 'application/json'
		}
	}).catch((error)=>{
		console.error('Error:',error);
	})
	return response.json();
}


var user_id;
var token;
var username;

async function setIDandToken(){
	const exchange = await getTokenandID();
	user_id = exchange.user_id;
	document.cookie = "user_id=" + exchange.user_id + ";";
	token = exchange.token;
	document.cookie = "token=" + exchange.token + ";";
	username = exchange.display_name;
	document.cookie = "username=" + exchange.username + ";";

}

async function getPlaylistInfo(){
	const response = await fetch("https://spotlist.patchyserver.xyz/api/temp/playlists?user_id=" + user_id + "&token=" + token,{
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Accept': 'application/json'
		}
	}).catch((error)=>{
		console.error('Error:',error);
	})
	return response.json();
}

function displayUsername(){
	document.getElementById("username").innerHTML = "Hello " + username;


}


