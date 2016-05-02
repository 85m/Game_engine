var Physics = {
	PointBoxCollision: function(point,box){ //AA (axis aligned)
		//position de l'objet x,y
		//taille de l'objet width, height
		//position du point x,y
		//return bool,poit de collision
		if( point.x >= box.x && point.x <= box.x + box.w ){
			if( point.y >= box.y && point.y <= box.y + box.h ){
				return true;
			}
		}
		return false;
	},
	BoxBoxCollision:function(box1,box2){//AABB (axis aligned bounding box)
		if 	(
			(box2.x >= box1.x + box1.w)  ||
			(box2.y >= box1.y + box1.h)  ||
			(box2.y + box2.h <= box1.y)  ||
			(box2.x + box2.w <= box1.x)
			){
			return false; 
		}else{
			return true; 
		}

	},
	PointCircleCollision:function(point,circle){
		var distance = (point.x-circle.x)*(point.x-circle.x) + (point.y-circle.y)*(point.y-circle.y);
		if (distance > circle.radius * circle.radius){
			return false;
		}else{
			return true;
		}
	},
	CircleCircleCollision:function(circle1, circle2){
		//calcul la distance entre les deux cercle (rayon c1 + rayon 2)
		//si le rayon est superieur à la distance, ils sont éloigné
		var distance = (circle1.x-circle.x)*(circle1.x-circle.x) + (circle1.y-circle.y)*(circle1.y-circle.y);
		if (distance > (circle1.radius * circle2.radius) * (circle1.radius * circle2.radius)){
			return false;
		}else{
			return true;
		}
	},
	CircleBoxCollision:function(circle,box){

		var distX = Math.abs(circle.x - box.x - box.w / 2 );
		var distY = Math.abs(circle.y - box.y - box.h / 2 );

		if(distX > (box.w/2 + circle.radius)) return false;
		if(distY > (box.h/2 + circle.radius)) return false;

		if(distX <= box.w/2) return true;
		if(distY <= box.w/2) return true;

		//pythagore
		var dx = distX - box.w/2;
		var dy = distY - box.h/2;

		//dx * dx + dy * dy -> hypothénuse au carrée
		return ( dx * dx + dy * dy <= circle.radius * circle.radius);

	},
	TileCollision:function(map, sizeMap, position, direction){
		if (direction == 1 && position.y == 0) { return false; }//bord haut
		if (direction == 2 && position.x == sizeMap.x - 1) { return false; }//bord gauche
		if (direction == 3 && position.y == sizeMap.y - 1) { return false; }//bord bas
		if (direction == 4 && position.x == 0) { return false; }//bord droite
		var nextIndex = {x:position.x,y:position.y};
		switch(direction) {
			case 1:
				nextIndex.y--;
				break;
			case 2:
				nextIndex.x++;
				break;
			case 3:
				nextIndex.y++;
				break;
			case 4:
				nextIndex.x--;
				break;
		}
		//nextIndex = nextIndex.y * sizeMap.x + nextIndex.x;
		for (i in WalkableTiles) {
			if (i == map[nextIndex.y * sizeMap.x + nextIndex.x]) {
			 	return true;
			 } 
		}
		return false;
	},
	CheckCollision:function(){
		//console.log(arguments.length);
		if (arguments.length == 2 ) {
			//console.log( arguments[0] instanceof Vector );
			if (arguments[0] instanceof Vector ) {
				if (arguments[1] instanceof Box) {
					//console.log('PointBoxCollision');
					return Physics.PointBoxCollision(arguments[0],arguments[1])
				} else if (arguments[1] instanceof Circle) {
					//console.log('PointCircleCollision');
					return Physics.PointCircleCollision(arguments[0],arguments[1])
				}
			} else if (arguments[0] instanceof Box) {
				if (arguments[1] instanceof Box) {
					//console.log('BoxBoxCollision');
					return Physics.BoxBoxCollision(arguments[0],arguments[1])
				} else if (arguments[1] instanceof Circle) {
					//console.log('CircleBoxCollision');
					return Physics.CircleBoxCollision(arguments[1],arguments[0])
				} else if (arguments[1] instanceof Vector) {
					//console.log('PointBoxCollision');
					return Physics.PointBoxCollision(arguments[1],arguments[0])
				}
			} else if (arguments[0] instanceof Circle) {
				if (arguments[1] instanceof Box) {
					//console.log('CircleBoxCollision');
					return Physics.CircleBoxCollision(arguments[0],arguments[1])
				} else if (arguments[1] instanceof Circle) {
					//console.log('CircleCircleCollision');
					return Physics.CircleCircleCollision(arguments[1],arguments[0])
				} else if (arguments[1] instanceof Vector) {
					//console.log('PointCircleCollision');
					return Physics.PointBoxCollision(arguments[1],arguments[0])
				}
			}


		} else if (arguments.length == 4 ) {
			return TileCollision(arguments[0],arguments[1],arguments[2],arguments[3])
		}
	},
	CheckClick:function(){
		for (var i = 0; i < Application.LoadedScene.gameObjects.length; i++) {
			var go = Application.LoadedScene.gameObjects[i];
			if(go.Physics.Clickable){
				if(Physics.PointBoxCollision(Input.MousePosition,
					{	x:go.Physics.BoxCollider.position.x,
						y:go.Physics.BoxCollider.position.y,
						w:go.Physics.BoxCollider.size.x,
						h:go.Physics.BoxCollider.size.y
					})){
					if(!Input.MouseClick){
						go.OnHovered();
					}else{
						go.OnClicked();
					}
				}else{
					go.OnUnhovered();
				}
			}
		}
	}
};

function Box(x,y,width,height){
	this.x = x;
	this.y = y;
	this.w = width;
	this.h = height;
}
function Circle(x,y,radius){
	this.x = x;
	this.y = y;
	this.radius = radius;
}