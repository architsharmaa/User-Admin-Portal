//search functionality over users table
function searchPerson() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("displayTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

//function to remove the users
function removeItemOnce(index) {

    //uses splice to run the course
    if (index > -1) {
        recordss.splice(index, 1);
        localStorage.setItem("MobilezDatabase", JSON.stringify(recordss));
        document.location.reload(true)
    }
    return recordss;
}


//fucntion to updates the user values
function updateUser(index) {

    // destroys the current local storage values and updates the user with value
    if (index > -1) {
        localStorage.removeItem('FullName');
        localStorage.removeItem('Username');
        localStorage.removeItem('Role');
        localStorage.removeItem('Password');

        localStorage.setItem('FullName', recordss[index].name);
        localStorage.setItem('Username', recordss[index].username);
        localStorage.setItem('Role', recordss[index].role);
        localStorage.setItem('Password', recordss[index].password);

        window.location.href = 'updateForm.html';
    }

}