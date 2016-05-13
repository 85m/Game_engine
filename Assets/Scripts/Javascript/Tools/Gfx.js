Gfx = {
	Filters:{
		Greyscale:function(affectedZone){

			//parser tout les pixels
			var pixels = ctx.getImageData(affectedZone.x,affectedZone.y,affectedZone.w,affectedZone.h);
			var d = pixels.data;
			//console.log(pixels);

			for(var i = 0 ; i < d.length; i += 4){//un seul tour de boucle pour les pixels qui prend 3 place
				
				var r = d[i];
				var g = d[i+1];
				var b = d[i+2];

				var variation = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);

				d[i] = d[i + 1] = d[i + 2] = variation;
			}

			ctx.putImageData(pixels,affectedZone.x,affectedZone.y);
		},
		Sepia:function(affectedZone){
			/* METHODE 1  tint avec fillstyle du bas */
			//ctx.fillStyle = 'rgba(255,204,102,0.3)';

			/* METHODE 2 VRAI SEPIA */
			var pixels = ctx.getImageData(affectedZone.x, affectedZone.y, affectedZone.w, affectedZone.h);

			var d = pixels.data;

			for (var i = 0; i < d.length; i += 4) {
				var r = d[i];
				var g = d[i+1];
				var b = d[i+2];

				var outR = (r * 0.393) + (g *.769) + (b * .189);
				var outG = (r * 0.349) + (g *0.686) + (b * 0.168);
				var outB = (r * 0.272) + (g *0.534) + (b * 0.131);

				d[i] = outR;
				d[i + 1] = outG;
				d[i + 2] = outB;
			}

			ctx.putImageData(pixels, affectedZone.x, affectedZone.y);
		},
		Tint:function(affectedZone,color){
			var box = {
				x : affectedZone.x,
				y : affectedZone.y,
				w : affectedZone.w,
				h : affectedZone.h
			}

			Gfx.Filters.Greyscale(box);
			ctx.fillStyle = color;
			ctx.fillRect(box.x,box.y,box.w,box.h);
		},
		AlphaMask : function(affectedZone, mask) {
			var old = ctx.getImageData(0, 0, canvas.width, canvas.height);
			var oldD = old.data;

			ctx.drawImage(Images[mask], 0, 0, canvas.width, canvas.height);

			var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

			var d = pixels.data;

			for (var i = 0; i < d.length; i += 4) {

				var r = d[i];
				var g = d[i+1];
				var b = d[i+2];

				if (r > 250 && g > 250 && b > 250) {
					oldD[i+3] = 0;
				}

			}
			ctx.putImageData(old, 0, 0);
		},
		Flash : function(affectedZone, power, color) {


		}
	}
}