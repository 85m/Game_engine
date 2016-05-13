function PathFinding(map,collumnNb,LineNb){
	//console.log(map,collumnNb,LineNb);
	//map
	this.map = map;
	this.WalkableTiles 	= []; //index element autorisé a marcher

	//size and dimension
	this.mapDimension 	= new Vector();
	this.mapDimension.x = collumnNb;
	this.mapDimension.y = LineNb;
	this.mapSize = this.mapDimension.x * this.mapDimension.y;

	//shortcuts
	this.tileCol = Physics.TileCollision;

	this.start = Math.Random.InArray(WalkableTiles);
	this.end = Math.Random.InArray(WalkableTiles);
	
	this.distanceAlgo = Math.ManhattanDistance;
	this.NeighboursAlgo = function(){}

	//verifier notre voisin
	this.Neighbours = function(x,y){
		var N = 1,
			S = 3,
			E = 2,
			W = 4;
		var myN = this.tileCol( this.map, this.mapDimension, new Vector(x, y), N);
		var myS = this.tileCol( this.map, this.mapDimension, new Vector(x, y), S);
		var myE = this.tileCol( this.map, this.mapDimension, new Vector(x, y), E);
		var myW = this.tileCol( this.map, this.mapDimension, new Vector(x, y), W);

		result = [];
		if(myN) result.push({x:x,y:y - 1});
		if(myS) result.push({x:x,y:y + 1});
		if(myE) result.push({x:x + 1,y:y});
		if(myW) result.push({x:x - 1,y:y});

		//console.log(result);

		return result;
	}

	this.Node = function(parent,pos,worldWidth){
		var node = {
			parent:parent,
			value:pos.x + (pos.y * worldWidth),
			x:pos.x,
			y:pos.y,
			estimateCost:0, //cout estimé pour passé par ce node
			goal:0 //
		}
		return node;
	}
	//algo A*
	this.Process = function(v1,v2,colNbr){
		var pathStart 	= this.Node(null,v1,colNbr);
		var pathEnd 	= this.Node(null,v2,colNbr);

		//console.log(pathStart);
		//console.log(pathEnd);

		var ASTAR = new Array(this.mapSize);

		var Available = [pathStart];
		var Forbidden = [];
		var Results = [];
		var neighbours;
		var node;
		var path;
		var length,max,min,i,j;//economisé les couts dans une bouble a chaque

		while(length = Available.length){

			max = this.mapSize;
			min = -1;
			for (i = 0; i < length; i++) {
				if(Available[i].estimateCost < max){
					max = Available[i].estimateCost;
					min = i;
				}
			}
			node = Available.splice(min,1)[0];

			//si le node que je teste est ma destination
			if(node.value == pathEnd.value){
				
				path = Forbidden[Forbidden.push(node) - 1];
				while(path.parent){
					Results.push( [path.x, path.y] );
					path = path.parent;
				}
				ASTAR = Forbidden = Available = [];
				//sinon commence du end au start
				Results.reverse();
				return Results;

			}else{ //pas ma destination
				neighbours = this.Neighbours(node.x, node.y);
				
				for(i = 0, j = neighbours.length; i < j; i++){
					path = this.Node(node, neighbours[i],  this.mapDimension.x );

					if(!ASTAR[path.value]){
						path.goal 			= node.goal + this.distanceAlgo(neighbours[i], node);
						path.estimateCost 	= node.goal + this.distanceAlgo(neighbours[i], pathEnd);
						Available.push(path);

						ASTAR[path.value] = true;
					}
				}
				Forbidden.push(node);
			}
		}
		//return Process();
	}


	this.FindNeighbours = function(){

	}
}