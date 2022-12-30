const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);
userList.addEventListener("click",removeItems);
userList.addEventListener("click",editItem);

// To get detail on screen
axios.get('https://crudcrud.com/api/5f5c4ab67c074290a36d45a323d6e7c0/BookingData')
     .then((response) => {
        showUserOnScreen(response.data);
     })

function onSubmit(e) {
  e.preventDefault();
  if(nameInput.value === '' || emailInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  }
  else {
    myObj =  {
        name: nameInput.value,
        email: emailInput.value
     }

     axios.post('https://crudcrud.com/api/5f5c4ab67c074290a36d45a323d6e7c0/BookingData',myObj)
          .then((response) =>{
            showPost(response.data);
            
            console.log(response);
          })
          .catch((error)=>{
            console.log(error);
          })

  } 

}

function removeItems(e){
    e.preventDefault();
  
    if (e.target.classList.contains('delete')){
        
        var li = e.target.parentElement;
        userList.removeChild(li);
        console.log(li.id);
        axios.delete(`https://crudcrud.com/api/5f5c4ab67c074290a36d45a323d6e7c0/BookingData/${li.id}`)
    }

}

function editItem(e){
  e.preventDefault();
  if (e.target.classList.contains('edit')){
        
    var li = e.target.parentElement;

    axios.get(`https://crudcrud.com/api/5f5c4ab67c074290a36d45a323d6e7c0/BookingData/${li.id}`)
     .then((response) => {
        // showUserOnScreen(response.data);
        nameInput.value = response.data.name;
        emailInput.value = response.data.email;
     })

    userList.removeChild(li);

    if(nameInput.value === '' || emailInput.value === '') {
      // alert('Please enter all fields');
      msg.classList.add('error');
      msg.innerHTML = 'Please enter all fields';
  
      // Remove error after 3 seconds
      setTimeout(() => msg.remove(), 3000);
    }
    else{
      axios.put(`https://crudcrud.com/api/5f5c4ab67c074290a36d45a323d6e7c0/BookingData/${li.id}`,{
      name: nameInput.value,
      email: emailInput.value
    })
    .then((response)=>{
      //  showPost(response.data);
      console.log(response.data);
    })
    .catch(err=> console.log(err))

    }

    
  }

}


function showUserOnScreen(object){
    
    
    for (var i=0; i<object.length;i++){
      const li = document.createElement('li');
    
      li.appendChild(document.createTextNode(JSON.stringify(object[i])));
      li.innerHTML = `${object[i].name} ${object[i].email}`;
      li.id = `${object[i]._id}`;

      var deleteBtn = document.createElement('button');
      var editBtn = document.createElement('button');
      
      deleteBtn.className = " float-right delete";
      editBtn.className = "edit";

      deleteBtn.appendChild(document.createTextNode('DELETE'));
      editBtn.appendChild(document.createTextNode('EDIT'));
  
      userList.appendChild(li);

      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
    }
  
}

function showPost(object){
    const li = document.createElement('li');
    
    li.appendChild(document.createTextNode(JSON.stringify(object)));
    li.innerHTML = `${object.name} ${object.email}`;
    li.id = `${object._id}`;

    var deleteBtn = document.createElement('button');
    var editBtn = document.createElement('button');
      
    deleteBtn.className = " float-right delete";
    editBtn.className = "edit";

    
    deleteBtn.appendChild(document.createTextNode('DELETE'));
    editBtn.appendChild(document.createTextNode('EDIT'));
     
    userList.appendChild(li);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

}