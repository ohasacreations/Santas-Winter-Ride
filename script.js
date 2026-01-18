//background Sound 
  var backSound= new Audio("Audio/background.mp3");
  backSound.loop=true;
  backSound.play();

//win Audio
 var winAudio = new Audio ("Audio/win.mp3");
 winAudio.loop=true;
 winAudio.pause();

//run Sound
var runSound = new Audio("Audio/run.mp3");
runSound.loop = true;
//jump sound 
var jumpSound = new Audio("Audio/jump.mp3");
//dead sound 
var deadSound = new Audio("Audio/dead.mp3");
//game over sound
var gameOver= new Audio("Audio/gameover.mp3");
gameOver.loop=true;

gameOver.pause();




//keyCheck

function keyCheck(event) {

    //Enter Key

    if (event.which == 13) {
        if (runWorkerId == 0) {

            runWorkerId = setInterval(run, 100);

            runSound.play();
            clearInterval(idleWorkerId);

            createBlockWorkerId = setInterval(createBlock, 100);

            moveBlockWorkerId = setInterval(moveBlock, 100);
            moveBackgroundWorkerId = setInterval(moveBackground, 100);
            updateScoreWorkerId = setInterval(updateScore, 100);
            whichFlyWorkerId = setInterval(whichFly, 100);

            
        }

    }

    //Space Key

    if (event.which == 32) {
        if (jumpWorkerId == 0) {
            clearInterval(runWorkerId);
            runWorkerId = -1;
            runSound.pause();
            clearInterval(idleWorkerId);

            jumpWorkerId = setInterval(jump, 75);
            jumpSound.play();

        }

    }


}
//create block
var blockMarginLeft = 500;
var createBlockWorkerId = 0;
var blockId = 1;

function createBlock() {

    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;
    blockId++;

    var gap = Math.random() * (1000 - 400) + 400;



    blockMarginLeft = blockMarginLeft + gap;
    block.style.marginLeft = blockMarginLeft + "px";


    document.getElementById("background").appendChild(block);
}


//move block
var moveBlockWorkerId = 0;


function moveBlock() {
    for (var i = 1; i <= blockId; i++) {
        var currentBlock = document.getElementById("block" + i);
        var currentBlockMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentBlockMarginLeft) - 20;

        currentBlock.style.marginLeft = newMarginLeft + "px";

        //alert(newMarginLeft);
        //138-38

        if (newMarginLeft < 138 & newMarginLeft > 38) {
            //alert(boyMarginTop);
            //320
            if (boyMarginTop > 330) {
                clearInterval(jumpWorkerId);
                jumpWorkerId = -1;
                clearInterval(moveBackgroundWorkerId);
                clearInterval(createBlockWorkerId);
                clearInterval(moveBlockWorkerId);
                clearInterval(updateScoreWorkerId);
                clearInterval(moveBagWorkerId);

                deadWorkerId=setInterval(dead,100);
                playerId.style.marginTop="420px";
                deadSound.play();
                gameOver.play();
                backSound.pause();

                clearInterval(moveBagWorkerId);

                
            }

        
            
        }

    }
}






//idel
var playerId = document.getElementById("player");
var idleImageNumber = 0;
var idleWorkerId = 0;

function idle() {

    idleImageNumber++;

    if (idleImageNumber == 17) {
        idleImageNumber = 1;
    }
    playerId.src = "santa/Idle (" + idleImageNumber + ").png";

}
function idleStart() {
    idleWorkerId = setInterval(idle, 100);

}
//run
var playerId = document.getElementById("player")
var runImageNumber = 1;
var runWorkerId = 0;

function run() {

    runImageNumber++;
    if (runImageNumber == 12) {
        runImageNumber = 1;
    }

    playerId.src = "santa/Run (" + runImageNumber + ").png";

}

//jump
var jumpImageNumber = 1;
var jumpWorkerId = 0;
var boyMarginTop = 420;

