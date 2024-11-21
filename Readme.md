# Random Name Selector

A lightweight, interactive web app for randomly selecting names from a list with features like confetti effects, local storage for name persistence, and a responsive, user-friendly design. 

Use it today: https://random.drkpxl.com

## Features

- **Random Name Selection:** Pick a random name from a user-defined list. Names are removed from the list once selected.
- **Local Storage:** Automatically saves the name list locally for future sessions.
- **Confetti Animation:** Celebrate selections with fun, customizable confetti effects.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.
- **Customizable Backgrounds:** Dynamic gradient backgrounds for a vibrant user experience.

## Tech Stack

- **HTML, CSS, JavaScript:** Core technologies for the frontend.
- **Nginx:** Lightweight web server for hosting the application.
- **Docker:** Containerization for easy deployment and scalability.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/random-name-selector.git
   cd random-name-selector
   ```

2. `docker-compose up --build`
3. Open your browser and navigate to http://localhost:4020

## File Structure

- `index.html`: The main HTML file for the app.
- `styles.css`: Custom styles for the app's UI.
- `script.js`: JavaScript for interactivity and logic.
- `Dockerfile`: Configuration file for building the Docker image.
- `docker-compose.yml`: Defines services and container settings.

## Usage

1. Add names to the list in the text area.
2. Press the Randomize button to pick a name.
3. Celebrate the selection with confetti effects.
4. Names are automatically saved locally and removed once selected.


## Customization

### Confetti Effects
To modify the confetti behavior, edit the launchConfetti function in script.js.

### Background Gradients
Customize the background gradients by updating the gradients array in script.js.

## Credits
Code: Steven Hubert  
Font: Atkinson Hyperlegible  
Confetti Library: Canvas Confetti