function Node(config){
	this.nodeName 			= config.nodeName;
	this.nodeChildrens		= [];//number of leafs
	this.leafChildrens		= [];
}


Node.prototype.nodeAddNode = function(node){
	this.nodeChildrens.push(node);
}

Node.prototype.nodeAddLeaf = function(leaf){
	this.leafChildrens.push(node);
}


