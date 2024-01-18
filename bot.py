import os
import telebot

BOT_TOKEN = os.environ.get('BOT_TOKEN')
bot = telebot.TeleBot(BOT_TOKEN)
@bot.message_handler(commands=['start'])
def send_welcome(message):
  bot.reply_to(message, "Hello, I am a text comparison bot. I can compare two texts and show you the differences. To use me, please send me the original text first, then the typed text. I will reply with the output text and the conclusion.")
  # A dictionary to store the input texts from the users
input_texts = {}
@bot.message_handler(func=lambda msg: True)
def handle_input_texts(message):
  # Get the user id and the text content
  user_id = message.chat.id
  text = message.text
  # Check if the user id is in the input texts dictionary
  if user_id in input_texts:
    # If yes, it means the user has already sent the original text, so this is the typed text
    input_texts[user_id]['typed'] = text
    # Call the compareTexts function with the user id and the input texts
    compareTexts(user_id, input_texts[user_id])
  else:
    # If no, it means the user has not sent any text yet, so this is the original text
    input_texts[user_id] = {'original': text}
    # Ask the user to send the typed text
    bot.reply_to(message, "Please send me the typed text.")
    # The function to compare the texts and display the output
def compareTexts(user_id, input_texts):
  # Mark the differences between the texts
  markDifferences(input_texts['original'], input_texts['typed'])
  # Append the conclusion lines to the output text
  outputText += "<br><br>" # Add a line break
  outputText += "The number of spelling errors is " + str(spellingErrors) + ".<br>" # Add this line
  outputText += "The number of missing words is " + str(missingWords) + ".<br>" # Add this line
  outputText += "The number of extra words is " + str(extraWords) + ".<br>" # Add this line
  outputText += "The total number of words is " + str(totalWords) + ".<br>" # Add this line
  # Send the output text to the user
  bot.send_message(user_id, outputText, parse_mode='HTML')
  # Reset the output text
  outputText = ""
  # Reset the counts of errors and words
  spellingErrors = 0
  missingWords = 0
  extraWords = 0
  totalWords = 0
  # Delete the user id from the input texts dictionary
  del input_texts[user_id]
  # Run the bot
bot.polling()
