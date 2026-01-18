 //home sound 
 var homeSound= new Audio ("Audio/home.mp3");
 homeSound.loop=true;

 homeSound.play();

function infoPop(){
    document.getElementById("infoScreen").style.visibility="visible";
    document.getElementById("okButton").style.visibility="visible";
}

function infoClose(){
    document.getElementById("infoScreen").style.visibility="hidden";
    document.getElementById("okButton").style.visibility="hidden";
}

 

 


