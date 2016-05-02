function Scene1(){

	this.name 			= "Scene1";
	this.gameObjects 	= [];
	this.started 		= false; //si la scene à déjà été commencé

	this.Awake = function(){//sera appelé via new Scene
		console.clear();
		console.log("%c System:Scene " + this.name + " Created!", 'background:#222;color:#bada55');
	}

	this.Start = function(){//sera appelé 
		if(!this.started){
			//les operations de start
			Time.SetTimeWhenSceneBegin();
			this.started = true;//on a fait notre premier passage après update seulement

			//this.gameObjects.push(new Rectangle(150,150,75,75,'yellow'));
			this.gameObjects.push(new Character());


			console.log("%c System:Scene " + this.name + " Started!", 'background:#222;color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function(){ //mise a jour de jeu pednant qu'il tourne		
		//ctx.fillStyle = "red";
		//ctx.fillRect(0, 0, canvas.width, canvas.height);

		Physics.CheckClick();
		

		if(!Application.GamePaused){//met le jeu en pause met si start est toujours appelé
			for (var i = 0; i < this.gameObjects.length; i++) {
				this.gameObjects[i].Start();
			}
		}
/*		if (Application.isDebug) {
			Debug.Scene();
		}*/
		this.GUI();
	}

	this.GUI = function(){//affichage de l'interface

		if(!Application.GamePaused){

			//show UI
			Debug.showStat();
			Debug.gameObjectStat();

		}else{

			//show pause menu
		}

	}

	this.Awake();
}