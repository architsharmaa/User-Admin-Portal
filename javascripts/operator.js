
//operator class
class Operator {
    constructor(name, username, password, role) {

        this.name = name;
        this.username = username;
        this.password = password;
        this.role = role;
    }

}

//signup toast
function launch_user_Success_toast() {
    launch_toast('signup-sucess-toast');
}

//signup fail toast
function launch_user_Fail_toast() {
    launch_toast('signup-fail-toast');
}

//fucntion to update the database
function database(payload, role) {

    let data= new Array();  //creating user_records array to store the JSON object
    data=JSON.parse(localStorage.getItem("MobilezDatabase"))?JSON.parse(localStorage.getItem("MobilezDatabase")):[] //putting data from User array into user_records

    //checks if the username exists or not if exists than exits else operates
    if (data.some((ele) => {
            return ele.username == payload.username
        })) {
            launch_user_Fail_toast();


    } else {

        //creates the new operator
        let person = new Operator(payload.name, payload.username, payload.password, role);
        //pushing
        data.push(person);

        // to clear the form for the next entries
        document.forms[0].reset();

        //saving to localStorage
        launch_user_Success_toast();
        localStorage.setItem('MobilezDatabase', JSON.stringify(data));
        

    }
}