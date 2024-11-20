// Function to load names from localStorage
function loadNames() {
    const savedNames = localStorage.getItem('nameList');
    if (savedNames) {
      document.getElementById('name-list').value = savedNames;
    }
  }
  
  // Function to save names to localStorage
  function saveNames() {
    const nameList = document.getElementById('name-list').value;
    localStorage.setItem('nameList', nameList);
  }
  
  // Function to pick a random name
  function pickRandomName() {
    // Get the textarea value and split it into an array of names
    const nameList = document.getElementById('name-list').value.trim().split('\n');
  
    // Filter out empty lines
    const filteredNames = nameList.filter(name => name.trim() !== '');
  
    // Ensure there are names to pick from
    if (filteredNames.length === 0) {
      alert('Please add some names to the list!');
      return;
    }
  
    // Pick a random name
    const randomIndex = Math.floor(Math.random() * filteredNames.length);
    const selectedName = filteredNames[randomIndex];
  
    // Display the selected name
    document.getElementById('selected-name').textContent = selectedName;
  
    // Trigger confetti
    launchConfetti();
  }
  
  // Function to launch confetti
  function launchConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
  
  // Save names to localStorage whenever the text area changes
  document.getElementById('name-list').addEventListener('input', saveNames);
  
  // Load names from localStorage on page load
  window.onload = loadNames;
  