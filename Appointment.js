const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  if(nameInput.value === '' || emailInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create new list item with user
    const li = document.createElement('li');

    // Add text node with input values
    // li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));

    // localStorage.setItem(`${nameInput.value}`,`${emailInput.value}`);
    myObj =  {
       name: nameInput.value,
       email: emailInput.value
    }
    localStorage.setItem(myObj.email,JSON.stringify(myObj));
    // console.log(Object(localStorage));
    // Add HTML
    // li.innerHTML = `<strong>${nameInput.value}</strong>: ${emailInput.value}`;
    Object.keys(localStorage).forEach((key) => {

      const li = document.createElement('li');

      stringifiedDetailsOfPeople = localStorage.getItem(key);
      // console.log(localStorage.getItem(key));
      detailsOfPeople = JSON.parse(stringifiedDetailsOfPeople);


      console.log(detailsOfPeople);
      
      li.appendChild(document.createTextNode(JSON.stringify(detailsOfPeople)));
      li.innerHTML = `${detailsOfPeople.name} ${detailsOfPeople.email}`;
      // li.innerHTML = `${detailsOfPeople.email}`;
      userList.appendChild(li);

      });

    // Append to ul
    // userList.appendChild(li);

    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
  }
}