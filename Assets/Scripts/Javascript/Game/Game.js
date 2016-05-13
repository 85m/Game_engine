function Run(argument) {
	Time.SetTimeValues();
	ctx.clearRect(0,0,canvas.width,canvas.height);
	//ctx.fillStyle = "rgba(255,255,255,.3)";
	//ctx.fillRect(0,0,canvas.width,canvas.height);

	//console.log('working');
	//console.log(Math.Random.RangeFloat(0,1,true) == 0);
	if (Application.LoadedScene != null) {
		Application.LoadedScene.Start();
	}

	Physics.CheckClick();
	if(Input.MouseReload > 0) Input.MouseClick = false;

	RequestAnimationFrame(Run);
}
