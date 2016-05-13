Dialogue = {
	font:"",
	textToWrite:"",
	fontSize:12,
	color:"white",
	destination:{
		x:0,
		y:0,
		w:0,
		h:0
	},
	interval:"medium",
	interrupt:false,
	CharArray:[],
	text:{
		content:"",
		x:0,
		y:0
	},
	current:0,
	lineArray:[],
	lineCpt:0,
	initText:function(config){
		this.font 			= config.font;
		this.fontSize 		= config.fontSize;
		this.color 			= config.color;
		this.textToWrite 	= config.textToWrite;
		this.destination 	= config.destination;
		this.interval 		= config.interval;
		this.interrupt 		= config.interrupt;
	},
	Begin:function(){
		ctx.font 		= this.fontSize +"px "+ this.font;
		ctx.fillStyle 	= this.color;
		this.CharArray 	= this.textToWrite.split("");
		this.text.x = this.destination.x;
		this.text.y = this.destination.y;
	},
	Continue:function(){
		if(this.text.content.length <= this.textToWrite.length){
			this.Write();
		}
	},
	Interrupt:function(){

		if(Input.KeysDown[32]){
			this.interrupt = true;
		}
	},
	Write:function(){
		if(this.interrupt == false){
			if(this.current < this.CharArray.length){
				this.text.y += this.fontSize;
				this.text.content 		+= this.CharArray[this.current++];
			}
		}else{
			this.text.content = this.textToWrite;
		}

		ctx.fillText(this.text.content, this.text.x, this.text.y);
		
	},
	CheckLineLength:function(Char){
		return ctx.measureText(Char).width;
	}
}