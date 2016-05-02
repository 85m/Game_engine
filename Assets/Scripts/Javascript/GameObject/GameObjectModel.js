function GameObject(){
	this.name 		= "Model";
	this.enabled 	= true;//elements qui sont activé/desactivé
	this.started 	= false;
	this.renderer 	= true;

	this.frameHovered = 0;

	this.Transform = {
		position: new Vector(),
		size:new Vector()
	}

	this.renderer = {
		that:this.Transform,
		Material:{
			Source:''
		},
		Draw:function(){
			ctx.drawImage(	this.Material.Source,
							this.that.position.x,
							this.that.position.y,
							this.that.size.x,
							this.that.position.y);
		}
	}


	this.Physics = {
		enabled:true,
		clickable:true,
		dragAndDroppable:false,
		colliderIsSameSizeAsTransform:false,
		boxCollider:{
			position: new Vector(),
			size: new Vector()
		}

	}

	/*
	VECTEUR = angle, magnitude
	JV
	V = (x,y)

	P(prime) = P(pos depart) + V
	P(prime) = Px+Vx + Py+Vy
	*/

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
		if(this.enabled){
			
		}
		this.GUI();
	}
	this.GUI = function(){//ex: barre de vie sur l'object (personnage)

	}

	this.OnClicked = function(){
		this.frameHovered++;
	}
	this.OnHovered = function(){
		this.frameHovered++;
	}
	this.OnUnhovered = function(){
		this.frameHovered = 0;
	}

	this.Awake();
}