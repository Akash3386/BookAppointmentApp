const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);
userList.addEventListener("click",removeItems);
// userList.addEventListener("click",editItem);

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

// function removeItems(e){
//     e.preventDefault();
//     if (e.target.classList.contains('delete')){
//         console.log(e)
//         var li = e.target.parentElement;
//         userList.removeChild(li);
//         // axios.delete(`https://crudcrud.com/api/5f5c4ab67c074290a36d45a323d6e7c0/BookingData/${ig}`)
//     }

// }


function showUserOnScreen(object){
    // console.log(object)
    for (var i=0; i<object.length;i++){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(JSON.stringify(object[i])));
    li.innerHTML = `${object[i].name} ${object[i].email}`;

    var deleteBtn = document.createElement('button');
    var editBtn = document.createElement('button');
      
    deleteBtn.className = " float-right delete";

    // editBtn.style = "backgroundcolor: 2px solid green;";
    // deleteBtn.style="border: 2px solid red;";

    deleteBtn.appendChild(document.createTextNode('DELETE'));
    editBtn.appendChild(document.createTextNode('EDIT'));
      // li.innerHTML = `${detailsOfPeople.email}`;
    userList.appendChild(li);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    }
    // userList.appendChild(li);  
}

function showPost(object){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(JSON.stringify(object)));
    li.innerHTML = `${object.name} ${object.email}`;

    var deleteBtn = document.createElement('button');
    var editBtn = document.createElement('button');
      
    deleteBtn.className = " float-right delete";

    // editBtn.style = "backgroundcolor: 2px solid green;";
    // deleteBtn.style="border: 2px solid red;";

    deleteBtn.appendChild(document.createTextNode('DELETE'));
    editBtn.appendChild(document.createTextNode('EDIT'));
      // li.innerHTML = `${detailsOfPeople.email}`;
    userList.appendChild(li);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

}