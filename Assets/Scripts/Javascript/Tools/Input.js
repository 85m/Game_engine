var Input = {
	//souris,clavier
	KeysDown:[],
	MousePosition:{
		x:0,
		y:0
	},
	//on utrilise pas le this car il fait reference a window
	KeyDown:function(event){
		event.preventDefault();
		event.stopPropagation();
		Input.KeysDown[event.which] = true;
	},
	KeyUp:function(event){
		delete Input.KeysDown[event.which]; //supprime le contenu dans le array
	},
	MouseMove:function(event){
		var rect = canvas.getBoundingClientRect();
		Input.MousePosition.x = (event.clientX - rect.left) / (rect.right - rect.left) * canvas.width | 0;
		Input.MousePosition.y = (event.clientY - canvas.offsetTop) / (rect.bottom - rect.top) * canvas.height | 0;
	},
	MouseDown:function(event){
		Input.MouseClick = true; //gerer le click
		Input.MouseLongClick = true; //gerer les long click
		Input.MouseReload = 1; //gerer les double click

	},
	MouseUp:function(event){
		Input.MouseClick = false;
		Input.MouseLongClick = false;
		Input.MouseReload = 0;
		Input.MouseDragging = false;
		Input.DraggedElement = false;
	}


}


