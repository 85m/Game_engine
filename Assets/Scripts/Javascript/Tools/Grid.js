var Grid = {
	COLUMN:0,
	ROWS:0,
	CELLSIZE:0,
	cells:[],
	infoCase:" ",
	pathFinding:null,
	pathRes:null,

	init:function(column,rows,cellsize){
		this.column 	= this.COLUMN 	|| column;
		this.rows 		= this.ROWS 	|| rows;
		this.cellsize 	= this.CELLSIZE || cellsize;

		var isWall;
		for (var x = 0; x < this.column; x++) {
			for (var y = 0; y < this.rows; y++) {
				isWall = false;
				if(Math.Random.RangeInt(0, 100, false) < 25){
					isWall = true;
				}
				this.cells.push( new Cell(y*this.cellsize, x*this.cellsize,isWall,this.cellsize,'black') );
			}
		}
	},
	getPathFinding:function(){
		var lgth = 0;
		for(var i in this.cells){
			var cell = this.cells[i]
			if(!cell.isWall){
				WalkableTiles.push(cell);
			}
			lgth++;
		}
		if(lgth == this.cells.length){
			this.pathFinding = new PathFinding(this.cells, this.column, this.rows);
			this.pathRes = this.pathFinding.Process(new Vector(1,1), new Vector(8,8), this.column);
			//console.log(this.pathRes);
		}
	},
	draw:function(){
		for(var i in this.cells){
			this.cells[i].draw();
		}
		this.gui(this.infoCase);
	},
	click:function(){
		if(Input.MouseClick){
			var clickX = Input.MousePosition.x / this.cellsize;
    		var clickY = Input.MousePosition.y / this.cellsize;
		    var x = Math.floor(clickX);
		    var y = Math.floor(clickY);

			for(var i = 0 ;  i < this.cells.length ; i++){
				var cell = this.cells[i];			
				if(x*this.cellsize == cell.x && y*this.cellsize == cell.y){
					this.gui('cell('+(x+1)+','+(y+1)+')');
					cell.draw('green');
				}
			}
		}
	},
	gui:function(info){
		this.infoCase = info;
		var gridWidth = this.cellsize * this.column;

		ctx.fillStyle = "lightblue";
		ctx.strokeRect(gridWidth + 50, 0, 100,30);

		ctx.font = '16px Arial';
		ctx.fillStyle = 'black';
		ctx.fillText(this.infoCase, gridWidth+70, 20);
	}
}


function Cell(x,y,isWall,size,color){
	this.x 		= x;
	this.y 		= y;
	this.isWall = isWall;
	this.size 	= size;
	this.color 	= color;


	this.draw = function(c){
		if(this.isWall){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x,this.y,this.size,this.size);
		}else{
			ctx.fillStyle = 'white';
			ctx.strokeRect(this.x,this.y,this.size,this.size);	
		}

		for(var a in Grid.pathRes){
			//console.log(Grid.pathRes[a]);
			var x = Grid.pathRes[a][0];
			var y = Grid.pathRes[a][1];
			ctx.fillStyle = 'lightblue';
			ctx.fillRect(x*this.size,y*this.size,this.size,this.size);	
		}
	}
}