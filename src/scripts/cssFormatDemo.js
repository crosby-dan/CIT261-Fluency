//the mySelect object is the HTML select box that allows choosing the CSS Style.
var mySelect = document.getElementById('myStyle');
var styleCats = document.getElementById('styleCats');
var styleDogs = document.getElementById('styleDogs');

//When the check boxes or mySelectBox change, run the changeCss code.
mySelect.onchange = function () { changeCss(this.selectedIndex) }
styleCats.onchange = function () { changeCss(mySelect.selectedIndex) }
styleDogs.onchange = function () { changeCss(mySelect.selectedIndex) }

function changeCss(styleIndex) {
    //styleCats and styleDogs are checkboxes that determine to which pets the formatting changes should apply.
    console.log ("Checkboxes: Dogs=" + styleDogs.checked + " Cats=" + styleCats.checked);

    if (styleCats.checked && styleDogs.checked)
    {
        var myElements=document.querySelectorAll(".cat, .dog");
        console.log("Both=" + myElements.length);
    }
    else if (styleDogs.checked) {
        var myElements = document.querySelectorAll('.dog');
        console.log("Dogs=" + myElements.length);
    }
    else if (styleCats.checked)
    {
        var myElements = document.querySelectorAll('.cat');
        console.log("Cats=" + myElements.length);
    }
    else return;

    for(var i = myElements.length - 1; i >= 0; --i)
    {
        switch (styleIndex) {
            case 1:   myElements[i].style.color="blue"; break;
            case 2:   myElements[i].style.color="red"; break;
            case 3:   myElements[i].style.fontSize = "40px"; break;
            case 4:   myElements[i].style.fontSize = "14px"; break;
            case 5:   myElements[i].style.backgroundColor = "coral"; break;
            case 6:   myElements[i].style.backgroundColor = "transparent"; break;
        }
    }

}