/**	**** Create a new Scene **** 
*
*	@step 1							Copy the content of this file in a new .js document.
*   ----------------------------------------------------------------------------------------------------------------------------
*	@step 2							Save the new file in Assets/Javascript/Scenes/NameOfYourScene.js .
*   ----------------------------------------------------------------------------------------------------------------------------
*	@step 3                      	In the index.html add below this comment <!-- Scene --> the line: 
*                    "<script type="text/javascript" src="Assets/Scripts/Javascript/Scenes/NameOfYourGameObject.js"></script>"
*	----------------------------------------------------------------------------------------------------------------------------
*	@step 4						    For create a new scene, use this instruction: "new Scene()".
*/

/*	**** How to make the setup of a Scene ****
*	
*	@property name 																											{string} 			 
*	The name of the scene.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@property GameObjects 																				   {array[GameObject1, ...]} 			 
*	All the GameObject of the scene	
*
*/

/*	**** Scene's Methods ****
*
*	@method Awake()									
*	Called at the instruction new Scene().
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method Start()									
*	Called at the first use of scene in game.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method Update()								
*	Called each frame,code game is here.
*	--------------------------------------------------------------------------------------------------------------------------------
*	@method GUI()
*	Called each frame, code all the GUI here.
*/

/* **** For launch Scene ****
*
*	To load your scene, use this instruction: "Application.LoadLevel(LevelName)".
*/
function Scene1() {
	this.name = "Scene1";
	this.GameObjects =[];
	this.Groups = [];

	this.started = false;

	this.Awake = function() {
		//console.clear();
		console.log('%c System:Scene ' + this.name + " Created !", 'background:#222; color:#bada55');

	}
	this.Start = function() {
		if (!this.started) {
			Time.SetTimeWhenSceneBegin();
			// operation start
			this.started = true;

			//this.GameObjects.push(new Character());
			//this.GameObjects.push(new AlphaMask());
			//Grid.init(10,10,40);
			//Grid.getPathFinding();



/*			var g = new Group("testGroup", new Vector(50,50) );
			var g2 = new Group("testGroup2", new Vector(300,300) );
			g2.AddGameObject(g);
			this.Groups.push(g2);
			g.Transform.relativeScale = new Vector(0.75,0.75);
			g2.Transform.relativeScale = new Vector(0.75,0.75);
			g.AddGameObject(new Child(0,0));
			g.AddGameObject(new Child(100,0));*/

			this.GameObjects.push(new Child(600,120));
			this.GameObjects.push(new Child(10,250));
			this.GameObjects.push(new Child(1500,250));

			

			var config = {
				id:1,
				name:"Cam1",
				bg:'lightgreen',
				position:new Vector(0,0),
				size:new Vector(512, canvas.height)
			}
			this.cam1 = new Camera(config);
			var config2 = {
				id:2,
				name:"Cam2",
				filter:'Greyscale',
				bg:'yellow',
				position:new Vector(512,0),
				size:new Vector(canvas.width, canvas.height)
			}
			this.cam1 = new Camera(config);
			this.cam2 = new Camera(config2);
			console.log(this.cam1 );
			console.log(this.cam2 );
			this.GameObjects.push(new Character(10,200));
		

			console.log('%c System:Scene ' + this.name + " Started !", 'background:#222; color:#bada55');
			Time.SetTimeWhenSceneLoaded();
		}
		this.Update();
	}
	this.Update = function() {
		if (!Application.GamePaused) {

			this.cam1.createWindow();
			this.cam2.createWindow();
			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Start();
			}
			for (var i = 0; i < this.Groups.length; i++) {
				this.Groups[i].Start();
			}


		}
		if(Input.KeysDown[39]){
			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Transform.relativePosition.x -= 5;
			}
		}
		if(Input.KeysDown[37]){
			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Transform.relativePosition.x += 5;
			}
		}

		if(Input.KeysDown[38]){
			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Transform.relativePosition.y -= 5;
			}
		}
		if(Input.KeysDown[40]){
			for (var i = 0; i < this.GameObjects.length; i++) {
				this.GameObjects[i].Transform.relativePosition.y += 5;
			}
		}

		//Input.MouseDown();
//		Grid.draw();
		// Grid.click();

		this.GUI();
	}
	this.GUI = function() {
		if (!Application.GamePaused) {
			//Show UI
		} else {
			// Show pause menu
		}
	}

	this.Awake()
}