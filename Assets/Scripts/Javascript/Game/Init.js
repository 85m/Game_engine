window.RequestAnimationFrame = (function(){
    return  window.requestAnimationFrame 			|| 
            window.webkitRequestAnimationFrame     	|| 
            window.mozRequestAnimationFrame        	|| 
            window.oRequestAnimationFrame          	|| 
            window.msRequestAnimationFrame         	|| 
    function(callback, element){//si RequestAnimationFrame ne repond pas (envoi false) on utilise setTimeOut
        window.setTimeout(callback, 1000 / 60);
    };
})();

Scenes['Loader'] = new Loader();
Application.LoadedScene = Scenes['Loader'];

/* **** KEY HANDLER  **** */
window.addEventListener('keydown',Input.KeyDown);
window.addEventListener('keyup',Input.KeyUp);
/* ********************* */

/* *** MOUSE HANDLER **** */
window.addEventListener('mousemove',Input.MouseMove);
window.addEventListener('mousedown',Input.MouseDown);
window.addEventListener('mouseup',Input.MouseUp);
/* ********************* */

function LoadImages(){
    var count = 0; //combien de image est charger
    for(i in ImagesPath){
        var name = ImagesPath[i].name;
        var content = "Assets/Graphics/"+ ImagesPath[i].path;

        Images[name] = new Image();
        Images[name].src = content;

        Images[name].onload = function(){
            count++;
            //Scene.loader.imageLoaded = count - > pour le loader

            //toutes les images ont été chargé
            if(count == ImagesPath.length){
                ImageLoaded(count);
            }
        }
    }
}
function ImageLoaded(imageLoaded){
    console.log("%c System: " + imageLoaded + " Loaded!", 'background:#222;color:#bada55');
}
Run();


document.getElementById('change').addEventListener('click',function(){
    if(Application.LoadedScene == Scenes['Scene1']){
        Application.LoadedScene = Scenes['Scene2'];
    }else{
        Application.LoadedScene = Scenes['Scene1'];
    }
});