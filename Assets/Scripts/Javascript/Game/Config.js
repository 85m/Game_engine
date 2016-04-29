var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");


var Scenes = {}; //var contenir toutes les scenes

var gravity 	= new Vector();
	gravity.x 	= 0;
	gravity.y 	= -2;

var Application = {
	LoadedScene:null,//reference vers la scene loaded
	GamePaused: false//gestion de la pause dans le jeu
};

var ImagesPath = [
/*	{name:'Deserts', path:'Backgrounds/Deserts.jpg'},
	{name:'Hydrangeas', path:'Backgrounds/Hydrangeas.jpg'},
	{name:'Jellyfish', path:'Backgrounds/Jellyfish.jpg'}*/
]

var Images = {};

//map de tile rempli d'obstacle
var WalkableTiles = [];