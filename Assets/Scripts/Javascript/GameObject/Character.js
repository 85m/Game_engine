function Character(){
	this.name 		= "Character";
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

	this.Renderer = {
		isVisible:true,//si le sprite est visible
        isSpriteSheet:true, //si c'est un sprite (image a decoupe), ca peut etre une image
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
            currentIndex:0,
            totalAnimationLength: 0
		},
        AnimationCount:0,
		Draw:function(){
            if (this.isSpriteSheet) {
                if (this.Animation.animated) {
                    if (this.AnimationCount > this.Animation.totalAnimationLength/this.Animation.current.length) {
                        this.Animation.currentIndex ++ ;
                        this.AnimationCount = 0 ;
                        if (this.Animation.currentIndex > this.Animation.current.length-1) {
                            this.Animation.currentIndex = 0;
                        }
                    }
                    this.AnimationCount += Time.DeltaTime ;
                } else {
                    this.AnimationCount = 0;
                    this.Animation.currentIndex = 0;
                }
                this.Material.CurrentFrame = this.Animation.current[this.Animation.currentIndex];

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
                    scaledSizeY);
            }
            else{
                ctx.drawImage(this.Material.source,
                    this.that.position.x - this.that.pivot.x * (this.that.size.x * this.that.scale.x),
                    this.that.position.y - this.that.pivot.y * (this.that.size.y * this.that.scale.y),
                    this.that.size.x * this.that.scale.x,
                    this.that.size.y * this.that.scale.x);
            }
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

        this.Transform.position.x = 250;
        this.Transform.position.y = 250;
        this.Transform.size.x = 256;
        this.Transform.size.y = 320;
        this.Transform.scale.x = 1;
        this.Transform.scale.y = 1;
        this.Transform.pivot.x = 0;
        this.Transform.pivot.y = 0;

        this.Renderer.Material.source = Images['roxas'];
        this.Renderer.Material.SizeFrame.x = 64;
        this.Renderer.Material.SizeFrame.y = 80;
        this.Renderer.Animation.totalAnimationLength = .5;

		console.clear();
		console.log("%c System:GameObject " + this.name + " Created!", 'background:#ACCE55;color:#B000B5');
	}
	this.Start = function(){
		if(!this.started){
			//les operations de start


            if (this.Renderer.isSpriteSheet) {
                var img = Images["roxas"];
                this.Renderer.Material.Source = img;

                //console.log(this.Renderer.Material.SizeFrame);
                for (var i = 0; i < img.height; i += this.Renderer.Material.SizeFrame.y) {
                    var array = [];
                    for (var j = 0; j < img.width; j += this.Renderer.Material.SizeFrame.x) {
                        //array.push(new Vector(i,j));
                        array.push({x: j, y: i});
                    }
                    this.Renderer.Animation.animations.push(array);
                }

                this.Renderer.Animation.current = this.Renderer.Animation.animations[0];
                console.log(this.Renderer.Animation.animations);
            }

            if (this.Physics.colliderIsSameSizeAsTransform) {
                this.Physics.boxCollider = this.Transform;
            }


			this.started = true;//on a fait notre premier passage après update seulement
			console.log("%c System:GameObject " + this.name + " Started!", 'background:#ACCE55;color:#B000B5');
		}
		this.Update();
	}
	this.Update = function(){
		if(this.enabled){

            if (Input.KeysDown[37] || Input.KeysDown[38] || Input.KeysDown[39] || Input.KeysDown[40]) {
                this.Renderer.Animation.animated = true;
                if (Input.KeysDown[37]) {
                    this.Renderer.Animation.current = this.Renderer.Animation.animations[1];
                }
                if (Input.KeysDown[38]) {
                    this.Renderer.Animation.current = this.Renderer.Animation.animations[3];
                }
                if (Input.KeysDown[39]) {
                    this.Renderer.Animation.current = this.Renderer.Animation.animations[2];
                }
                if (Input.KeysDown[40]) {
                    this.Renderer.Animation.current = this.Renderer.Animation.animations[0];
                }
            } else {
                this.Renderer.Animation.animated = false;
            }
            this.Renderer.Draw();
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