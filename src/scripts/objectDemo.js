//SuperType constructor function
function Pets(petName, petType){
    this.petName = petName;
    this.petType = petType;
}

//Run this after all DOM elements are loaded so that we can display any local storage cache.
document.addEventListener("DOMContentLoaded", function(){
    console.log("Page loaded");

    //If there are already pets in the hotel, we need to make this visible and show the count.
    var hotel = localStorage.getItem("PetHotel");
    if (hotel>"") {
        hotel=JSON.parse(hotel);
        if (hotel.length>0) {
            document.getElementById("hotel").style.display="block";
            document.getElementById("hotelmessage").innerHTML=hotel.length + " pet(s) in hotel.";
        }
    }
    //If there are already pets in the hotel, we need to make this visible and show the count.
    var petTimeout = localStorage.getItem("PetTimeout");
    if (petTimeout>"") {
        pet = JSON.parse(petTimeout);
        console.log("Checking object " + pet.petName);
        if (pet) {
            document.getElementById("timeoutmessage").innerHTML=pet.petName + " is on timeout!";
            document.getElementById("timeout").style.display = "block";
        }
    }
});

//SuperType prototype - this function applies to dogs and cats
Pets.prototype.getInfo = function(){
    return this.petName;// + " " + this.petType;
};

//-------------------------------------------------
//SubType constructor function for a Cat object
//-------------------------------------------------
function Cat(petName, petType, canScratch){
    //Inherit instance properties
    Pets.call(this, petName, petType);
    this.canScratch = canScratch;
}
//Now that everything is defined, we can create the actual Cat javascript Object.
Cat.prototype = Object.create(Pets.prototype);

//In addition to the base properties of Pets, we are adding a getCanScratch getter to the Cat.
Cat.prototype.getCanScratch = function() {
    return this.canScratch;
};

//In addition to the base properties of Pets, we are adding a custom method to identify the image for a cat.
Cat.prototype.getImage = function() {
    console.log("getCanScratch=" + this.getCanScratch());
    if (!this.getCanScratch())
       return "cat.jpg";
    else
        return "meancat.jpg";
};

//In addition to the base properties of Pets, we are adding a custom method to identify the audio file for a cat.
Cat.prototype.getAudio = function() {
    if (!this.getCanScratch())
        return "cat-meow.mp3";
    else
        return "tom-cat.mp3";
};

//-------------------------------------------------
//SubType constructor function for a Dog object
//-------------------------------------------------
function Dog(petName, petType, canBark){
    //Inherit instance properties
    Pets.call(this, petName, petType);
    this.canBark = canBark;
}
//Now that everything is defined, we can create the actual Dog javascript Object.
Dog.prototype = Object.create(Pets.prototype);

//In addition to the base properties of Pets, we are adding a getCanBark getter to the Dog.
Dog.prototype.getCanBark = function() {
    return this.canBark;
};

//In addition to the base properties of Pets, we are adding a custom method to identify the image for a dog.
Dog.prototype.getImage = function() {
    //console.log("getCanBark=" + this.getCanBark());
    if (!this.getCanBark())
        return "dog.jpg";
    else
        return "barkingdog.jpg";
};

//In addition to the base properties of Pets, we are adding a custom method to identify the image for a dog.
Dog.prototype.getAudio = function() {
    //console.log("getCanBark=" + this.getCanBark());
    if (!this.getCanBark())
        return "puppy-barking.mp3";
    else
        return "dog-barking.mp3";
};

function createPet(type) {
    //Validate the pet name which must be present
    var sPetName=document.getElementById("inputPetName").value;
    if (sPetName.length===0)
    {
        alert ("Error, name missing"); return;
    }
    var pet;

    switch (type) {
        case "Cat" : pet = new Cat(sPetName,"Cat",false); break;
        case "ScratchingCat" : pet = new Cat(sPetName,"Cat",true); break;
        case "Dog" : pet = new Dog(sPetName,"Dog",false); break;
        case "BarkingDog" : pet = new Dog(sPetName,"Dog",true); break;
        default:
            alert("Invalid pet type."); return;
    }
    addPetToList(pet,"petObjectsHome");
}

//function to rotate image
var looper;
var degrees = 0;
function rotateImage(el,speed) {
    var elem =document.getElementById(el);
    elem.style.transform = "rotate("+degrees+"deg)";
    looper = setTimeout('rotateImage(\''+el+'\','+speed+')',speed);
    //console.log("degrees=" + degrees);
    degrees++;
    if(degrees > 60){
        degrees = -60;
    }
}

