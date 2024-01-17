// The script for the text comparison program

// The variables to store the output text and the number of mistakes
var outputText = "";
var spellingMistakes = 0;
var missingWords = 0;
var extraWords = 0;

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

// The function to compare the words and find the differences
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
    }
    // If the words are not equal, check if the next word in the original array is equal to the current word in the typed array
    else if (originalWords[originalIndex + 1] === typedWord) {
      // If yes, it means the current word in the original array is missing in the typed array, so mark it as green and bold
      outputText += "<span class='missing'>" + originalWord + "</span> ";
      // Increment the number of missing words
      missingWords++;
      // Increment only the original index
      originalIndex++;
    }
    // If the words are not equal, check if the next word in the typed array is equal to the current word in the original array
    else if (typedWords[typedIndex + 1] === originalWord) {
      // If yes, it means the current word in the typed array is extra in the typed array, so mark it as blue and line-through
      outputText += "<span class='extra'>" + typedWord + "</span> ";
      // Increment the number of extra words
      extraWords++;
      // Increment only the typed index
      typedIndex++;
    }
    // If the words are not equal and none of the above conditions are met, it means the current words are different in spelling, so mark them as red and underline and show the correct word in parentheses
    else {
      outputText += "<span class='spelling'>" + typedWord + " (" + originalWord + ")</span> ";
      // Increment the number of spelling mistakes
      spellingMistakes++;
      // Increment both indexes
      originalIndex++;
      typedIndex++;
    }
  }
  // If there are any remaining words in the original array, mark them as green and bold
  while (originalIndex < originalWords.length) {
    outputText += "<span class='missing'>" + originalWords[originalIndex] + "</span> ";
    // Increment the number of missing words
    missingWords++;
    originalIndex++;
  }
  // If there are any remaining words in the typed array, mark them as blue and line-through
  while (typedIndex < typedWords.length) {
    outputText += "<span class='extra'>" + typedWords[typedIndex] + "</span> ";
    // Increment the number of extra words
    extraWords++;
    typedIndex++;
  }
  // Append the total number of mistakes at the end of the output text
  outputText += "\n\nTotal number of spelling mistakes: " + spellingMistakes + "\n";
  outputText += "Total number of missing words: " + missingWords + "\n";
  outputText += "Total number of extra words: " + extraWords + "\n";
}

// The function to mark the differences and append them to the output text
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
  output.innerHTML = outputText;
  // Reset the output text and the number of mistakes
  outputText = "";
  spellingMistakes = 0;
  missingWords = 0;
  extraWords = 0
