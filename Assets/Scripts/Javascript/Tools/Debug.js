var Debug = {
	showStat:function(){
		ctx.fillStyle = "rgba(122,122,122,0.4)";
		ctx.fillRect(4,4,150,120);

		ctx.font = "14px Georgia";
		if(Time.FPS > 40) ctx.fillStyle = "green";
		if(Time.FPS < 40) ctx.fillStyle = "orange";
		if(Time.FPS < 20) ctx.fillStyle = "red";
		ctx.fillText("FPS  : "+ Time.FPS,15,20);

		ctx.fillStyle = "white";
		ctx.fillText("Game: "+ (Time.GetTimeSinceGameBegin() / 1000 | 0).toString().toHHMMSS(),15,40);
		//console.log( (Time.GetTimeSinceGameBegin() / 1000 | 0).toString().toHHMMSS() );
		ctx.fillText("Scene: "+ (Time.GetTimeSinceSceneLoaded() / 1000 | 0).toString().toHHMMSS(),15,60);

		ctx.fillStyle = Input.MouseClick ? "green" : "white";
		ctx.fillText("x: " + Math.floor(Input.MousePosition.x) + ", y: " + Math.floor(Input.MousePosition.y), Input.MousePosition.x+10,Input.MousePosition.y+10);

		ctx.fillStyle = "rgba(122,122,122,0.4)";
		ctx.fillRect(canvas.width - 130, 4, 125 , 30);
		ctx.fillStyle = "white";
		ctx.fillText("Scene: " + Application.LoadedScene.name, canvas.width - 120, 23);
	},
	gameObjectStat:function(){
		for (var i = 0; i < Application.LoadedScene.gameObjects.length; i++) {
			var go = Application.LoadedScene.gameObjects[i];
			var obj = go.Transform;
			var box = go.Physics.boxCollider;


			console.log(obj.position.x,obj.position.y,obj.size.x,obj.size.y);
			ctx.fillStyle = "rgba(144,238,144,0.4)";
			ctx.fillRect(box.position.x,box.position.y,box.size.x,box.size.y);
			ctx.strokeStyle = "gray";
			ctx.strokeRect(box.position.x,box.position.y,box.size.x,box.size.y);


			ctx.fillStyle = "rgba(122,122,122,0.8)";
			var pos ={
				x:box.position.x,
				y:box.position.y - 80,
				w:(box.size.x),
				h:75,
			}

			ctx.fillRect(pos.x,pos.y,pos.w,pos.h);
			ctx.font = "10px arial";
			ctx.fillStyle = "white";
			ctx.fillText(go.name,pos.x+10,pos.y+10);
			ctx.fillStyle = "green";
			ctx.fillText('x: '+ pos.x, pos.x+10,pos.y+25);
			ctx.fillText('y: '+ pos.x, pos.x+10,pos.y+35);
			ctx.fillText('w: '+ pos.x, pos.x+10,pos.y+45);
			ctx.fillText('h: '+ pos.x, pos.x+10,pos.y+55);

			ctx.fillStyle = "black";
			ctx.fillRect(obj.pivot.x,obj.pivot.y,10,10);
		}
	}
}