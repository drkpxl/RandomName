# docker-compose.yml

```yml
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "4020:80" # Map port 80 in the container to port 8080 on your host
    volumes:
      - ./index.html:/usr/share/nginx/html/index.html
      - ./styles.css:/usr/share/nginx/html/styles.css
      - ./script.js:/usr/share/nginx/html/script.js

```

# Dockerfile

```
# Use an official Nginx image
FROM nginx:latest

# Copy your files to the Nginx web directory
COPY . /usr/share/nginx/html

# Expose port 80 for the container
EXPOSE 80
```

# favicon.webp

This is a binary file of the type: Image

# index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random Name Selector</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
    <meta name="description"
        content="Easily pick random names from a list with our interactive and fun Random Name Selector. Add, edit, and save your name list for seamless usability.">
    <meta name="keywords"
        content="random name selector, name picker, confetti effect, interactive name list, fun name generator">
    <meta name="author" content="Your Name">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#007bff">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-title" content="Random Name Selector">
    <meta name="application-name" content="Random Name Selector">
    <meta name="msapplication-TileColor" content="#007bff">
    <meta name="msapplication-navbutton-color" content="#007bff">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
</head>

<body>
    <div class="container">
        <h1>Random Name Selector</h1>
        <p>Enter a list of name you want to include and let the power of the internet select a random name for you. Once a name is selected it is removed from the current list and won't be selected a 2nd time. Don't worry your names are saved locally on your computer so you won't need to enter them every time</p>
        <div id="toast" class="toast"></div>
        <div class="name-list-container">
            <label for="name-list">Name List</label>
            <textarea id="name-list" rows="20" placeholder="Enter names, one per line"></textarea>
        </div>

        <div class="name-display">
            <span id="selected-name">Press the button to pick a name</span>
        </div>

        <button class="button" onclick="pickRandomName()">Randomize</button>
    </div>

    

    <script src="script.js"></script>
</body>

</html>
```

# script.js

```js
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
```

# styles.css

```css



body {
  font-family: "Atkinson Hyperlegible", serif;
  font-weight: 400;
  /* background: linear-gradient(135deg, #74ebd5, #acb6e5); */ 
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  color: #333;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 1.1rem;
}

.container {
  text-align: center;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
}

h1 {
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  font-family: "Atkinson Hyperlegible", serif;
  font-weight: 700;
}

.name-list-container {
  margin-bottom: 1.2rem;
  text-align: left;
}
p {
  text-align: justify;
  margin-bottom: 1.2rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

#name-list {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #6c757d;
  border-radius: 5px;
  font-size: 1.2rem;
  resize: none;
  box-sizing: border-box;
}

.name-display {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border: 2px dashed #6c757d;
  border-radius: 8px;
}

#selected-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
}

.button {
  background: #007bff;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  stroke-width: 1px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.button:hover {
  background: #0056b3;
}

.toast {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 24px;
  border-radius: 4px;
  display: none;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.toast.show {
  opacity: 1;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translate(-50%, 20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

@media (max-width: 480px) {
  .container {
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  #name-list {
    padding: 0.5rem;
  }
  
  .name-display {
    padding: 1rem;
  }
}


```

