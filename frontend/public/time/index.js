import "./time-component.js"

function myFunction() {
    document.getElementById("time-component").innerHTML = "<time-component time-attribute='0'></time-component>";
  }

setTimeout(myFunction, 500);
