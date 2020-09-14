const toggleButton = document.querySelector('.toggle-menu');
const navBar = document.querySelector('.topnav');
toggleButton.addEventListener('click', () => {
  myFunction()
});

function myFunction() {
  var x = document.getElementById('myLinks');
  if (x.style.display === 'block') {
    x.style.display = 'none';
    navBar.classList.toggle('toggle');
  } else {
    x.style.display = 'block';
    navBar.classList.toggle('toggle');
  }
}
