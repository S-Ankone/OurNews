console.log("ok, from general.js");

/* 	Unfortunately Node.js seems to cut off a lot of front end JavaScript DOM manipulation.
	While it makes all that was hard in html/js (include of partials, database funct) fairly
	easy. It also makes everything that was 'easy', into a big pain in the *. To me this 
	makes Node/Express fairly unuseable in a simple application setting with a high demand
	for interactivity on the user side.

	IF you are the reader of this, and know a bit about coding, you can turn the script
	below on and see what i mean by then clicking on the left menu options ... 


let categories = document.getElementsByClassName('c_select');

for(i=0; i<categories.length; i++){
	categories[i].addEventListener('click', addActive);
}

function addActive(){
		let current = document.getElementsByClassName('c_active');

	if(current.length > 0){
      current[0].className = current[0].className.replace(" active", "");		
	}
	
	this.className += ' c_active';
}

*/