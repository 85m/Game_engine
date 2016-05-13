var Camera = function(config){
	this.id 		= config.id 		|| null;
	this.name 		= config.name 		|| " ";
	this.filter 	= config.filter 	|| null;
	this.bg 		= config.bg 	 	|| null;
	this.position 	= config.position 	|| new Vector();
	this.size 		= config.size 		|| new Vector();
}

Camera.prototype.createWindow = function(){

		ctx.fillStyle = this.bg;
		ctx.fillRect(this.position.x,this.position.y,this.size.x,this.size.y);
		if(this.filter != null){
			this.Gfx();
		}
}
Camera.prototype.Gfx = function(){
	var config = {
		x:this.position.x,
		y:this.position.y,
		w:this.size.x,
		h:this.size.y
	}
/*	var config = {
		x:0,
		y:0,
		w:1024,
		h:768
	}*/
	var fn = this.filter;
	//console.log(config);
	Gfx.Filters.Greyscale(config);
}