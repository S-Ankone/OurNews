
// ************************
// **** Might be crude ****
// *** but i'm learning ***
// ** and 'hey' it works **
// ************************


console.log("OK, from Add_controller");

document.onload = serveAdverts();

function serveAdverts(){
	//console.log("trying to serve all the ads");
	serveSky();
	serveBox();
//  serveBanner();
}


// Serving out the Skytower Advert
function serveSky(){
	//console.log("trying to serve SkyTower ads");

	// grab the adv_locations
	let skyAdvert = document.querySelectorAll("#sky_adv");
	// grab a random add from the data	&&
    // serve an advert out to the webpage
	skyAdvert[0].innerHTML =  "<img class=\"sky_adv_img\" src=\"/" + randomSky() + "\">";
}

function randomSky(){
	let i = Math.floor(Math.random() * (sky_adverts.length));  // pick a random 'advert'
	toServe = sky_adverts[i];  // Sets a sky advert from the database to 'toServe'
	return toServe;  // return the advert to the main logic to serve it to the html.
}


//Serving out the Box shaped Adverts
function serveBox(){
	//console.log("trying to serve BOX ads");
	
	let boxAdverts = document.querySelectorAll(".adv_box"); 
	for(let i=0; i < boxAdverts.length; i++){
		boxAdverts[i].innerHTML =  "<img class=\"box_adv_img\" src=\"/" + randomBox() + "\">";		
	}
}

function randomBox(){
	let i = Math.floor(Math.random() * (box_adverts.length));  // pick a random 'advert'
	toServe = box_adverts[i];  // Sets a sky advert from the database to 'toServe'
	return toServe;  // return the advert to the main logic to serve it to the html.
}

function serveBanner(){
	//console.log("trying to serve banner ads");
	
	let bannerAdverts = document.querySelectorAll(".ban_box");
	for(let i=0; i< bannerAdverts.length; i++){
		boxAdverts[i].innerHTML = "<img class=\"ban_adv_img\" src=\"/" + randomBan() + "\">";
	}
}

function randomBan(){
	let i = Math.floor(Math.random() * (ban_adverts.length));
	toServe = ban_adverts[i];
	return toServe;
}