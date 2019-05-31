function CreateJSON() {

}

function LoadFromDisk() {
    var request = new XMLHttpRequest();
    var requestURL = '../json/superheroes.json';
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var jsonObj=request.response;
        var outputField = document.getElementById('myOutput');
        outputField.innerHTML=JSON.stringify(jsonObj);
        console.log("Results for test #2");
        console.log(jsonObj);
    }
}

function ShowValuesFromJSON() {
    var output2 = document.getElementById("myOutput2")
    try {
        output2.innerHTML=document.getElementById("myOutput").innerHTML;
        var myJSON = JSON.parse(document.getElementById("myOutput").innerHTML);
        var s = "";  //We will use this to accumulate the output

        var t = myJSON["squadName"];
        s = "squadName property = " + myJSON.squadName + "\n";
        s = s + "homeTown property = " + myJSON.homeTown + "\n";
        s = s + "\tSuperhero 1 = " + myJSON.members[0].name + "\n";
        s = s + "\tSuperhero 2 = " + myJSON.members[1].name + "\n";
        s = s + "\tSuperhero 3 = " + myJSON.members[2].name + "\n";
        output2.innerHTML = s;

        //s= s + "\n\n"
        //for (x in myJSON) {
        //
        //    s += myJSON[x];
        //}

    }
    catch (ex) {
        output2.innerHTML ="Failed to convert JSON: " + ex.message;
    }
}

function createJSONfromForm () {

    var output3 = document.getElementById("myOutput3")
    var obj = new Object();
    var member = new Object();



}
