var Random = {
	RangeInt:function(min,max,isInclusive){
		if (isInclusive) {
			max ++;
		} else {
			min ++;
		}
		return Math.floor(Math.random() * (max - min) + min)  ; 
	},
	RangeFloat:function(min,max,isInclusive){

	},
	InArray:function(array){
		return array[Math.floor(Math.random()*array.length)];
	},
	InCircle: function(circle){
		var randomAngle = this.RangeFloat(0, 2*Math.PI,true);
		var point = new Vector();
		point.x = (cirlce.x + circle.radius * Math.cos(randomAngle) ) | 0;
		point.y = (cirlce.y + circle.radius * Math.cos(randomAngle) ) | 0;
		return point;
	},
	InDisk:function(circle){//surface du cercle
		this.InCircle.mul(this.RangeFloat(0, 1, true));
	},
	InScreen:function(){//un point dans le canvas
		var point 	= new Vector();
		point.x 	= Math.floor(Math.random() * canvas.width);
		point.x 	= Math.floor(Math.random() * canvas.height);
		return point;
	},
	InArea:function(box){
		var point 	= new Vector();
		point.x 	= box.x + this.RangeInt(0, box.w, true);
		point.y 	= box.y + this.RangeInt(0, box.h, true);
		return point;
	},
	ColorRGB:function(){
		return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	},
	ColorHex:function(){
		var letters = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
        	color += letters[Math.Random.RangeInt(0,letters.length,false)];
        }
        return color;
	},
	ColorRGBA:function(alpha = 1){
		return 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + 
						 (Math.floor(Math.random() * 256)) + ',' + 
						 (Math.floor(Math.random() * 256)) + ','+ alpha +')';
	},
	AngleDegree:function(min,max){
		return this.RangeInt(min,max,true) % 360;
	},
	AngleRadian:function(min,max){
		return this.RangeFloat(min, max, true) % (2*Math.PI);
	},
	IntPondere:function(min,max){
		this.FloatPondere() | 0;
	},
	FloatPondere:function(min,max){
		var a = this.intPondere(min, max,false);
		var b = this.intPondere(min, max,false);
		return (a + b) * 0.5;
	}

}