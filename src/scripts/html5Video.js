
document.addEventListener("DOMContentLoaded", function(){
    console.log("Page loaded 2");
});


function playPause() {
    var myVideo = document.getElementById("tomjerry");

    if (myVideo.paused)
        myVideo.play();
    else
        myVideo.pause();
}

function playerBig() {
    var elem=document.getElementById("tomjerry");
    elem.style.transition="all .5s ease-in 0s";
    elem.style.width="250px";

    //we also need to make the div taller
    var elem2=document.getElementById("wrapper");
    elem2.style.transition="all .5s ease-in 0s";
    elem2.style.height="300px";
}

function playerCompact() {
    var elem=document.getElementById("tomjerry");
    elem.style.transition="all .8s ease-in 0s";
    elem.style.width="160px";

    //we also need to make the div shorter
    var elem2=document.getElementById("wrapper");
    elem2.style.transition="all .8s ease-in 0s";
    elem2.style.height="230px";
}

function toggleTheater() {
    var elem=document.getElementById("wrapper");
    console.log(elem.style);
    if (elem.style.height>"0px") {
        elem.style.transition="all 1.1s ease-in 0s";
        elem.style.overflow=false;
        elem.style.height="0";
    }
    else {
        elem.style.transition="all 1.1s ease-in 0s";
        elem.style.height="230px";

        //We need to reset the height in case it was made big before the theater was hidden.
        var elem2=document.getElementById("tomjerry");
        elem2.style.width="160px";
    }
}