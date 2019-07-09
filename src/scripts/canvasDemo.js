var poopX=0;
var poopY=0;

var canvas = document.getElementById('viewport'),
    context = canvas.getContext('2d');

make_base();
setTimeout(function(){ make_poo(); },4000+Math.trunc(Math.random()*1500));

function make_base()
{
    base_image = new Image();
    base_image.src = '../img/grass.jpg';
    base_image.onload = function(){
        /*context.drawImage(base_image, 1,1,1300,866,0,0,1300, 866);*/
        //context.drawImage(base_image,1,1,298,147);
        context.drawImage(base_image,1,1,800,400);
    }
}

function make_poo() {
    poopX=Math.trunc(Math.random()*775);
    poopY=Math.trunc(Math.random()*375);
    var poop_image = new Image();
    poop_image.src = '../img/poop.jpg';
    poop_image.onload = function(){
        context.drawImage(poop_image, poopX, poopY,25,25);
        /*console.log("X=" + poopX + " Y=" + poopY);*/
    };
    //Update status message for success
    var status=document.getElementById("statusBar");
    if (status.innerHTML.substr(1,9)!="Your pets") {
        status.innerHTML="Scoop the poop!";
        status.setAttribute("class","bad");
    }
    //Play sounds based on added pet
    var audioplayer=document.getElementById("mp3Audio");
    audioplayer.src="../audio/poop.mp3";
    var audiocontroller=document.getElementById("audioController");
    audiocontroller.load();
    audiocontroller.play();
}

function get_poo(x,y) {

    var trowel_image = new Image();
    trowel_image.src = '../img/flower.jpg';
    trowel_image.onload = function(){
        context.drawImage(trowel_image, x, y,25,25);
        /*console.log("X=" + poopX + " Y=" + poopY);*/
    };
    //Change the mouse cursor to poop
    var elem=document.getElementById("lawn");
    elem.setAttribute("class","scooping");

    var status=document.getElementById("statusBar");
    status.innerHTML="Please place the poop in the trash.";
    status.setAttribute("class","good");
}

function dispose_poo() {
    //Change the mouse cursor to a trowel
    var elem=document.getElementById("lawn");
    elem.setAttribute("class","notScooping");
    //Update status message for success
    var status=document.getElementById("statusBar");
    status.innerHTML="Nice job!";
    status.setAttribute("class","good");
/*    status.style.transition="all 1.4s ease-in 0s";
    status.style.color="blue";
    status.backgroundClip="Transparent";
    status.style.scale=1;*/

    //Play sounds based on added pet
    var audioplayer=document.getElementById("mp3Audio");
    audioplayer.src="../audio/swoosh.mp3";
    var audiocontroller=document.getElementById("audioController");
    audiocontroller.load();
    audiocontroller.play();

    //Add a small delay to make it more challenging to locate the next poop!
    setTimeout(function(){ make_poo(); },Math.trunc(Math.random()*5000));
}

document.addEventListener("DOMContentLoaded", function() {
    //This function will handle any standard mouse clicks for a non touch device.
    var canvas = document.getElementById('viewport');
    //var ctx = canvas.getContext('2d');

    canvas.addEventListener('click', function (e) {
        checkClicks(e);
    });
});

function checkClicks(e, mode) {
    console.log ("Checking clicks, mode=" + mode);
    //Process starting and ending clicks from both standard and mobile devices.
    var posX = e.clientX;
    var posY = e.clientY;

    //Calculate the offsets for the canvas area.
    var minX=poopX+20;
    var maxX=poopX+20+25;
    var minY=poopY+100;
    var maxY=poopY+100+25;

    //If the user clicked on the "poop", plant a dandilion and update the message.
    if ((posX>=minX && posX<=maxX) && (posY>=minY && posY<=maxY)) {
        console.log ("You scooped the poop!");
        /*console.log("posX vs. MinMaxX: " + posX + ":" + minX + ":" + maxX + "  posY vs. MinMaxY: " + posY + ":" + minY + ":" + maxY);*/
        get_poo(poopX,poopY);
        poopX=0;poopY=0;
    }
    else if ((posX>=720 && posX<=820) && (posY>=100 && posY<=140)) {
        var elem=document.getElementById("lawn");
        if (elem.getAttribute("class")=="scooping") { dispose_poo() }
    }
    else
    {
        var status=document.getElementById("statusBar");
        status.innerHTML="You missed!  posX vs. MinMaxX: " + posX + ":" + minX + ":" + maxX + "  posY vs. MinMaxY: " + posY + ":" + minY + ":" + maxY;
    }
}

document.getElementById("viewport").addEventListener("touchstart", function(e) {
    //The touchstart event can return multiple coordinates, we are taking just the first one.
    var touch = e.touches[0];
    console.log("Touch start");
    checkClicks(touch,"touchstart");
/*
*/

});

document.getElementById("viewport").addEventListener("touchend", function(e) {
    //The touchend event can return multiple coordinates, we are taking just the first one.
    var touch = e.changedTouches[0];
    console.log("Touch end");
    checkClicks(touch,"touchend");
});

