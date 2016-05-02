function Run(){
	Time.SetTimeValues();
	
	ctx.clearRect(0,0,canvas.width,canvas.height);
	//console.log('it work');

	/* si une scene est charger -> appel de la methode start de la scene */
	if(Application.LoadedScene != null){
		Application.LoadedScene.Start();
	}

	RequestAnimationFrame(Run);
}