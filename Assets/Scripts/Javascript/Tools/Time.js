var Time = {
	Time:0,
	DeltaTime:1,
	TimeScale:0,//multiplie au deltatime pour accelerer ou deceler une action
	FPS:0,

	TimeOfLastFrame:0,
	averageDelay:0,

	GetTimeWhenGameBegin:function(){
		return this.TimeWhenGameBegin;
	},
	GetTimeWhenGameLoaded:function(){
		return this.TimeWhenGameLoaded;
	},
	GetTimeWhenSceneBegin:function(){ //the current one (scene)
		return this.TimeWhenSceneBegin;
	},
	GetTimeWhenSceneLoaded:function(){ //the current one (scene)
		return this.TimeWhenSceneLoaded;
	},
	GetTimeSinceGameBegin:function(){
		return new Date().getTime() - this.GetTimeWhenGameBegin();
	},
	GetTimeSinceSceneLoaded:function(){
		return new Date().getTime() - this.GetTimeWhenSceneLoaded();
	},
	SetTimeWhenGameBegin:function(){
		this.TimeWhenGameBegin = this.Time;
	},
	SetTimeWhenGameLoaded:function(){
		this.TimeWhenGameLoaded = this.Time;
	},
	SetTimeWhenSceneBegin:function(){ //the current one (scene)
		this.TimeWhenSceneBegin = this.Time;
	},
	SetTimeWhenSceneLoaded:function(){ //the current one (scene)
		this.TimeWhenSceneLoaded = this.Time;
	},
	SetTimeValues:function(){
		this.Time = Date.now();//donne le time timestamp en milliseconde
		this.DeltaTime = (this.Time - this.TimeOfLastFrame) / 1000;
		this.averageDelay += ((this.Time - this.TimeOfLastFrame) - this.averageDelay) / 10;//delai entre 2 frame
		this.FPS = (1000 / this.averageDelay).toFixed(1);
		this.TimeOfLastFrame = this.Time;
	}
}


String.prototype.toHHMMSS = function(){
	var sec_num 	= parseInt(this,10);
	var hours 		= Math.floor(sec_num / 3600);
	var minutes 	= Math.floor((sec_num - (hours*3600)) / 60);
	var secondes 	= sec_num - (hours*3600) - (minutes * 60);

	if(hours < 10){hours = "0"+hours;}
	if(minutes < 10){minutes = "0"+minutes;}
	if(secondes < 10){secondes = "0"+secondes;}
	var times = hours + " : " + minutes + " : " + secondes;
	return times;
}