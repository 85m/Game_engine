function Character(x,y,w,h,c){
	this.name 		= "Character";
	this.enabled 	= true;//elements qui sont activé/desactivé
	this.started 	= false;
	this.renderer 	= true;

	this.frameHovered = 0;

	this.Transform = {};
	this.Transform.position = new Vector(0,0);
	this.Transform.size = new Vector(256,320);
	this.Transform.scale = new Vector(1,1);
	this.Transform.pivot = new Vector(0.5,0.5);

	this.Renderer = {
		
		isVisible:true,//si le sprite est visible
		isPriteSheet:true, //si c'est un sprite (image a decoupe), ca peut etre une image
		that:this.Transform,
		Material:{
			Source:'',
			SizeFrame: new Vector(64,80),//taille d'une frame (1 taille d'animation)
			CurrentFrame: new Vector(0,0)
		},

		AnimationCount: 0,

		Draw:function(){
			if(this.isPriteSheet){
				if (this.Animation.animated) {	
					if (this.AnimationCount > this.Animation.totalAnimationLength/this.Animation.current.length) {
						this.Animation.currentIndex++ ;
						this.AnimationCount = 0 ;
						if (this.Animation.currentIndex > this.Animation.current.length-1) {
							this.Animation.currentIndex = 0;
						}
					}
					this.AnimationCount += Time.DeltaTime ;
				}else {
					this.AnimationCount = 0;
					this.Animation.currentIndex = 0;
				}

				console.log(this.Animation.current[0]);
				//this.Material.CurrentFrame = this.Animation.current[this.Animation.currentIndex];

				var scaledSizeX = this.that.size.x*this.that.scale.x;
				var scaledSizeY = this.that.size.y*this.that.scale.y;
				//console.log(this);
				ctx.drawImage(this.Material.Source,
								this.Material.CurrentFrame.x,
								this.Material.CurrentFrame.y,
								this.Material.SizeFrame.x,
								this.Material.SizeFrame.y,
								this.that.position.x-this.that.pivot.x*scaledSizeX,
								this.that.position.y-this.that.pivot.y*scaledSizeY,
								scaledSizeX,
								scaledSizeY
				);
			}else{
				ctx.drawImage(
							this.Material.Source,
							this.that.position.x - this.that.pivot.x * (this.that.size.x * this.that.scale.x), //scale par rapport a la nouvelle taille
							this.that.position.y - this.that.pivot.y * (this.that.size.y * this.that.scale.y),
							this.that.size.x * this.that.scale.x,
							this.that.size.y * this.that.scale.y
				);
			}

		},
		Animation:{
			animated:true,
			animations:[],//tableau d'animation
			current:[],//current frame du sprite
			currentIndex:0,
			totalAnimationLength: 0.5

		}
	}

	this.Physics = {
		enabled:true,
		Clickable:true,
		dragAndDroppable:true,
		colliderIsSameSizeAsTransform:true,
		BoxCollider:{
			position: new Vector(),
			size: new Vector()
		}

	}

	this.Awake = function(){
		console.clear();
		console.log("%c System:GameObject " + this.name + " Created!", 'background:#ACCE55;color:#B000B5');



/*		this.Transform.position.x 	= 0;
		this.Transform.position.y 	= 0;
		this.Transform.size.x 		= 256;
		this.Transform.size.y 		= 320;
		this.Transform.scale.x 		= 1;
		this.Transform.scale.y 		= 1;
		this.Transform.pivot.x 		= 0.5;
		this.Transform.pivot.y 		= 0.5;


		this.Renderer.Material.Source = Images['roxas'];

		this.Renderer.Material.SizeFrame.x = 64;
		this.Renderer.Material.SizeFrame.y = 80;

		this.cpt = this.Renderer.Animation.init;

		for (var y = 0; y < 4; y++) {
			var tmpArray = [];
			for (var x = 0; x < 4; x++) {
				tmpArray.push(
					{
						y: y * this.Renderer.Material.SizeFrame.y,
						x: x * this.Renderer.Material.SizeFrame.x
					});
				
			}
			this.Renderer.Animation.animations.push(tmpArray);
		}
		this.Renderer.Animation.totalAnimationLength = 100;
		this.Renderer.Animation.current = this.Renderer.Animation.animations[0];
		console.log(this.Renderer.Animation.animations);*/


		
	}
	this.Start = function(){
		if(!this.started){
			//les operations de start

/*			this.Physics.BoxCollider.position.x = x;
			this.Physics.BoxCollider.position.y = y;
			this.Physics.BoxCollider.size.x = x;
			this.Physics.BoxCollider.size.y = y;*/

/*			this.Transform.position.x = x;
			this.Transform.position.y = y;
			this.Transform.size.x = w;
			this.Transform.size.y = h;*/

/*			if(this.Physics.colliderIsSameSizeAsTransform){
				this.Physics.BoxCollider = this.Transform;
			}*/

			
			//console.log(this.Transform);
			//this.Renderer.Draw();

/*			if(this.Transform.size == this.Physics.boxCollider.size){
				if(this.Transform.size.y == this.Physics.boxCollider.size.y){
					this.Physics.colliderIsSameSizeAsTransform = true;
				}
			}*/

			this.started = true;//on a fait notre premier passage après update seulement

			var img = Images['roxas'];
			console.log(img);
			this.Renderer.Material.Source = img;
			this.Renderer.Material.CurrentFrame = new Vector(0,0);
			for (var i = 0; i < img.height; i+=this.Renderer.Material.SizeFrame.y) {
				var array = [];
				for (var j = 0; j < img.width; j+=this.Renderer.Material.SizeFrame.x) {
					array.push(new Vector(j,i));

				}
				this.Renderer.Animation.animations.push(array);
			}
			this.Renderer.Animation.current = this.Renderer.Animation.animations[0];
			console.log(this.Renderer.Animation.animations);

/*			this.Transform.position.x 	= 0;
			this.Transform.position.y 	= 0;
			this.Transform.size.x 		= 256;
			this.Transform.size.y 		= 320;
			this.Transform.scale.x 		= 1;
			this.Transform.scale.y 		= 1;
			this.Transform.pivot.x 		= 0.5;
			this.Transform.pivot.y 		= 0.5;*/

			console.log("%c System:GameObject " + this.name + " Started!", 'background:#ACCE55;color:#B000B5');

			//console.log(this.Physics.colliderIsSameSizeAsTransform);
		}
		this.Update();
	}
	this.Update = function(){

/*		if (this.enabled) {
			if (Input.KeysDown[37] || Input.KeysDown[38] || Input.KeysDown[39] || Input.KeysDown[40]) {
				this.Renderer.Animation.animated = true;
				if (Input.KeysDown[37]) {
					//this.Transform.scale.sub(new Vector(0.1,0.1));
					this.Renderer.Animation.current = this.Renderer.Animation.animations[1];
				}
				if (Input.KeysDown[38]) {
					//this.Transform.scale.sub(new Vector(0.1,0.1));
					this.Renderer.Animation.current = this.Renderer.Animation.animations[3];
				}
				if (Input.KeysDown[39]) {
					//this.Transform.scale.add(new Vector(0.1,0.1));
					this.Renderer.Animation.current = this.Renderer.Animation.animations[2];
				}
				if (Input.KeysDown[40]) {
					//this.Transform.scale.sub(new Vector(0.1,0.1));
					this.Renderer.Animation.current = this.Renderer.Animation.animations[0];
				}
			} else {
				this.Renderer.Animation.animated = false;
			}
			this.Renderer.Draw();
		}*/



/*		ctx.beginPath();
		ctx.fillStyle = c;
		ctx.fillRect(
			this.Physics.BoxCollider.position.x,
			this.Physics.BoxCollider.position.y,
			this.Physics.BoxCollider.size.x,
			this.Physics.BoxCollider.size.y
		);*/
		
		this.GUI();
	}
	this.GUI = function(){//ex: barre de vie sur l'object (personnage)

	}
	this.OnClicked = function(){
		this.frameHovered++;

		this.current = {x:0,y:0}
		if(this.Physics.dragAndDroppable && this.Physics.Clickable){
			Input.DraggedElement = true;
/*			console.log(this.Transform.position.x);
			console.log(this.Transform.position.y);
			console.log(this.Transform.size.x);
			console.log(this.Transform.size.y);*/

/*			if(Input.MousePosition.x >= this.Transform.position.x && Input.MousePosition.x <= (this.Transform.position.x + this.Transform.size.x) ){
				if(Input.MousePosition.y >= this.Transform.position.y && Input.MousePosition.y <= (this.Transform.position.y + this.Transform.size.y)){
					this.current.x = Input.MousePosition.x;
					this.current.y = Input.MousePosition.y;
					
				}
			}*/
			console.log(this.current);
			this.Transform.position.x = Input.MousePosition.x;
			this.Transform.position.y = Input.MousePosition.y;
		}
	}
	this.OnHovered = function(){
		this.frameHovered++;
	}
	this.OnUnhovered = function(){
		this.frameHovered = 0;
	}

	this.Awake();
}