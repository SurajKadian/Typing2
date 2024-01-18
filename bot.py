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

def mark_differences(user_id, original_text, typed_text):
    global input_texts

    # Get the input texts as arrays of words
    original_words = original_text.split(" ")
    typed_words = typed_text.split(" ")

    # Initialize user-specific counts
    spelling_errors[user_id] = 0
    missing_words[user_id] = 0
    extra_words[user_id] = 0
    total_words[user_id] = 0

    # Initialize the indexes for the original words and the typed words
    original_index = 0
    typed_index = 0

    # Loop through the words until one of the arrays is exhausted
    while original_index < len(original_words) and typed_index < len(typed_words):
        original_word = original_words[original_index]
        typed_word = typed_words[typed_index]

        # Your existing comparison logic here, adjusted to use user_id and update counts accordingly
        # ...

    # Remaining code for marking missing and extra words after the loop
    while original_index < len(original_words):
        # Mark missing words
        missing_words[user_id] += 1
        original_index += 1

    while typed_index < len(typed_words):
        # Mark extra words
        extra_words[user_id] += 1
        typed_index += 1

    # Calculate total words
    total_words[user_id] = len(original_words) + len(typed_words)

    # Display the results for testing (you can remove this in production)
    print(f"User: {user_id}")
    print(f"Spelling Errors: {spelling_errors[user_id]}")
    print(f"Missing Words: {missing_words[user_id]}")
    print(f"Extra Words: {extra_words[user_id]}")
    print(f"Total Words: {total_words[user_id]}")

# Initialize variables for counts per user
spelling_errors = {}
missing_words = {}
extra_words = {}
total_words = {}

# Run the bot
bot.polling()
