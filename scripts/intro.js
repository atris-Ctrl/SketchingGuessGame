// Get modal element
const modal = document.getElementById('intro');

// Get close button
const closeBtn = document.getElementById('closeBtn');

// Function to show the modal
function showIntro() {
  modal.style.display = 'inline-block';
}

// Function to close the modal
function closeIntro() {
  modal.style.display = 'none';
}

// Event listener to show the modal when the page loads
window.addEventListener('load', showIntro);

// Event listener to close the modal when the close button is clicked
closeBtn.addEventListener('click', closeIntro);
