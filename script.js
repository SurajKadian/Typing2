// The script for the text comparison program

var spellingErrors = 0;

var missingWords = 0;

var extraWords = 0;

var totalWords = 0;

// The variable to store the output text

var outputText = "";

// The function to get the input texts and split them into words

function getInputTexts() {
  // Get the original text from the text area

  var originalText = document.getElementById("original").value;

  // Get the typed text from the text area

  var typedText = document.getElementById("typed").value;

  // Split the original text into words

  var originalWords = originalText.split(" ");

  // Split the typed text into words

  var typedWords = typedText.split(" ");

  // Return the arrays of words

  return [originalWords, typedWords];
}

function compareWords(originalWords, typedWords) {

  // Initialize the indexes for the original words and the typed words

  var originalIndex = 0;

  var typedIndex = 0;

  // Loop through the words until one of the arrays is exhausted

  while (originalIndex < originalWords.length && typedIndex < typedWords.length) {

    // Get the current words from the arrays

    var originalWord = originalWords[originalIndex];

    var typedWord = typedWords[typedIndex];

    // If the words are equal, append them to the output text without any mark

    if (originalWord === typedWord) {

      outputText += originalWord + " ";

      // Increment both indexes
      originalIndex++;

      typedIndex++;

      // Increment the total words count

      totalWords++; // Add this line

    }

    // If the words are not equal, check if the next word in the original array is equal to the current word in the typed array

    else if (originalWords[originalIndex + 1] === typedWord) {

      // If yes, it means the current word in the original array is missing in the typed array, so mark it as green and bold

      outputText += "<span class='missing'>" + originalWord + "</span> ";

      // Increment only the original index

      originalIndex++;

      // Increment the missing words count

      missingWords++; // Add this line

    }
    else if (typedWords[typedIndex + 1] === originalWord) {

      // If yes, it means the current word in the typed array is extra in the typed array, so mark it as blue and line-through

      outputText += "<span class='extra'>" + typedWord + "</span> ";

      // Increment only the typed index

      typedIndex++;

      // Increment the extra words count

      extraWords++; // Add this line

    }

    // If the words are not equal and none of the above conditions are met, it means the current words are different in spelling, so mark them as red and underline

    else {

      outputText += "<span class='spelling'>" + typedWord + "</span> ";

      // Increment both indexes

      originalIndex++;
      typedIndex++;
     // Increment the spelling errors count

      spellingErrors++; // Add this line

      // Increment the total words count

      totalWords++; // Add this line

    }

  }

  // If there are any remaining words in the original array, mark them as green and bold

  while (originalIndex < originalWords.length) {

    outputText += "<span class='missing'>" + originalWords[originalIndex] + "</span> ";

    originalIndex++;

    // Increment the missing words count

    missingWords++; // Add this line

  }

  // If there are any remaining words in the typed array, mark them as blue and line-through

  while (typedIndex < typedWords.length) {
    outputText += "<span class='extra'>" + typedWords[typedIndex] + "</span> ";
    typedIndex++;
    // Increment the extra words count
    extraWords++; // Add this line
  }
} 

    // If the words are not equal, check if the next word in the typed array is equal to the current word in the original array

function markDifferences() {
  // Get the input texts as arrays of words

  var inputTexts = getInputTexts();

  var originalWords = inputTexts[0];

  var typedWords = inputTexts[1];

  // Compare the words and find the differences

  compareWords(originalWords, typedWords);
}

// The function to display the output text on the web page

function displayOutput() {
  // Get the output div

  var output = document.getElementById("result");

  // Set the output div inner HTML to the output text

  
  outputText += "<br><br>"; // Add a line break

  outputText += "Spelling mistakes = <b>" + spellingErrors + "</b><br>"; // Add this line

  outputText += "Missing words = " + missingWords + "<br>"; // Add this line

  outputText += "Extra words = " + extraWords + "<br>"; // Add this line

  outputText += "Total words = <b>" + totalWords + "</b><br>"; // Add this line

  // Set the output div inner HTML to the output text

  output.innerHTML = outputText;

  // Reset the output text

  outputText = "";

  // Reset the counts of errors and words

  spellingErrors = 0; // Add this line

  missingWords = 0; // Add this line

  extraWords = 0; // Add this line

  totalWords = 0; // Add this line

}
  


// The function to compare the texts and display the output

function compareTexts() {
  // Mark the differences between the texts

  markDifferences();

  // Display the output text

  displayOutput();
}
// The function to clear the input and output texts

function clearTexts() {

  // Get the original text area

  var original = document.getElementById("original");

  // Get the typed text area

  var typed = document.getElementById("typed");

  // Get the output div

  var output = document.getElementById("result");

  // Set the value of the text areas to empty strings

  original.value = "";

  typed.value = "";

  // Set the inner HTML of the output div to an empty string

  output.innerHTML = "";

}

// The function to add the event listener to the button

function addEventListener() {
  // Get the compare button

  var button = document.getElementById("compare");

  // Add an event listener to the button that triggers the compareTexts function when clicked
  var resetButton = document.getElementById("reset");

  button.addEventListener("click", compareTexts);
  resetButton.addEventListener("click", clearTexts)
}

// Call the addEventListener function when the web page is loaded

window.onload = addEventListener;
