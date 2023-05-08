function clspopup() {
  const blur = document.querySelector('.container-blur');
  const popup = document.getElementById('welcome');
  blur.classList.toggle('active');
  blur.style.display = 'none';
  popup.style.display = 'none';
}

// Get the container element
// var btnContainer = document.getElementById('pusat');

// // Get all buttons with class="btn" inside the container
// var btns = btnContainer.getElementsByClassName('btn-custom1');

// // Loop through the buttons and add the active class to the current/clicked button
// for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener('click', function () {
//     var current = document.getElementsByClassName('active');
//     current[0].className = current[0].className.replace(' active', '');
//     this.className += ' active';
//   });
// }
// // // // Initialize popover
// // var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
// // var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
// //   return new bootstrap.Popover(popoverTriggerEl);
// // });

// const tooltip = document.querySelector('tooltipQuote');

// // Pass the button, the tooltip, and some options, and Popper will do the
// // magic positioning for you:
// Popper.createPopper(tooltip, {
//   placement: 'right',
// });
