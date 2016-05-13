function Emitter(position, velocity, spread, rate, max){
	this.position 		= position || new Vector(); //Position
	this.velocity 		= velocity || new Vector(); //Acceleration
	this.spread 		= rate || Math.PI / 32 //angle possible de direction
	this.color 			= "red" //couleur de particule
	this.rate 			= rate ||5; //nombre de particle à la frame
	this.particlesMax 	= max || 2000000;
	this.particles = [];
	this.i = 0;
}

Emitter.prototype.emitParticles = function(){
	var count = this.rate;
	while(count--){
		if(this.particles.length < this.particlesMax){

			var angle 		= this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2) + ++this.i;
			var position 	= new Vector(this.position.x, this.position.y);
			var velocity 	= this.velocity.fromAngle(angle);

			this.particles.push( new Particles(position, velocity, this.color) );

		}
		else return;
	}
}

Emitter.prototype.update = function(){
	this.emitParticles();
	
	for(var particle in this.particles){
		//console.log(this.particles[particle]);
		this.particles[particle].update();
		this.particles[particle].render();
		if(this.particles[particle].outOfBounds()){
			this.particles.splice(particle,1);
		}
	}
}



function Particles(position, velocity,color){
	this.position 	= position;
	this.velocity 	= velocity;
	this.color 		= color;
	this.acceleration = new Vector();
}

Particles.prototype.update = function(){
	this.submitToField();
	this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
}

Particles.prototype.render = function(){
	ctx.fillStyle = this.color;
	ctx.fillRect(this.position.x, this.position.y,1,1);
}

Particles.prototype.outOfBounds = function(){
	return this.position.x < 0 || this.position.x > canvas.width ||
		   this.position.y < 0 || this.position.y > canvas.height;
}

Particles.prototype.submitToField = function(){
	Acceleration = new Vector();

	for (var i = 0; i < Application.LoadedScene.GameObjects[0].fields.length; i++) {
		var field = Application.LoadedScene.GameObjects[0].fields[i];
		var vector = new Vector();
		vector.x = field.position.x - this.position.x;
		vector.y = field.position.y - this.position.y;

		var strength = field.mass / vector.lengthSq();

		Acceleration = vector.mul(strength);
	}

	this.acceleration = Acceleration;
}