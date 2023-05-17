

$("#click").on("click", async function(){
    var link = await getAuthLink();
	window.location.href = link;

});


//get code and state from callack url
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