from textblob import TextBlob
from pymongo import MongoClient
from dotenv import load_dotenv  # Import dotenv
import os

# Load environment variables from .env
load_dotenv()

# MongoDB Connection Setup
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["ChatBotDB"]
collection = db["Sentiments"]

def analyze_sentiment(message):
    """
    Perform sentiment analysis on the input message.
    Returns:
        dict: Emotion type and its percentage.
    """
    blob = TextBlob(message)
    polarity = blob.sentiment.polarity  # Scale from -1 (negative) to 1 (positive)
    emotion = "Neutral"
    if polarity > 0.2:
        emotion = "Positive"
    elif polarity < -0.2:
        emotion = "Negative"

    percentage = round(abs(polarity) * 100, 2)
    return {"emotion": emotion, "percentage": percentage}

def store_sentiment_data(message, sentiment_data):
    """
    Store the message, emotion type, and percentage in MongoDB.
    """
    data = {
        "message": message,
        "emotion": sentiment_data["emotion"],
        "percentage": sentiment_data["percentage"],
    }
    collection.insert_one(data)
