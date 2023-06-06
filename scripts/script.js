
document.getElementById("home-button").addEventListener("click", function () {
    window.location = "/index";
});


document.getElementById("add-rule-btn").addEventListener("click", addRule);
//document.getElementById("add-rule-btn").addEventListener("click", checkRuleOneSave);

applyListeners(document.getElementById("rule-one"));

function addRule() {
    const ruleTemp = document.getElementById("rule-one");

    let newRule = ruleTemp.cloneNode("true");
    newRule = cleanClone(newRule);

    document.getElementById("rules-list").insertBefore(newRule, document.getElementById("add-rule-btn"));
    newRule.scrollIntoView();
}

function applyListeners(rule) {

    const ruleForm = rule.childNodes[1].elements;

    ruleForm[1].addEventListener("change", function () {
        if (ruleForm[1].value.match(/.Date$/)) {
            ruleForm[2].type = "date";
            ruleForm[2].value = "2016-10-13";
        }
        else {
            ruleForm[2].type = "text";
            ruleForm[2].value = "";

        }
    });

    ruleForm[2].addEventListener("keypress", async function (e) {
        if (e.key === "Enter") {
            e.preventDefault();

            const searchResults = await search(ruleForm[2].value, ruleForm[1].value);
            displayResults(ruleForm, searchResults);
            document.getElementById("search-results").style.display = "block"

        }
    })

    ruleForm[3].addEventListener("click", function () {
        ruleForm[0].disabled = true;
        ruleForm[1].disabled = true;
        ruleForm[2].disabled = true;
        ruleForm[3].disabled = true;
        ruleForm[4].disabled = false;
        rule.childNodes[1].style.borderColor = "green";


    });
    ruleForm[4].addEventListener("click", function () {
        ruleForm[0].disabled = false;
        ruleForm[1].disabled = false;
        ruleForm[2].disabled = false;
        ruleForm[3].disabled = false;
        ruleForm[4].disabled = true;
        rule.childNodes[1].style.borderColor = "blue";


    });

}

function generateRule() {

}
/*
CleanClone() will clean clone of orignal first rule.
*/
function cleanClone(newRule) {
    const ruleForm = newRule.childNodes[1].elements;
    applyDeleteFilter(newRule);
    ruleForm[0].options[1].disabled = false;
    newRule.removeAttribute("id");
    applyListeners(newRule);
    ruleForm[1].options[1].selected = true;
    ruleForm[2].type = "text";
    ruleForm[2].value = "";
    ruleForm[5].disabled = false;
    ruleForm[0].disabled = false;
    ruleForm[1].disabled = false;
    ruleForm[2].disabled = false;

    ruleForm[3].disabled = false;
    ruleForm[4].disabled = true;

    newRule.childNodes[1].style.borderColor = "";

    return newRule;
}

function applyDeleteFilter(rule) {
    rule.childNodes[1].elements[5].addEventListener("click", function () {
        rule.remove();
    })
}

async function search(searchTerm, type) {
    const response = await fetch("https://spotlist.patchyserver.xyz/api/search?types=" + type + "&query=" + searchTerm + "&limit=25&offset=0", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'user-id': getCookie("user_id"),
            'token': getCookie("token")
        }
    }).catch((error) => {
        console.error('Error:', error);
    })
    return response.json();
}

var modal = document.getElementById("search-results");

var span = document.getElementsByClassName("close")[0];



span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function displayResults(form, resultsJson) {
    document.getElementById("results").innerHTML = "";

    if (form[1].value === "artist") {
        displayArtists(form, resultsJson.artists);
    }
    if (form[1].value === "playlist") {
        displayPlaylists(form, resultsJson.playlists);
    }
    if (form[1].value === "album") {
        displayAlbums(form, resultsJson.albums);
    }
    if (form[1].value == "track") {
        displayTracks(form, resultsJson.tracks);
    }
}


