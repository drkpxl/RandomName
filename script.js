// Track available names for the current session
let availableNames = [];

// Function to show toast
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.display = 'block';
  
  // Force a reflow to restart the animation
  toast.offsetHeight;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.style.display = 'none';
    }, 300); // Match animation duration
  }, duration);
}

// Function to load names from localStorage
function loadNames() {
  const savedNames = localStorage.getItem('nameList');
  if (savedNames) {
    document.getElementById('name-list').value = savedNames;
    initializeAvailableNames();
  } else {
    availableNames = [];
  }
}

// Function to save names to localStorage
function saveNames() {
  const nameList = document.getElementById('name-list').value;
  localStorage.setItem('nameList', nameList);
}

// Function to initialize available names
function initializeAvailableNames() {
  const nameList = document.getElementById('name-list').value.trim().split('\n').filter(name => name.trim() !== '');
  availableNames = nameList;
}

// Function to pick a random name
function pickRandomName() {
  // Check if availableNames is empty
  if (availableNames.length === 0) {
    showToast('All names have been used! Please refresh the page to get the full list again.');
    return;
  }

  // Pick and remove a random name
  const randomIndex = Math.floor(Math.random() * availableNames.length);
  const selectedName = availableNames.splice(randomIndex, 1)[0];
  
  // Update display
  document.getElementById('selected-name').textContent = selectedName;
  launchConfetti();

  // Debug log (remove in production)
  console.log('Available names:', availableNames);
}

// Function to launch confetti
function launchConfetti() {
  confetti({
    particleCount: 500,
    spread: 200,
    origin: { y: .8 },
    shape: ['star', 'square', 'circle'],
  });
}

// Save names to localStorage whenever the text area changes
document.getElementById('name-list').addEventListener('input', () => {
  saveNames();
  initializeAvailableNames();
});



const gradients = [
  'linear-gradient(135deg, #74ebd5, #acb6e5)',
  'linear-gradient(135deg, #ff9a9e, #fad0c4)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
  'linear-gradient(135deg, #30cfd0, #330867)',
  'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
  'linear-gradient(135deg, #fdcbf1, #e6dee9)',
];

// Function to set a random background gradient
function setRandomGradient() {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  const selectedGradient = gradients[randomIndex];
  document.body.style.background = selectedGradient;
  document.getElementsByClassName('button')[0].style.background = selectedGradient;
  document.getElementById('selected-name').style.color = selectedGradient;
}

// Modify the window.onload function to include setRandomGradient
window.onload = function() {
  loadNames();
  setRandomGradient();
};