import os
import telebot

BOT_TOKEN = os.environ.get('BOT_TOKEN')
bot = telebot.TeleBot(BOT_TOKEN)

# A dictionary to store the input texts from the users
input_texts = {}

@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, "Hello, I am a text comparison bot. I can compare two texts and show you the differences. To use me, please send me the original text first, then the typed text. I will reply with the output text and the conclusion.")

@bot.message_handler(func=lambda msg: True)
def handle_input_texts(message):
    user_id = message.chat.id
    text = message.text

    if user_id in input_texts:
        input_texts[user_id]['typed'] = text
        compare_texts(user_id, input_texts[user_id])
    else:
        input_texts[user_id] = {'original': text}
        bot.reply_to(message, "Please send me the typed text.")

def compare_texts(user_id, input_texts):
    # Mark the differences between the texts
    mark_differences(user_id, input_texts['original'], input_texts['typed'])
    # Append the conclusion lines to the output text
    output_text = "<br><br>"  # Add a line break
    output_text += "The number of spelling errors is " + str(spelling_errors[user_id]) + ".<br>"  # Add this line
    output_text += "The number of missing words is " + str(missing_words[user_id]) + ".<br>"  # Add this line
    output_text += "The number of extra words is " + str(extra_words[user_id]) + ".<br>"  # Add this line
    output_text += "The total number of words is " + str(total_words[user_id]) + ".<br>"  # Add this line
    # Send the output text to the user
    bot.send_message(user_id, output_text, parse_mode='HTML')
    # Reset the output text and counts
    output_text = ""
    spelling_errors[user_id] = 0
    missing_words[user_id] = 0
    extra_words[user_id] = 0
    total_words[user_id] = 0
    # Delete the user id from the input texts dictionary
    del input_texts[user_id]

# Additional functions (mark_differences implementation needed here)
def mark_differences(user_id, original_text, typed_text):
    # Your existing compareWords and other logic here, adjusted to use user_id and update counts accordingly
    # ...

# Initialize variables for counts per user
spelling_errors = {}
missing_words = {}
extra_words = {}
total_words = {}

# Run the bot
bot.polling()
