document.getElementById('user-info-form').addEventListener('submit', function(event) {
    // Prevent the form from being submitted normally
    event.preventDefault();
  
    // Get the user's name and email
    const userName = document.getElementById('user-name').value;
    const userEmail = document.getElementById('user-email').value;
  
    // Validate the user's name
    if (userName.trim() === '') {
      alert('Please enter your name.');
      return;
    }
  
    // Validate the user's email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert('Please enter a valid email.');
      return;
    }
  
    // Store the user's name and email in variables
    // You can use these variables later in your game logic
  
    // Hide the form and show the game container and title
    document.getElementById('user-info-form').style.display = 'none';
    document.getElementById('login-title').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('game-title').style.display = 'block';
  
    // Start the game
  });

// The secret word
const secretWord = "orange, yellow, purple, bronze";
let attemptsLeft = 6;
const submitButton = document.querySelector('#submitButton');
document.body.style.backgroundColor = 'rgb(102, 145, 162)';

// Function to submit a guess
let guessedLetters = [];

// Get the guess from the input boxes
const guessInputs = Array.from(document.querySelectorAll('.guessInput'));

// EVENT LISTENER MAKES YOU MOVE TO THE NEXT INPUT BOX WHEN YOU TYPE
guessInputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    if (input.value !== '') {
      // Find the next empty input box
      const nextEmptyInput = guessInputs.slice(index + 1).find(input => input.value === '');
      if (nextEmptyInput) {
        // If there is a next empty input box, focus on it
        nextEmptyInput.focus();
      }
    }

guessInputs.forEach((input, index) => {
        // Add an input event listener
        input.addEventListener('input', () => {
          // Check if the input value is not a letter
          if (!/^[a-zA-Z]$/.test(input.value)) {
            // If it's not a letter, clear the input box
            input.value = '';
          }
        });
     });

    // Get the guess
    const guess = guessInputs.map(input => input.value.toLowerCase()).join('');

    // Check if the guess is exactly 6 letters
    if (guess.length === 6) {
      // If it is, enable the submit button
      submitButton.disabled = false;
    } else {
      // If it's not, disable the submit button
      submitButton.disabled = true;
    }
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace' && input.value === '') {
      if (index > 0) {
        guessInputs[index - 1].focus();
      }
    }

    // Check if the submit button is disabled
    if (submitButton.disabled) {
      // If it is, return early from the event listener
      return;
    }

    if (event.key === 'Enter') {
      // If Enter was pressed, submit the guess
      submitGuess();
    }
  });
});

function submitGuess() {
  // Get the guess
  const guess = guessInputs.map(input => input.value.toLowerCase()).join('');

  // Add the guessed letters to the array
  guessedLetters.push(guess);

  // Display the guessed letters
  document.getElementById('guessedLetters').textContent = "Guessed letters: " + guessedLetters.join(', ');

  // Clear the board 
  guessInputs.forEach((input, index) => {
    if (secretWord[index] !== input.value) {
      input.value = '';
    } else {
      input.disabled = true;
    }
  });

  if (guess === secretWord) {
    document.getElementById('feedback').textContent = "You win!";
  } else {
    attemptsLeft--;
    document.getElementById('attemptsLeft').textContent = "Attempts left: " + attemptsLeft;

    if (attemptsLeft === 0) {
      document.getElementById('feedback').textContent = "You lose! The secret word was: " + secretWord;
      guessInputs.forEach(input => input.disabled = true); // Disable all input fields
    } else {
      // Provide feedback on which letters are correct
      let feedback = '';
      for (let i = 0; i < secretWord.length; i++) {
        if (guess[i] === secretWord[i]) {
          feedback += '✓'; // Correct letter in the right spot
        } else if (secretWord.includes(guess[i])) {
          feedback += '?'; // Correct letter but in the wrong spot
        } else {
          feedback += '✗'; // Incorrect letter
        }
      }
      // Display the feedback
      document.getElementById('feedback').textContent = feedback;
    }
  }
}
    
