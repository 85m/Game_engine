function DotProducts = function(vector1,vector2){
	 return (vector1.x * vector2.x) + (vector1.y * vector2.y);
	//si on veux ajouter dans le cas de la 3d ajouter à la fin + (vector1.z * vector2.z)
}
Math.Clamp = function(value,min,max){
	return Math.min(Math.max(value, min), max);
}

Math.DegreeToRadian = function(deg){
	return deg * Math.PI / 180;
}
Math.RadianToDegree = function(rad){
	return rad * 180 / Math.PI;
}