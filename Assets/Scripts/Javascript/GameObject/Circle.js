function Circle(x,y,r,c){
	this.name 		= "Circle";
	this.enabled 	= true;//elements qui sont activé/desactivé
	this.started 	= false;

	this.frameHovered = 0;

	this.Transform = {
		position: new Vector(),
		size:new Vector()
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
	}
	this.Start = function(){
		if(!this.started){
			//les operations de start

			if(this.Transform.size.x == this.Physics.boxCollider.size.x){
				if(this.Transform.size.y == this.Physics.boxCollider.size.y){
					this.Physics.colliderIsSameSizeAsTransform = true;
				}
			}
			this.started = true;//on a fait notre premier passage après update seulement
			console.log("%c System:GameObject " + this.name + " Started!", 'background:#ACCE55;color:#B000B5');

			//console.log(this.Physics.colliderIsSameSizeAsTransform);


		}
		this.Update();
	}
	this.Update = function(){

		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2 * Math.PI, false);
		ctx.fillStyle = c;
		ctx.fill();

		this.GUI();
	}
	this.GUI = function(){//ex: barre de vie sur l'object (personnage)

	}
	
	this.OnClicked = function(){
		this.frameHovered++;
		console.log('click');
	}
	this.OnHovered = function(){
		this.frameHovered++;
		console.log('hover');
	}
	this.OnUnhovered = function(){
		this.frameHovered = 0;
		console.log('un hover');
	}

	this.Awake();
}