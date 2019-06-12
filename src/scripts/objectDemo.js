//SuperType constructor function
function Pets(petName, petType){
    this.petName = petName;
    this.petType = petType;
}

document.addEventListener("DOMContentLoaded", function(){
    console.log("Page loaded");
});

//SuperType prototype - this function applies to dogs and cats
Pets.prototype.getInfo = function(){
    return this.petName;// + " " + this.petType;
}

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
}

//In addition to the base properties of Pets, we are adding a custom method to identify the image for a dog.
Dog.prototype.getImage = function() {
    console.log("getCanBark=" + this.getCanBark());
    if (!this.getCanBark())
        return "dog.jpg";
    else
        return "barkingdog.jpg";
};

function createPet(type) {
    //Validate the pet name which must be present
    var sPetName=document.getElementById("inputPetName").value;
    if (sPetName=="")
    {
        alert ("Error, name missing"); return;
    }

    switch (type) {
        case "Cat" : var pet = new Cat(sPetName,"Cat",false); break;
        case "ScratchingCat" : var pet = new Cat(sPetName,"Cat",true); break;
        case "Dog" : var pet = new Dog(sPetName,"Dog",false); break;
        case "BarkingDog" : var pet = new Dog(sPetName,"Dog",true); break;
        default:
            alert("Invalid pet type."); return;
    }
    addPetToHome(pet);
}

function addPetToHome(pet) {
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

    console.log ("Pet image is " + pet.getImage());
    //Add an image to the pet
    var petImage = document.createElement("img");
    petImage.src="../img/" + pet.getImage();
    petImage.setAttribute("height", "90");
    petImage.setAttribute("width", "90");
    node.appendChild(petImage);

    // Append the text to <li>
    var textnode = document.createTextNode(pet.getInfo());         // Create a text node
    node.appendChild(textnode);

    //Create a button to remove the pet
    var nodeButton = document.createElement("button");
    nodeButton.innerHTML="Sell Pet";
    nodeButton.className = "button";
    node.appendChild(nodeButton);

    //This will make our remove button work when it is clicked
    nodeButton.addEventListener('click', function(e) {
        e.currentTarget.parentNode.remove();
    }, false);

    // Add a store button
    var nodeButton = document.createElement("button");
    nodeButton.innerHTML="Day Care";
    nodeButton.className = "store";
    node.appendChild(nodeButton);

    //This will make our store button work when it is clicked
    nodeButton.addEventListener('click', function(e) {
        if (localStorage.getItem("PetHotel")>"") {
            alert ("There is already a pet in your hotel.   Operation failed.");
            return;
        }

        localStorage.setItem("PetHotel",JSON.stringify(pet));
        console.log("local storage PetHotel updated to: " + localStorage.getItem("PetHotel"));
        e.currentTarget.parentNode.remove();
    }, false);


    // Append the text to the pet list
    document.getElementById("petObjects").appendChild(node);     // Append <li> to <ul> with id="myList"

    //document.getElementById("output").innerHTML="Added a new cat named " + Cat1.getInfo() + " " + warning;

}
function RetrieveStoredPets() {
   var hotel=localStorage.getItem("PetHotel");

   if (hotel=="") {
       alert("You have no pets in the hotel");
       return;
   }

   pet =JSON.parse(hotel);
   console.log ("Retrieved from hotel: " + pet);
   if (!pet instanceof Pets) {
       alert("The hotel is empty.");
   }
   else {
       if (pet.petType=="Dog") {
            newPet=new Dog(pet.petName,pet.petType,pet.canBark);
       }
       else {
           newPet=new Cat(pet.petName,pet.petType,pet.canScratch);
       }

       console.log("Retrieving " + newPet.petName);
       addPetToHome(newPet);
       //Clear out the hotel
       localStorage.setItem("PetHotel","");
   }

}