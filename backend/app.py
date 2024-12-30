from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import os
from dotenv import load_dotenv  # Import dotenv
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from pymongo import MongoClient
from sentiment_analysis import analyze_sentiment, store_sentiment_data  # Import sentiment analysis functions

# Load environment variables from .env
load_dotenv()

# Initialize the Flask application
app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)  # Enable Cross-Origin Resource Sharing

# Get sensitive credentials from environment variables
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
MONGO_URI = os.getenv("MONGO_URI")

# MongoDB Atlas connection setup
client = MongoClient(MONGO_URI)
db = client["ChatBotDB"]
collection = db["Sentiments"]

# Route to serve the React frontend (index.html)
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

# API endpoint to handle text generation and sentiment analysis
@app.route("/api/generate", methods=["POST"])
def generate_api():
    if request.method == "POST":
        try:
            req_body = request.get_json()

            # Ensure that 'contents' is a list and extract the message
            if isinstance(req_body.get("contents"), list) and len(req_body["contents"]) > 0:
                content = req_body["contents"][0].get("text")  # Access the first element and get the 'text'
            else:
                return jsonify({"error": "Invalid contents format."})

            # Send the message to Google Generative AI for response
            model = ChatGoogleGenerativeAI(model=req_body.get("model"))
            message = HumanMessage(content=content)
            response = model.stream([message])

            # Perform sentiment analysis using the provided function
            sentiment = analyze_sentiment(content)

            # Store the message and sentiment in MongoDB
            store_sentiment_data(content, sentiment)

            # Stream the response from Google Generative AI
            def stream():
                for chunk in response:
                    yield chunk.content + '\n'

            return stream(), {'Content-Type': 'text/event-stream'}

        except Exception as e:
            return jsonify({"error": str(e)})

# Serve static files (CSS, JS, images) from the React build
@app.route('/<path:path>')
def static_proxy(path):
    file_name = path.split('/')[-1]
    dir_name = os.path.join(app.static_folder, '/'.join(path.split('/')[:-1]))
    return send_from_directory(dir_name, file_name)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
