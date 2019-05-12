//SuperType constructor function
function Pets(petName, petType){
    this.petName = petName,
    this.petType = petType
}

//SuperType prototype
Pets.prototype.getInfo = function(){
    return this.petName + " " + this.petType;
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
Cat.prototype = Object.create(Pets.prototype)

//In addition to the base properties of Pets, we are adding a getCanScratch getter to the Cat.
Cat.prototype.getCanScratch = function() {
    return this.canScratch;
}

//-------------------------------------------------
//SubType constructor function for a Dog object
//-------------------------------------------------
function Dog(petName, petType, canBark){
    //Inherit instance properties
    Pets.call(this, petName, petType);
    this.canBark = canBark;
}
//Now that everything is defined, we can create the actual Dog javascript Object.
Dog.prototype = Object.create(Pets.prototype)
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
    var sPetName=document.getElementById("inputPetName").value;
    if (sPetName=='')
    {
        alert ("Error, name missing"); return;
    };
    var scratches=document.getElementById("scratches").checked;

    var Cat1= new Cat(sPetName, "Cat", scratches);  //We are saying that "Tiger" is not the scratching kind of cat by passing false.
    //console.log(Cat1.getInfo());
    //console.log("Can Scratch: " + Cat1.getCanScratch());
    var warning="";
    if (Cat1.getCanScratch()) warning="Warning - This cat can scratch!";

    var node = document.createElement("LI");                 // Create a <li> node
    var textnode = document.createTextNode(Cat1.getInfo() + " " + warning);         // Create a text node
    node.appendChild(textnode);                              // Append the text to <li>
    document.getElementById("catObjects").appendChild(node);     // Append <li> to <ul> with id="myList"

    //document.getElementById("output").innerHTML="Added a new cat named " + Cat1.getInfo() + " " + warning;
}

//Ditto, for Dogs
function CreateDog() {
    var sPetName=document.getElementById("inputPetName").value;
    if (sPetName=='')
    {
        alert ("Error, name missing"); return;
    };
    var barks=document.getElementById("barks").checked;

    var Dog1= new Dog(sPetName, "Dog", true);  // Ralph is a dog who likes to bark a lot.
    //console.log(Dog1.getInfo());
    //console.log("Can Bark: " + Dog1.getCanBark());
    var warning="";
    if (Dog1.getCanBark()) warning="Warning - This dog has a barking problem!";

    var node = document.createElement("LI");                 // Create a <li> node
    var textnode = document.createTextNode(Dog1.getInfo() + " " + warning);         // Create a text node
    node.appendChild(textnode);                              // Append the text to <li>
    document.getElementById("dogObjects").appendChild(node);     // Append <li> to <ul> with id="myList"
}


