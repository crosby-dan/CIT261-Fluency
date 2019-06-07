function CreateJSON() {

}

function LoadFromDisk() {
    var request = new XMLHttpRequest();
    var requestURL = '../json/superheroes.json';
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        console.log ("running Load from disk");
        var jsonObj=request.response;
        var outputField = document.getElementById('myOutput');
        outputField.innerHTML=JSON.stringify(jsonObj);
        console.log("Results for test #2");
        console.log(jsonObj);
    }
}

function LoadFromWeb() {
    var request = new XMLHttpRequest();
    var requestURL = 'http://dummy.restapiexample.com/api/v1/employees'
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        console.log ("running Load from web");
        var jsonObj=request.response;
        console.log("Results for test #5");
        console.log(jsonObj);

        var sel = document.getElementById("output5a")

        for (i=0; i<jsonObj.length; i++) {
            option = document.createElement('option');
            option.text = jsonObj[i].employee_name;
            option.value = jsonObj[i].id;
            sel.add(option);
        }

        for (var key in jsonObj[0]) {
            if (jsonObj[0].hasOwnProperty(key)) {
                console.log(key + " -> " + jsonObj[0][key]);
            }
        }
    }
}

function LoadPokemonsFromWeb() {
    var request = new XMLHttpRequest();
    var requestURL = 'https://pokeapi.co/api/v2/pokemon/'
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        console.log ("running Load Pokemon from web");
        var jsonObj=request.response;
        console.log("Results for test #7");
        console.log(jsonObj);

        console.log("test output");
        console.log(jsonObj.results[5].name);
        var sel = document.getElementById("output7");

        for (i=0; i<jsonObj.results.length; i++) {
            console.log("test output");
            console.log(jsonObj.results[i].name);
            option = document.createElement('option');
            option.text = jsonObj.results[i].name;
            option.value = i+1;
            sel.add(option);
        }

        for (var key in jsonObj[0]) {
            if (jsonObj[0].hasOwnProperty(key)) {
                console.log(key + " -> " + jsonObj[0][key]);
            }
        }
    }
}


function LoadEEFromWeb(id) {
    console.log ("ID = " + id);
    var request = new XMLHttpRequest();
    var requestURL = 'http://dummy.restapiexample.com/api/v1/employee/' + id ;
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        console.log ("running Load from web");
        var jsonObj=request.response;
        var outputField = document.getElementById('myOutput6');
        outputField.innerHTML=JSON.stringify(jsonObj);
        console.log("Results for test #6");
        console.log(jsonObj);
    }
}

function LoadPokemonFromWeb(id) {
    console.log ("ID = " + id);
    var request = new XMLHttpRequest();
    var requestURL = 'https://pokeapi.co/api/v2/pokemon/' + id ;
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        console.log ("running Load from web");
        var jsonObj=request.response;
        var outputField = document.getElementById('myOutput8');
        outputField.innerHTML=JSON.stringify(jsonObj);
        console.log("Results for test #8");
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

    }
    catch (ex) {
        output2.innerHTML ="Failed to convert JSON: " + ex.message + "\nTry refreshing this page and running step 1 first."
    }
}

function createJSONfromForm () {

    var output3 = document.getElementById("myOutput3");
    var obj = new Object();
    for (i=0;i<3;i++) {
        var member = new Object();
        member.name=document.getElementById("f" + (i+1) + "Name").value;
        member.age =document.getElementById("f" + (i+1) + "Age").value;
        obj[i]=member;
    }
    var obj2 = new Object();
    obj2 = { "members":obj};
    console.log(obj2);
    output3.innerHTML=JSON.stringify(obj2);
}
