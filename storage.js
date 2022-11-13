localStorage.setItem('name','bob');
// localStorage.removeItem('name');

sessionStorage.setItem('name','akash');
// sessionStorage.removeItem('name');

document.cookie = 'name=kayle; expires=' + new Date(2023,0,1).toUTCString()
document.cookie = 'lastName=smith; expires=' + new Date(2023,0,1).toUTCString()

console.log(document.cookie);