function displayArtists(form, artistJson) {
    for (i = 0; i < artistJson.length; i++) {

        const artist = {
            image: artistJson[i].images[0],
            name: artistJson[i].name,
            url: artistJson[i].spotify_url,
            id: artistJson[i].spotify_id,
            followers: artistJson[i].followers
        }

        addArtistToSearchResults(form, artist);

    }
}

function displayPlaylists(form, playlistJson) {
    for (i = 0; i < playlistJson.length; i++) {

        const playlist = {
            image: playlistJson[i].images[0],
            name: playlistJson[i].name,
            url: playlistJson[i].spotify_url,
            id: playlistJson[i].spotify_id,
            total_tracks: playlistJson[i].total_tracks
        }

        addPlaylistToSearchResults(form, playlist);

    }
}

function displayTracks(form, trackJson) {
    for (i = 0; i < trackJson.length; i++) {

        const track = {
            image: trackJson[i].album.images[0],
            name: trackJson[i].name,
            url: trackJson[i].spotify_url,
            id: trackJson[i].spotify_id,
            artistName: trackJson[i].artists[0].display_name
        }

        addTrackToSearchResults(form, track);

    }
}

function displayAlbums(form, albumJson) {
    for (i = 0; i < albumJson.length; i++) {

        const album = {
            image: albumJson[i].images[0],
            name: albumJson[i].name,
            url: albumJson[i].spotify_url,
            id: albumJson[i].spotify_id,
            total_tracks: albumJson[i].total_tracks
        }

        addAlbumToSearchResults(form, album);

    }
}

function addPlaylistToSearchResults(form, playlist) {
    const searchResults = document.getElementById("results");

    const result = document.createElement("div");
    result.classList.add("result");

    const cover = createCoverImg(playlist);
    const mainName = createMainName(playlist);
    const id = createSpotifyID(playlist);
    const total_tracks = createTotalTracks(playlist);
    const selectBtn = createSelectBtn(form, playlist);

    result.append(cover, mainName, total_tracks, id, selectBtn);

    searchResults.append(result);

}

function addArtistToSearchResults(form, artist) {
    const searchResults = document.getElementById("results");

    const result = document.createElement("div");
    result.classList.add("result");

    const cover = createCoverImg(artist);
    const mainName = createMainName(artist);
    const id = createSpotifyID(artist);
    const followers = createFollowers(artist);
    const selectBtn = createSelectBtn(form, artist);

    result.append(cover, mainName, followers, id, selectBtn);

    searchResults.append(result);

}

function addAlbumToSearchResults(form, album) {
    const searchResults = document.getElementById("results");

    const result = document.createElement("div");
    result.classList.add("result");

    const cover = createCoverImg(album);
    const mainName = createMainName(album);
    const id = createSpotifyID(album);
    const total_tracks = createTotalTracks(album);
    const selectBtn = createSelectBtn(form, album);

    result.append(cover, mainName, total_tracks, id, selectBtn);

    searchResults.append(result);

}

function addTrackToSearchResults(form, track) {
    const searchResults = document.getElementById("results");

    const result = document.createElement("div");
    result.classList.add("result");

    const cover = createCoverImg(track);
    const mainName = createMainName(track);
    const id = createSpotifyID(track);
    const artistName = createArtistName(track);
    const selectBtn = createSelectBtn(form, track);

    result.append(cover, mainName, artistName, id, selectBtn);

    searchResults.append(result);

}


function createSpotifyID(json) {
    const id = document.createElement("p")
    id.textContent = "Spotify ID: " + json.id;
    id.classList.add("searchID", "searchElement");
    return id;
}

function createCoverImg(json) {
    const img = document.createElement("img");
    if (json.image == "undefined") {
        img.src = "images/undefined-img.jpeg"
    }
    else {
        img.src = json.image;
    }
    img.classList.add("searchIMG", "searchElement");

    return img;
}

function createMainName(json) {
    const name = document.createElement("a");
    name.innerHTML = json.name;
    name.href = json.url;
    name.target = "_blank";
    name.classList.add("searchName", "searchElement");

    return name;
}

