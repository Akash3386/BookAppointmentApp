const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);
userList.addEventListener("click",removeItems);
userList.addEventListener("click",editItem);

function onSubmit(e) {
  e.preventDefault();

  

  // console.log(nameInput.value);
  if(nameInput.value === '' || emailInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create new list item with user
    // const li = document.createElement('li');

    // Add text node with input values
    // li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));

    // localStorage.setItem(`${nameInput.value}`,`${emailInput.value}`);
    myObj =  {
       name: nameInput.value,
       email: emailInput.value
    }
    localStorage.setItem(`userDetail${myObj.email}`,JSON.stringify(myObj));
    // localStorage.removeItem(myObj.email);
    // console.log(Object(localStorage));
    // Add HTML
    // li.innerHTML = `<strong>${nameInput.value}</strong>: ${emailInput.value}`;
    Object.keys(localStorage).forEach((key) => {
    
      const li = document.createElement('li');

      stringifiedDetailsOfPeople = localStorage.getItem(key);
      console.log(key);
      detailsOfPeople = JSON.parse(stringifiedDetailsOfPeople);

     
      // console.log(detailsOfPeople);
      li.appendChild(document.createTextNode(JSON.stringify(detailsOfPeople)));
      li.innerHTML = `${detailsOfPeople.name} ${detailsOfPeople.email}`;
      
      // code 
      var deleteBtn = document.createElement('button');
      var editBtn = document.createElement('button');
      
      deleteBtn.className = " float-right delete";

      editBtn.style = "border: 2px solid green;";
      deleteBtn.style="border: 2px solid red;";

      deleteBtn.appendChild(document.createTextNode('DELETE'));
      editBtn.appendChild(document.createTextNode('EDIT'));
      // li.innerHTML = `${detailsOfPeople.email}`;
      userList.appendChild(li);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
    

      });

    // Append to ul
    // userList.appendChild(li);

    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}

function removeItems(e){

  if (e.target.classList.contains()){
      console.log(e.target.classList.contains('delete'));
      if(confirm('Are you sure?')){
          var li = e.target.parentElement;
          userList.removeChild(li);
          Object.keys(localStorage).forEach((key) => {
            stringifiedDetailsOfPeople = localStorage.getItem(key);
            detailsOfPeople = JSON.parse(stringifiedDetailsOfPeople);
          })
          localStorage.removeItem(detailsOfPeople.email);
            }
  }
}
function editItem(e){
  
  e.preventDefault();
  
  var li = e.target.parentElement;
  userList.removeChild(li);
  Object.keys(localStorage).forEach((key) => {
    stringifiedDetailsOfPeople = localStorage.getItem(key);
    detailsOfPeople = JSON.parse(stringifiedDetailsOfPeople);
  })
  localStorage.removeItem(detailsOfPeople.email);
  nameInput.value = detailsOfPeople.name;
  emailInput.value = detailsOfPeople.email;
}