function addPetToList(pet,list) {
    // Create a new list item to hold the pet
    var node = document.createElement("LI");

    if (pet instanceof Cat) {
        node.setAttribute("class","cat");
    }
    else if (pet instanceof Dog) {
        node.setAttribute("class","dog");
    }
    else
    {
        console.log("Invalid pet type");
        return;
    }

    //console.log ("Pet image is " + pet.getImage());
    //Add an image to the pet
    var petImage = document.createElement("img");
    petImage.src="../img/" + pet.getImage();
    petImage.setAttribute("height", "90");
    petImage.setAttribute("width", "90");
    petImage.setAttribute("id",pet.getInfo()+"img");
    node.appendChild(petImage);

    node.setAttribute("id",pet.getInfo());

    //Code to animate pet when mouse comes over it.
    node.addEventListener('mouseenter', function(e) {
        console.log ("event fired " + e);
        var elem = document.getElementById(e.target.id +"img");
        elem.style.transition="all 0.4s ease-in 0s";
        elem.style.height="100px";
        elem.style.width="100px";
        rotateImage(e.target.id +"img",23);
    }, false);

    // Append the text to <li>
    var textnode = document.createTextNode(pet.getInfo());

    // Create a text node with the name of the pet
    node.appendChild(textnode);
    var nodeButton;

    //Create a button to remove the pet
    nodeButton = document.createElement("button");
    nodeButton.innerHTML="Sell Pet";
    nodeButton.className = "button";
    node.appendChild(nodeButton);

    //This will make our remove button work when it is clicked
    nodeButton.addEventListener('click', function(e) {
        e.currentTarget.parentNode.remove();
    }, false);

    // Add a timeout button
    nodeButton = document.createElement("button");
    nodeButton.innerHTML="Timeout";
    nodeButton.className = "button";
    node.appendChild(nodeButton);

    //This will make our timeout button work when it is clicked
    nodeButton.addEventListener('click', function(e) {
        if (localStorage.getItem("PetTimeout")>"") {
            alert ("Please reconsider placing two bad pets in the same timeout spot.");
            document.getElementById("timeout").style.display="inline";
            return;
        }

        localStorage.setItem("PetTimeout",JSON.stringify(pet));
        document.getElementById("timeoutmessage").innerHTML=pet.petName + " is on timeout!";
        document.getElementById("timeout").style.display="inline";
        console.log("local storage PetTimeout updated to: " + localStorage.getItem("PetTimeout"));
        e.currentTarget.parentNode.remove();
    }, false);


    // Add a hotel button
    nodeButton = document.createElement("button");
    nodeButton.innerHTML="Hotel";
    nodeButton.className = "button";
    node.appendChild(nodeButton);

    //This will make our hotel button work when it is clicked
    nodeButton.addEventListener('click', function(e) {
        //Make an array of pets with one element
        var pets=[];
        pets.push(pet);

        //Add pets already in the hotel to the array
        hotel=localStorage.getItem("PetHotel");
        if (hotel>"") {
            hotel=JSON.parse(hotel);
            hotel.forEach(function(item) {
                pets.push(item);
            });
        }
        //Save array of pets to localstorage
        localStorage.setItem("PetHotel",JSON.stringify(pets));
        document.getElementById("hotelmessage").innerHTML=pets.length + " pet(s) in hotel.";
        document.getElementById("hotel").style.display="inline";
        e.currentTarget.parentNode.remove();
    }, false);

    // Append the node to the designated list
    document.getElementById(list).appendChild(node);
    var audioplayer=document.getElementById("mp3Audio");
    audioplayer.src="../audio/" + pet.getAudio();
    var audiocontroller=document.getElementById("audioController");
    audiocontroller.load();
    audiocontroller.play();
}

function RetrievePetFromTimeout() {
    var petTimeout = localStorage.getItem("PetTimeout");

    if (petTimeout === "" || petTimeout == null) {
        alert("You do not have a pet in timeout.");
        return;
    }

    pet = JSON.parse(petTimeout);
    console.log("Timeout has ended for: " + pet);
    if (!pet instanceof Pets) {
        alert("You do not have a pet in timeout.");
    } else {
        console.log(pet);
        if (pet.petType === "Dog") {
            newPet = new Dog(pet.petName, pet.petType, pet.canBark);
        } else {
            newPet = new Cat(pet.petName, pet.petType, pet.canScratch);
        }

        document.getElementById("timeout").style.display="none";
        //console.log("Retrieving " + newPet.petName);
        addPetToList(newPet,"petObjectsHome");

        //Clear out the hotel
        localStorage.setItem("PetTimeout", "");
    }
}

    function RetrievePetsFromHotel() {
        var hotel = localStorage.getItem("PetHotel");

        if (hotel === "") {
            alert("You have no pets in the hotel");
            return;
        }
        else
        {
            hotel=JSON.parse(hotel);
            hotel.forEach(function(pet) {
                console.log("Retrieved from hotel: " + pet);

                if (!pet instanceof Pets) {
                    console.log("skipping retrieving invalid pet from hotel");
                }
                else
                {
                    if (pet.petType === "Dog") {
                        newPet = new Dog(pet.petName, pet.petType, pet.canBark);
                    } else {
                        newPet = new Cat(pet.petName, pet.petType, pet.canScratch);
                    }
                    console.log("Retrieving " + newPet.petName);
                    addPetToList(newPet, "petObjectsHome");
                }
            });
        }
    document.getElementById("hotel").style.display="none";
    //Clear out the hotel
    localStorage.setItem("PetHotel", "");
}