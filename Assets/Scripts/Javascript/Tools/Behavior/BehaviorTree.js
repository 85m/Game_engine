function BehaviorTree(config){
	this.rootName 			= config.rootName;
	this.nodes 				= [];
}


BehaviorTree.prototype.rootAddNode = function(node){
	this.nodes.push(node);
}