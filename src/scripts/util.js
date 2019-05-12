var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
function SetCurDate() {
    var d = new Date();
    var n = weekday[d.getDay()];
    n=n+ ", ";
    n=n+ d.getDate() + " ";
    n=n+ months[d.getMonth()] + " ";
    n=n+ d.getFullYear();
    document.getElementById("currentDate").innerHTML = "Loaded " + n;
}


