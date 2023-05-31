

$("#click").on("click", async function(){
    var link = await getAuthLink();
	window.location.href = link;

});

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

//	flushCookies()

	setIDandToken();

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

async function setIDandToken(){
	const exchange = await getTokenandID();

	document.cookie = "user_id=" + exchange.user_id + ";";
	document.cookie = "token=" + exchange.token + ";";
	document.cookie = "displayName=" + exchange.display_name + ";";
}
// + "&token=" + getCookie("token")
async function getPlaylistInfo(){
	const response = await fetch("https://spotlist.patchyserver.xyz/api/playlists?user_id=" + getCookie("user_id"),{
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
	document.getElementById("username").innerHTML = "Hello " + getCookie("displayName");


}
function flushCookies(){
	
	document.cookie = "displayName=; expires=Thu, 01 Jan 1970 00:00:01 GMT";
	document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"; 
	document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";


}

function getCookie(value){
	var cookieString = document.cookie.substr(document.cookie.indexOf(value));
	
	if( cookieString.indexOf(";") == -1){
		var cookieValue = cookieString.substring(cookieString.indexOf("=") + 1, cookieString.length);
	}
	else{
	var cookieValue = cookieString.substring(cookieString.indexOf("=") + 1, cookieString.indexOf(";"));
	}
	return cookieValue;
	
}

function checkCookie(value){
	const startingIndex = document.cookie.indexOf(value);
	if(startingIndex === -1){

		return false;	
	}
	else{
		return true;
	}
}

