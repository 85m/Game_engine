PlayerPrefs = {
	Save:function(name, value){
		localStorage.setItem(name, value);
	},

	Load:function(name){

		return localStorage.getItem(name);
	},

	Delete:function(name){
		localStorage.removeItem(name);
	}
}