function Loader(){

	this.name 			= "loader";
	this.gameObjects 	= [];
	this.started 		= false; //si la scene à déjà été commencé

	this.Awake = function(){//sera appelé via new Scene
		console.clear();
		console.log("%c System:Scene " + this.name + " Created!", 'background:#222;color:#bada55');
	}

	this.Start = function(){//sera appelé 
		if(!this.started){
			//set le temps quand le jeux commence - on peut le mettre aussi dans le loader.js
			Time.SetTimeWhenGameBegin();
			//les operations de start
			loadImages();

			/*
				On Charge toutes les scenes 
			*/
			Scenes['Scene1'] = new Scene1();
			Scenes['Scene2'] = new Scene2();

			/* Apres le chargement des scenes on demarre avec la premieère scene  */
			Application.LoadedScene = Scenes['Scene1'];

			this.started = true;//on a fait notre premier passage après update seulement
			console.log("%c System:Scene " + this.name + " Started!", 'background:#222;color:#bada55');
			Time.SetTimeWhenGameLoaded();
		}
		this.Update();
	}
	this.Update = function(){ //mise a jour de jeu pednant qu'il tourne

		if(!Application.GamePaused){//met le jeu en pause met si start est toujours appelé
			for (var i = 0; i < this.gameObjects.length; i++) {
				//this.gameObject[i];
			}
		}
		this.GUI();
	}

	this.GUI = function(){//affichage de l'interface

		if(!Application.GamePaused){

			//show UI

		}else{

			//show pause menu
		}

	}
	this.Awake();
}