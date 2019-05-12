objectPet = {
    petName: function(){
        return this.petName;
    }
}

var myPet = Object.create(objectPet, {
    'petName': {
        value: "Tiger",
        writable: true,
        enumerable: true
    }
})

console.log(myPet);
console.log(myPet.petName());
