function Vector(){
	this.x = 0;
	this.y = 0;

	//deplacement
	this.add = function(vector){//on peut chainer comme : t.add(t2).add(t).add(t2) - t et t2 sont des new Vector
		this.x += vector.x;
		this.y += vector.y;

		return this;
	}

	//Destination va vers le point depart
	this.sub = function(vector){
		this.x -= vector.x;
		this.y -= vector.y;

		return this;
	}

	//trouvé la distance entre deux point - magnitude
	this.length = function(){
		var length;
		length = Math.sqrt( (this.x*this.x) + (this.y*this.y) );//utilisation de la racine carée
		return length;
	}

	//celui qui est le plus proche entre plusieur objet
	this.lengthSqrt = function(){
		var lengthSq;
		lengthSq = this.x*this.x + this.y*this.y;
		return lengthSq;
	}

	//allé plus loin
	this.mul = function(factor){//factor est un nombre
		this.x *= factor;//multiplie ceci par le nombre donné
		this.y *= factor;
		return this;
	}

	this.div = function(factor){
		this.x /= factor;
		this.y /= factor;
		return this;
	}


	/*
	prend trouvé le vecteur de magnitude 1
	division par lui meme sans modifier sa propre valeur
	*/
	this.normalize = function(){
		var vector = new Vector();
		vector.x = this.x;
		vector.y = this.y;
		vector.div(this.length());
		return vector;
	}

}