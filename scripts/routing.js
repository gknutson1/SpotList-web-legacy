

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
	setTimeout(function(){
		window.location.href = "/userview";
	}, 1000);
	

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
	document.getElementById("username").innerHTML = getCookie("displayName");


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

document.getElementById("create-playlist").addEventListener("click", function(){
	getPlaylist()});

 async function getPlaylist(){

	 const playlistInfo = document.getElementById("playlist-creation-info").elements;
	 const artistInfo = document.getElementById("rules-creation").elements;

	const nameArtist =  playlistInfo[0].value;
	const nameDescription = playlistInfo[1].value;	
	const nameVis = playlistInfo[2].value;	

	 const artistName = artistInfo[0].value;
	 const filter = artistInfo[1].value;


	let artistID = await getID(artistName, filter);
 
	document.getElementById("artist_id").innerHTML = artistID;

};

async function getID(artist_name, type){
	const artist = await getPlaylistInfo2(artist_name, type).then(res => {return res.artists[0].spotify_id});
	return artist
}

async function getPlaylistInfo2(artist_name, type){
	const response = await fetch("https://spotlist.patchyserver.xyz/api/search?types=" + type + "&query=" + artist_name + "&limit=1&offset=0",{
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'user-id': getCookie("user_id"),
			'token': getCookie("token")
		}
	}).catch((error)=>{
		console.error('Error:',error);
	})
	return response.json();
}
