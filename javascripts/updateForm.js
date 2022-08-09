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

function validateNameChange(){

    let currentInput = localStorage.getItem('FullName');

    //fetching details for the name - input
    let input = document.getElementById('name-input');
    var parentDiv = input.parentElement;
    let errorDiv = document.getElementById('name-error');
    
    //regular expression pattern
    var nameRegularExpression = /^[\\a-zA-z .'-]+$/;

    if(input.value === currentInput){
        setError(parentDiv, errorDiv);
        signUpButton.disabled = true;
    }  
    else {
        if (input.value === '') { 
            setError(parentDiv, errorDiv);
            signUpButton.disabled = true;
          }
        else{
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

}

//function to cient side validate username without submitting
function validateUsernameChange(){

    let currentInput = localStorage.getItem('Username');

    //fetching details for the username - input
    let input = document.getElementById('username-input');
    var parentDiv = input.parentElement;
    let errorDiv = document.getElementById('username-error');
    
    if(input.value === currentInput){
        setError(parentDiv, errorDiv);
        signUpButton.disabled = true;
    }  
    
    else{
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
}

//function to cient side validate username without submitting
function validatePasswordChange(){

    let currentInput = localStorage.getItem('password');

    //fetching details for the password - input
    let input = document.getElementById('password-input');
    var parentDiv = input.parentElement;
    let errorDiv = document.getElementById('password-error');
    
    //regular expression pattern
    var passwordRegularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    if(input.value === currentInput){
        setError(parentDiv, errorDiv);
        signUpButton.disabled = true;
    }

    else{
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

}
    

// updates the data of the user/admin
function updateForm(e, updateType){

    //prevents basic nature
    e.preventDefault();

    //getting input data 
    let inputPassword = document.forms["update-Form"]["password-input"].value;
    let inputUsername = document.forms["update-Form"]["username-input"].value;
    let inputname = document.forms["update-Form"]["name-input"].value;

    //fetching data from the local storage
    data = JSON.parse(localStorage.getItem('MobilezDatabase'));

    //cehcks for the current user/admin or user selected by admin
    let processAdmins = data.filter((ele) => {return ele.username === localStorage.getItem('Username') && ele.password === localStorage.getItem('Password')});

    //if match is found
    if(processAdmins.length == 1){

        for (var i = 0; i < data.length; i++) {
            //look for match with name
            if(localStorage.getItem('Username') === data[i].username){  
                //update
                data[i].username = inputUsername;  
                data[i].password = inputPassword;
                data[i].name = inputname;
                //exist, seach is over
                break;
            }
        }

        
        localStorage.setItem("MobilezDatabase", JSON.stringify(data));

        //updating in local storage for session display
        localStorage.setItem('FullName',inputname);
        localStorage.setItem('Username', inputUsername);
        localStorage.setItem('Password', inputPassword);

        console.log(updateType);
    

       //updating for session display
        if(updateType === 'currentUser' && localStorage.getItem('adminFullName') != null){
            localStorage.setItem('adminFullName',inputname);
            localStorage.setItem('adminUsername', inputUsername);
            localStorage.setItem('adminPassword', inputPassword);
        }
        
        //updates the updated data to local storage
        launch_user_Success_toast();
        
        //function to wait and pause to stop execution
        function waitandpause() {
            location.reload();
        }
        
        // stop for sometime if needed
        setTimeout(waitandpause, 5000);

        //reload the page for display
        
        
    }

    //if some error occured
    else{
        launch_user_Fail_toast();
    }

}
