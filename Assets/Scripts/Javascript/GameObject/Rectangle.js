function Rectangle(x,y,w,h,c){
	this.name 		= "Rectangle";
	this.enabled 	= true;//elements qui sont activé/desactivé
	this.started 	= false;
	this.renderer 	= true;

	this.frameHovered = 0;

	this.Transform = {
		position : new Vector(),
		size : new Vector(),
		scale : new Vector(),
		pivot : new Vector()
	}

	this.renderer = {
		isVisible:true,//si le sprite est visible
		isPriteSheet:true, //si c'est un sprite (image a decoupe), ca peut etre une image
		that:this.Transform,
		Material:{
			source : "",
			SizeFrame : new Vector(),
			CurrentFrame : new Vector()
		},
		Animation : {
			animated: false,
			animations: [],
			current: [],
			currentFrame: 0,
			framesAnimate: 0,
			totalAnimationLength: 0
		},
		Draw:function(){
			if (this.isSpriteSheet) {
                console.log('sprite');
            }else{
                ctx.drawImage(
                    this.Material.source,
                    this.that.position.x - this.that.pivot.x * this.that.size.x * this.that.scale.x,
                    this.that.position.y - this.that.pivot.y * this.that.size.y * this.that.scale.y,
                    this.that.size.x * this.that.scale.x,
                    this.that.size.y * this.that.scale.x);
            }
/*			ctx.drawImage(
				this.Material.Source,
				this.that.position.x,
				this.that.position.y,
				this.that.size.x,
				this.that.position.y
            );*/
		}
	}

	this.Physics = {
		enabled: true,
		clickable : false,
		dragAndDroppable : false,
		colliderIsSameSizeAsTransform : true,
		boxCollider : {
			position : new Vector(),
			size : new Vector(),
			scale : new Vector(),
			pivot : new Vector()
		}
	}

	this.setPosition = function(x,y){
		this.Transform.position.x = x;
		this.Transform.position.y = y;
		if(!this.Physics.colliderIsSameSizeAsTransform){
			this.Physics.boxCollider.position.x = this.Transform.position.x;
			this.Physics.boxCollider.position.y = this.Transform.position.y;
		}
	}
	this.setSize = function(x,y){
		this.Transform.size.x = x;
		this.Transform.size.y = y;
		if(!this.Physics.colliderIsSameSizeAsTransform){
			this.Physics.boxCollider.size.x = this.Transform.size.x;
			this.Physics.boxCollider.size.y = this.Transform.size.y;
		}
	}
	this.setScale = function(x,y){
		this.Transform.scale.x = x;
		this.Transform.scale.y = y;
		if(!this.Physics.colliderIsSameSizeAsTransform){
			this.Physics.boxCollider.scale.x = this.Transform.scale.x;
			this.Physics.boxCollider.scale.y = this.Transform.scale.y;
		}
	}
	this.setPivot = function(x,y){
		this.Transform.pivot.x = x;
		this.Transform.pivot.y = y;
		if(!this.Physics.colliderIsSameSizeAsTransform){
			this.Physics.boxCollider.pivot.x = this.Transform.pivot.x;
			this.Physics.boxCollider.pivot.y = this.Transform.pivot.y;
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
            this.started = true;//on a fait notre premier passage après update seulement
			console.log("%c System:GameObject " + this.name + " Started!", 'background:#ACCE55;color:#B000B5');
		}
		this.Update();
	}
	this.Update = function(){
		if(this.enabled){
            ctx.fillStyle = c;
            ctx.fillRect(x,y,w,h);
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