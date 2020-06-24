console.log("ok, from the rpg");

			let animal = inits();
			let beast = runthis();
			let str;
			let str_motion;
			let str_loco;
			let slice;
			let chop;
			let scoop;
			let cuts;

			let i_user = document.getElementById("message");
			let something = i_user.value;
			
			document.getElementById("button").addEventListener('mouseover',	observe);
			document.getElementById("button").addEventListener('mouseout',	look);
		
			
			function observe(){
				analyse(animal);
			//	keeptrack();
				slaughter(animal);
				
				document.getElementById("observer").innerHTML = zombify();
				
				let loot = zombify();
				let myForm = document.getElementById("contact");
				let the_action = beast.concat(loot);
				myForm.action = the_action;
				console.log(myForm);
			}
			
			function look(){
				document.getElementById("observer").innerHTML = "two eyes";
				let myForm = document.getElementById("contact");
				myForm.action = "";
			}
			
			function analyse(input){
				str = input;
				str_motion = str.lastIndexOf(".");
				str_loco = str.indexOf("@");		
			}
			
			function slaughter(input){
				
				slice = str.slice(str_motion+1);
				chop = str.substring(0, str_loco);
				scoop = str.substring(str_loco, str_loco+1)
				cuts = str.slice(str_loco+1, str_motion+1);
				
				document.getElementById("measure0").innerHTML = str;
				document.getElementById("measure1").innerHTML = str_loco;
				document.getElementById("weigh").innerHTML = str_motion;
				
				document.getElementById("tail").innerHTML = slice;
				document.getElementById("head").innerHTML = chop;
				document.getElementById("discard").innerHTML = scoop;
				document.getElementById("servings").innerHTML = cuts;
			}
			
			function zombify(){
				
				let	zombie = chop.concat(scoop).concat(cuts).concat(slice); // + cuts + slice;
				
				document.getElementById("ressurect").innerHTML = zombie;
				
				return zombie;
			}