function jump() {
    jumpImageNumber++;

    if (jumpImageNumber <= 9) {
        boyMarginTop = boyMarginTop - 30;
        playerId.style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber >= 10) {
        boyMarginTop = boyMarginTop + 30;
        playerId.style.marginTop = boyMarginTop + "px";
    }


    if (jumpImageNumber == 17) {
        jumpImageNumber = 1;


        clearInterval(jumpWorkerId);

        jumpWorkerId = 0;
        runWorkerId = setInterval(run, 100);
        runSound.play();

    }

    if (moveBackgroundWorkerId == 0) {
        moveBackgroundWorkerId = setInterval(moveBackground, 100);
    }
    if (createBlockWorkerId == 0) {
        createBlockWorkerId = setInterval(createBlock, 100);
    }
    if (moveBlockWorkerId == 0) {
        moveBlockWorkerId = setInterval(moveBlock, 100);
    }

    if (updateScoreWorkerId == 0) {
        updateScoreWorkerId = setInterval(updateScore, 100);
    }

    if (whichFlyWorkerId == 0) {
        whichFlyWorkerId = setInterval(whichFly, 100);
    }



    playerId.src = "santa/Jump (" + jumpImageNumber + ").png";

}
//dead
var deadImageNumber=1;
var deadWorkerId=0;


function dead(){

    clearInterval(runWorkerId);
    

    runSound.pause();
    
    deadImageNumber++;
     if (deadImageNumber==18){
        deadImageNumber=17;

        document.getElementById("endScreen").style.visibility="visible";
        document.getElementById("endScore").innerHTML = newScore;
        document.getElementById("score").style.visibility="hidden";
        document.getElementById("scoreBar").style.visibility="hidden";
        
     }

     playerId.src = "santa/Dead ("+deadImageNumber+").png";

     
     whichFlyWorkerId=setInterval(whichFly,250);

     

}



//move background 
var backgroundId = document.getElementById("background");
var moveBackgroundWorkerId = 0;
var backgroundX = 0

function moveBackground() {
    backgroundX = backgroundX - 20;
    backgroundId.style.backgroundPositionX = backgroundX + "px";
}

//score
var newScore = 0;
var scoreId = document.getElementById("score");
updateScoreWorkerId = 0


function updateScore() {
    newScore++;
    scoreId.innerHTML = newScore;
    if(newScore==250){
        bagVisible();
        moveBagStart();
        
        
    }

}



//bag visible
var bagid = document.getElementById("bag");
function bagVisible(){
    bagid.style.visibility="visible";
}

//bag Move
var bagMarginLeft = 1100;
var moveBagWorkerId = 0;

function moveBag(){
    var bagId = document.getElementById("bag");
    bagMarginLeft=bagMarginLeft-20;
    bagId.style.marginLeft=bagMarginLeft+"px";
    
    if (bagMarginLeft==220){
        clearInterval(runWorkerId);
        clearInterval(jumpWorkerId);
        clearInterval(createBlockWorkerId);
        clearInterval(moveBackgroundWorkerId);
        clearInterval(moveBlockWorkerId);
        clearInterval(moveBagWorkerId);

        document.getElementById("winScreen").style.visibility="visible";
        document.getElementById("winScore").innerHTML = newScore;
        document.getElementById("score").style.visibility="hidden";
        document.getElementById("scoreBar").style.visibility="hidden";
        
        bagid.style.visibility="hidden";
        whichId.style.visibility="hidden";
        playerId.src="santa/with bag.png";
        playerId.style.marginTop="420px";


        runSound.pause();
        backSound.pause();
        winAudio.play();


        

        
    }

       
}

function moveBagStart(){
    
    moveBagWorkerId=setInterval(moveBag,100);
    
}







//whichFly
var whichId = document.getElementById("which");
var whitchMarginLeft = -400;
var whichFlyWorkerId = 0;

function whichFly() {

    whitchMarginLeft = whitchMarginLeft + 100;

    if (whitchMarginLeft == 900) {

        clearInterval(whichFlyWorkerId);
    }


    whichId.style.marginLeft = whitchMarginLeft + "px";

}
//reload
function reload(){
    location.reload();

}

