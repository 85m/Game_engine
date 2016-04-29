var Time = {
	Time:0,
	DeltaTime:0,
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
		this.FPS = (1000 / this.averageDelay);
		this.TimeOfLastFrame = this.Time;
	}
}