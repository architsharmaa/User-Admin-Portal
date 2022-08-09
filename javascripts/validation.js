//basic toasting function
function launch_toast(elementID) {
    var x = document.getElementById(elementID);
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

//functiont to call login failed toast

function login_toast(){
    launch_toast("login-toast")
}

//fucntion to call logout sucess toast

function logout_toast(){
    launch_toast("logout-toast")
}

//get button element
var signUpButton = document.getElementById("login-button");

//setting error border by adding error class accordingly
function setError(parentDiv, errorDiv){
    parentDiv.classList.remove("success");
    parentDiv.classList.add("error");
    errorDiv.innerHTML = 'Please enter your name';
}

//setting success border by adding success class accordingly
function setSuccess(parentDiv, errorDiv){
    errorDiv.innerHTML = '';
    parentDiv.classList.remove("error");
    parentDiv.classList.add("success");
}

//function to cient side validate name without submitting
function nameValidation(){

    //fetching details for the name - input
    let input = document.getElementById('name-input');
    var parentDiv = input.parentElement;
    let errorDiv = document.getElementById('name-error');
    
    //regular expression pattern
    var nameRegularExpression = /^[\\a-zA-z .'-]+$/;

    if (input.value === '') { 
        setError(parentDiv, errorDiv);
        signUpButton.disabled = true;
      }
    else {
        //checking for name regular expression
        if(!nameRegularExpression.test(input.value)) {
            setError(parentDiv, errorDiv);
            signUpButton.disabled = true;
        }
        else {
            setSuccess(parentDiv, errorDiv);
            signUpButton.disabled = false;
        }
    }

}

//function to cient side validate username without submitting
function usernameValidation(){

    //fetching details for the username - input
    let input = document.getElementById('username-input');
    var parentDiv = input.parentElement;
    let errorDiv = document.getElementById('username-error');
    
    if (input.value === '') { 
        setError(parentDiv, errorDiv);
        signUpButton.disabled = true;
      }
    else {
        //setting suceess to it
        setSuccess(parentDiv, errorDiv);
        signUpButton.disabled = false;
    }
}

//function to cient side validate username without submitting
function passwordValidation(){

    //fetching details for the password - input
    let input = document.getElementById('password-input');
    var parentDiv = input.parentElement;
    let errorDiv = document.getElementById('password-error');
    
    //regular expression pattern
    var passwordRegularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    if (input.value === '') { 
        setError(parentDiv, errorDiv);
        signUpButton.disabled = true;
      }
    else {
        //checking for name regular expression
        if(!passwordRegularExpression.test(input.value)) {
            setError(parentDiv, errorDiv);
            signUpButton.disabled = true;
        }
        else {
            setSuccess(parentDiv, errorDiv);
            signUpButton.disabled = false;
        }
    }
}

    

//function to validate the siging of the user and admin
function signupValidation(e, role) {

    //stops default nature of the form
    e.preventDefault();
    
    
    let password = document.forms["signup"]["password-input"].value;
    let username = document.forms["signup"]["username-input"].value;
    let name = document.forms["signup"]["name-input"].value;
    
    if(password == '' || username == '' || name == ''){

        launch_user_Fail_toast();
        
    }

    else{
        signUpButton.disabled = false;
        database({name, username, password},role);
        setTimeout(location.reload.bind(location), 2000);
    }

  
  }


//fucntion to validate the login of user or admin
function loginvalidation(e, role){

    //prevents dedault behaviour
    e.preventDefault();

    //gets input from the form
    let inputPassword = document.forms["login"]["password-input"].value;
    let inputUsername = document.forms["login"]["username-input"].value;
    
    //gets data from the local data storage
    data = JSON.parse(localStorage.getItem('MobilezDatabase'));
    
    //checks the uername and password entered in the local data
    let processAdmins = data.filter((ele) => {return ele.role === role && (ele.username === inputUsername && ele.password === inputPassword)});

    //if there is a match
    if(processAdmins.length == 1){

        //set temp variables in local storage to be accessed
        localStorage.setItem('FullName', processAdmins[0].name);
        localStorage.setItem('Username', processAdmins[0].username);
        localStorage.setItem('Role', processAdmins[0].role);
        localStorage.setItem('Password', processAdmins[0].password);

        //if the passed role is admin redirects you to admin dashboard
        if(role == 'admin'){
            //set temp variables in local storage to be accessed
            localStorage.setItem('adminFullName', processAdmins[0].name);
            localStorage.setItem('adminUsername', processAdmins[0].username);
            localStorage.setItem('adminRole', processAdmins[0].role);
            localStorage.setItem('adminPassword', processAdmins[0].password);
            window.location.href = 'adminDashboard.html';
        }

        //if the passed role is user redirects you to user dashboard
        if(role == 'user'){
            window.location.href = 'userdashboard.html';
        }
               
    }

    else{
        login_toast();
    }

}


//function to logout the user / admin
function logoutUser(){

    //gets role for re-routing path
    let role = localStorage.getItem('Role');

    //destroying the local variable / credentails of the user
    localStorage.removeItem('FullName');
    localStorage.removeItem('Username');
    localStorage.removeItem('Role');
    localStorage.removeItem('Password');

    //logouts admin roles if presernt
    if(localStorage.getItem('adminFullName') != null){
    localStorage.removeItem('adminFullName');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminPassword');
    }

    //routes you too index page when logout if you admin
    if(role == 'admin'){
        logout_toast();

        //function to wait and pause to stop execution
        function waitandpause() {
            window.location.href = 'adminform.html'
        }
        
        // stop for sometime if needed
        setTimeout(waitandpause, 2000);
    
    }

    //routes to to uerform when logiut if you user
    if(role == 'user'){
        logout_toast();
        //function to wait and pause to stop execution
        function waitandpause() {
            window.location.href = 'userform.html'
        }
        
        // stop for sometime if needed
        setTimeout(waitandpause, 2000);;
       
    }  
    
}


