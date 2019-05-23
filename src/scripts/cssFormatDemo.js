var mySelect = document.getElementById('myStyle');
console.log (mySelect);

mySelect.onchange = function () {
    switch (this.selectedIndex) {
        case 1:   document.getElementById("petObjects").style.color="blue"; break;
        case 2:   document.getElementById("petObjects").style.color="red"; break;
        case 3:   document.getElementById("petObjects").style.fontSize = "40px"; break;
        case 4:   document.getElementById("petObjects").style.fontSize = "14px"; break;
        case 5:   document.getElementById("petObjects").style.backgroundColor = "coral"; break;
        case 6:   document.getElementById("petObjects").style.backgroundColor = "transparent"; break;
    }
}