function createSelectBtn(form, json) {
    const selectBtn = document.createElement("button");
    selectBtn.classList.add("selectBtn", "searchElement");
    selectBtn.textContent = "+";

    selectBtn.addEventListener("click", function () {
        form[2].value = json.name + " (" + json.id + ")";
        modal.style.display = "none";

    });

    return selectBtn;
}

function createTotalTracks(json) {
    const total_tracks = document.createElement("p");
    total_tracks.textContent = "Tracks: " + json.total_tracks;
    total_tracks.classList.add("searchTotalTracks", "searchElement");
    return total_tracks;
}

function createFollowers(json) {
    const followers = document.createElement("p");
    followers.textContent = "Followers: " + json.followers;
    followers.classList.add("searchFollowers", "searchElement");

    return followers;
}

function createArtistName(json) {
    const artistName = document.createElement("p");
    artistName.textContent = json.artistName;
    artistName.classList.add("searchFollowers", "searchElement");

    return artistName;
}

document.getElementById("generate-playlist").addEventListener("click", generatePlaylist);


async function generatePlaylist(){
    const form = document.getElementById("playlist-creation-info");

	let vis;
	if (form.elements[2].value === "true") {
		vis = true;
	}
	else {
		vis = false;
	}

    const playlistInfo = {
        name: form.elements[0].value,
        public: vis,
        description: form.elements[1].value,

    }

    const playlist_id = await createBlankPlaylist(playlistInfo);

    const rules = collectRules();

    document.getElementById("playlist-status").innerHTML = "Please Hold While Playlist is Generating";
	document.getElementById("loading-animation").removeAttribute("hidden");

    await applyRules(playlist_id.playlist_id, rules);
    await buildPlaylist(playlist_id.playlist_id);
    document.getElementById("playlist-link").href= playlist_id.url;
    document.getElementById("playlist-link").innerHTML = form.elements[0].value;
	document.getElementById("playlist-status").innerHTML = "Playlist Created! Enjoy :)";
	document.getElementById("loading-animation").setAttribute("hidden", "hidden");

}

function collectRules(){
    const rulesList = document.getElementsByClassName("rule");
    const rulesFormatted = [];

    for(i = 0; i < rulesList.length - 1; i++){

        let data = rulesList[i].childNodes[1].elements[2].value;
        data = data.substring(
            data.indexOf('(') + 1,
            data.indexOf(')'));

        let is_add;


        let type = rulesList[i].childNodes[1].elements[1].value;

        if(type === "artist"){
            type = "Artist"
        }

        if(rulesList[i].childNodes[1].elements[0] == "add"){
            is_add = true;
        }
        else{
            is_add = false;
        }

        const ruleFormatted = {
            type: type,
            data: data,
            is_add: is_add
        }

        rulesFormatted.push(ruleFormatted);

    }

    return rulesFormatted;

}

async function createBlankPlaylist(playlist_info){
    const response = await fetch("https://spotlist.patchyserver.xyz/api/playlist",{
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-type': 'application/json',
			'user-id': getCookie("user_id"),
			'token': getCookie("token")
		},
		body:
			JSON.stringify(playlist_info)


	}).catch((error) => {
		console.error('Error:', error);
	});

	return response.json();
}

async function applyRules(p_id, rules){
    await fetch("https://spotlist.patchyserver.xyz/api/playlist/" + p_id + "/rules", {
        method: 'PUT',
		headers: {
			'Accept': '*/*',
			'Content-type': 'application/json',
			'user-id': getCookie("user_id"),
			'token': getCookie("token")
		},
		body:
			JSON.stringify(rules)
    });
}

async function buildPlaylist(p_id){
    await fetch("https://spotlist.patchyserver.xyz/api/build/" + p_id, {
        method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'user-id': getCookie("user_id"),
			'token': getCookie("token")
		}
    });
}
