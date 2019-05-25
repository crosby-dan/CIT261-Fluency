//SuperType constructor function
function Pets(petName, petType){
    this.petName = petName;
    this.petType = petType;
}

//SuperType prototype
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
    this.petImage="cat.jpg";
}
//Now that everything is defined, we can create the actual Cat javascript Object.
Cat.prototype = Object.create(Pets.prototype);

//In addition to the base properties of Pets, we are adding a getCanScratch getter to the Cat.
Cat.prototype.getCanScratch = function() {
    return this.canScratch;
};

//-------------------------------------------------
//SubType constructor function for a Dog object
//-------------------------------------------------
function Dog(petName, petType, canBark){
    //Inherit instance properties
    Pets.call(this, petName, petType);
    this.canBark = canBark;
    this.petImage="dog.jpg";
}
//Now that everything is defined, we can create the actual Dog javascript Object.
Dog.prototype = Object.create(Pets.prototype);
//In addition to the base properties of Pets, we are adding a getCanBark getter to the Dog.
Dog.prototype.getCanBark = function() {
    return this.canBark;
}



//Sample code to create a Cat and log it to the console
//var Cat1= new Cat("Tiger", "Cat", false);  //We are saying that "Tiger" is not the scratching kind of cat by passing false.
//console.log("Can Scratch: " + Cat1.getCanScratch());
//console.log(Cat1.getInfo());

//Based on an HTML button click, create an instance of Cat (which is a sub type of Pets)
function CreateCat() {
    //Validate the pet name which must be present
    var sPetName=document.getElementById("inputPetName").value;
    if (sPetName.length=0)
    {
        alert ("Error, name missing"); return;
    }

    //Determine if this cat has a scratching problem
    var scratches=document.getElementById("scratches").checked;

    //Instantiate the Cat, which inherits from pet
    var Cat1= new Cat(sPetName, "Cat", scratches);  //We are saying that "Tiger" is not the scratching kind of cat by passing false.

    console.log(Cat1.getInfo() + " Can Scratch: " + Cat1.getCanScratch());
    var warning="";
    if (Cat1.getCanScratch()) warning="Scratch warning!";

    // Create a new list item to hold the pet
    var node = document.createElement("LI");
    node.setAttribute("class","cat")

    //Add an image to the pet
    var petImage = document.createElement("img");
    petImage.setAttribute("src", "../img/cat.jpg");
    petImage.setAttribute("height", "60");
    petImage.setAttribute("width", "60");
    node.appendChild(petImage);

    // Append the text to <li>
    var textnode = document.createTextNode(Cat1.getInfo() + " " + warning);         // Create a text node
    node.appendChild(textnode);

    //Create a button to remove the pet
    var nodeButton = document.createElement("button");
    nodeButton.innerHTML="remove";
    nodeButton.className = "button";
    node.appendChild(nodeButton);

    //This will make our remove button work when it is clicked
    nodeButton.addEventListener('click', function(e) {
        e.currentTarget.parentNode.remove();
    }, false);

    // Append the text to the pet list
    document.getElementById("petObjects").appendChild(node);     // Append <li> to <ul> with id="myList"

    //document.getElementById("output").innerHTML="Added a new cat named " + Cat1.getInfo() + " " + warning;
}

//Ditto, for Dogs
function CreateDog() {
    var sPetName=document.getElementById("inputPetName").value;
    if (sPetName.length=0)
    {
        alert ("Error, name missing"); return;
    }

    //Determine if this dog has a barking problem
    var barks=document.getElementById("barks").checked;

    //Instantiate a dog object
    var Dog1= new Dog(sPetName, "Dog", barks);  // Ralph is a dog who likes to bark a lot.

    //Set variable for warning message as needed
    console.log(Dog1.getInfo()+" Can Bark: " + Dog1.getCanBark());
    var warning="";
    if (Dog1.getCanBark()) warning="Bark warning!";

    //Create a list item to hold the pet
    var node = document.createElement("LI");
    node.setAttribute("class","dog")

    //Add an image to the pet
    var petImage = document.createElement("img");
    petImage.setAttribute("src", "../img/dog.jpg");
    petImage.setAttribute("height", "60");
    petImage.setAttribute("width", "60");
    node.appendChild(petImage);

    // Create a text node with the pet name and warning
    var textnode = document.createTextNode(Dog1.getInfo() + " " + warning);
    node.appendChild(textnode);

    // Add a remove button
    var nodeButton = document.createElement("button");
    nodeButton.innerHTML="remove";
    nodeButton.className = "button";
    node.appendChild(nodeButton);

    //This will make our remove button work when it is clicked
    nodeButton.addEventListener('click', function(e) {
        e.currentTarget.parentNode.remove();
    }, false);

    // Append the text to the pet list
    document.getElementById("petObjects").appendChild(node);     // Append <li> to <ul> with id="myList"
}

