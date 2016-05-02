function Rectangle(x,y,w,h,c){
	this.name 		= "Rectangle";
	this.enabled 	= true;//elements qui sont activé/desactivé
	this.started 	= false;
	this.renderer 	= true;

	this.frameHovered = 0;

	this.Transform = {
		position: new Vector(),
		size:new Vector(),
		scale:new Vector(),
		pivot:new Vector()//dans le cas du scale de l'image
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

	this.setPosition = function(x,y){
		this.Transform.position.x = x;
		this.Transform.position.y = y;
		if(!this.Physics.colliderIsSameSizeAsTransform){
			this.Physics.BoxCollider.position.x = this.Transform.position.x;
			this.Physics.BoxCollider.position.y = this.Transform.position.y;
		}
	}
	this.setSize = function(x,y){
		this.Transform.size.x = x;
		this.Transform.size.y = y;
		if(!this.Physics.colliderIsSameSizeAsTransform){
			this.Physics.BoxCollider.size.x = this.Transform.size.x;
			this.Physics.BoxCollider.size.y = this.Transform.size.y;
		}
	}
	this.setScale = function(x,y){
		this.Transform.scale.x = x;
		this.Transform.scale.y = y;
		if(!this.Physics.colliderIsSameSizeAsTransform){
			this.Physics.BoxCollider.scale.x = this.Transform.scale.x;
			this.Physics.BoxCollider.scale.y = this.Transform.scale.y;
		}
	}
	this.setPivot = function(x,y){
		this.Transform.pivot.x = x;
		this.Transform.pivot.y = y;
		if(!this.Physics.colliderIsSameSizeAsTransform){
			this.Physics.BoxCollider.pivot.x = this.Transform.pivot.x;
			this.Physics.BoxCollider.pivot.y = this.Transform.pivot.y;
		}
	}


	this.Awake = function(){
		console.clear();
		console.log("%c System:GameObject " + this.name + " Created!", 'background:#ACCE55;color:#B000B5')
	}
	this.Start = function(){
		if(!this.started){
			//les operations de start

/*			this.Physics.BoxCollider.position.x = x;
			this.Physics.BoxCollider.position.y = y;
			this.Physics.BoxCollider.size.x = x;
			this.Physics.BoxCollider.size.y = y;*/

			this.Transform.position.x = x;
			this.Transform.position.y = y;
			this.Transform.size.x = w;
			this.Transform.size.y = h;
			this.Transform.pivot.x = 0.5;
			this.Transform.pivot.y = 0.5;

			if(this.Physics.colliderIsSameSizeAsTransform){
				this.Physics.BoxCollider = this.Transform;
			}

			if(this.Transform.size == this.Physics.BoxCollider.size){
				if(this.Transform.size.y == this.Physics.BoxCollider.size.y){
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
		ctx.fillStyle = c;
		ctx.fillRect(
			this.Physics.BoxCollider.position.x,
			this.Physics.BoxCollider.position.y,
			this.Physics.BoxCollider.size.x,
			this.Physics.BoxCollider.size.y
		);
		
		this.GUI();
	}
	this.GUI = function(){//ex: barre de vie sur l'object (personnage)

	}
	this.OnClicked = function(){
		this.frameHovered++;

/*		this.current = {x:0,y:0}
		if(this.Physics.dragAndDroppable && this.Physics.Clickable){
			Input.DraggedElement = true;
			console.log(this.Transform.position.x);
			console.log(this.Transform.position.y);
			console.log(this.Transform.size.x);
			console.log(this.Transform.size.y);

			if(Input.MousePosition.x >= this.Transform.position.x && Input.MousePosition.x <= (this.Transform.position.x + this.Transform.size.x) ){
				if(Input.MousePosition.y >= this.Transform.position.y && Input.MousePosition.y <= (this.Transform.position.y + this.Transform.size.y)){
					this.current.x = Input.MousePosition.x;
					this.current.y = Input.MousePosition.y;
					
				}
			}
			this.Transform.position.x = Input.MousePosition.x;
			this.Transform.position.y = Input.MousePosition.y;
		}*/
	}
	this.OnHovered = function(){
		this.frameHovered++;
	}
	this.OnUnhovered = function(){
		this.frameHovered = 0;
	}

	this.Awake();
}