//getting button variablees
var loginButton = document.getElementById("loginButton");
var registerButton = document.getElementById("registerButton");

//flipping functionality for the signup form
loginButton.onclick = function(){
	document.querySelector("#flipper").classList.toggle("flip");
}

//flipping functionality for the signup form
registerButton.onclick = function(){
	document.querySelector("#flipper").classList.toggle("flip");
}

//creates hamburger navbar
function myFunction() {
	var x = document.getElementById("navbar");
	if (x.className === "navbar") {
	  x.className += " responsive";
	} else {
	  x.className = "topnav";
	}
  }
