function saveToLocalStorage(event){
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const phonenumber = event.target.phonenumber.value;

    const obj ={
            name,
            email,
            phonenumber
    };
    localStorage.setItem(obj.email,JSON.stringify(obj))


    axios.post("https://crudcrud.com/api/9124aa948ad74424818d4e446f666c48/NewData",obj)
     .then((response) =>  {
        showNewUSerOnScreen(response.data)
        console.log(response)
     })
     .catch(err =>{
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong</h4>"
         console.log(err)
     })
    }


    window.addEventListener("DOMContentLoaded", () =>{
        
        axios.get('https://crudcrud.com/api/9124aa948ad74424818d4e446f666c48/NewData')
         .then(response => {
            
            for(var i=0; i<= response.data.length;i++){
                showNewUSerOnScreen(response.data[i])
            }           
         })
         .catch((error) => {
            console.log(error);
         })
         
    })
    function showNewUSerOnScreen(user) {
         
        document.getElementById('email').value ='';
        document.getElementById('username').value ='';
        document.getElementById('phonenumber').value ='';
        //console.log(localStorage.getItem(user.emailId))
        if(localStorage.getItem(user.email) !== null) {
            removeUserFromScreen(user.email)
        }
        
        const parentNode = document.getElementById('listOfUsers');
        const childHTML = `<li id=${user._id}> ${user.name} - ${user.email} 
            <button onclick = deleteUser('${user._id}')> Delete </button>
            <button onclick = editUserDetails('${user.email}','${user.name}','${user.phonenumber}','${user._id}')>Edit User</button> 
            </li>`

        parentNode.innerHTML = parentNode.innerHTML + childHTML;

    }

            function editUserDetails(emailId, name, phonenumber,userId){
            document.getElementById('email').value = emailId;
            document.getElementById('username').value = name;
            document.getElementById('phonenumber').value = phonenumber;
        
            deleteUser(userId)   
        } 

   
    function deleteUser(userId){
     axios.delete(`https://crudcrud.com/api/9124aa948ad74424818d4e446f666c48/NewData/${userId}`)
      .then((response)=>{
        removeUserFromScreen(userId)
      })   
      .catch((err) => {
        console.log(err)
      })

    }

    function removeUserFromScreen(userId){
         const parentNode = document.getElementById('listOfUsers');
         const childNodeToBeDeleted = document.getElementById(userId);
         
         if(childNodeToBeDeleted){
            parentNode.removeChild(childNodeToBeDeleted)
         }
    }