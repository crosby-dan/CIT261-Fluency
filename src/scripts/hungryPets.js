function make_hungry(pet) {
    /*console.log ("audio file=" + pet.getAudioHungry());*/
    var audioplayer=document.getElementById("mp3Audio");
    audioplayer.src="../audio/" + pet.getAudioHungry();
    var audiocontroller=document.getElementById("audioController");
    audiocontroller.load();
    audiocontroller.play();

    var elem = document.getElementById(pet.petName);
    //console.log (elem);
    elem.className = "Hungry";

    //Add a food bowl button to the pet
    var petFoodBtn = document.createElement("img");
    petFoodBtn.src="../img/food.jpg";
    petFoodBtn.setAttribute("height", "45");
    petFoodBtn.setAttribute("width", "45");
    petFoodBtn.setAttribute("id",pet.getInfo()+"foodimg");
    petFoodBtn.setAttribute("class","food");
    elem.appendChild(petFoodBtn);
    petFoodBtn.addEventListener('click', function(e) {
        //If the food button is clicked, transition back to a not hungry state for the pet and remove the food button.
        e.currentTarget.parentNode.setAttribute("class","notHungry");
        e.currentTarget.remove();

        //Play the sound of pets eating
        var audioplayer=document.getElementById("mp3Audio");
        audioplayer.src="../audio/" + pet.getAudioEating();
        var audiocontroller=document.getElementById("audioController");
        audiocontroller.load();
        audiocontroller.play();

        //Trigger the hungry cycle to start over
        setTimeout(function(){ make_hungry(pet); },30000 + Math.trunc(Math.random()*30000));

    }, false);
}