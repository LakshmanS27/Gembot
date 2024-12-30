# GemBot: Advanced Chatbot with Sentiment Analysis

GemBot is an AI-powered chatbot that combines intelligent conversational capabilities with a sentiment analysis module. By leveraging the Gemini Pro API, it delivers accurate and contextual responses, while TextBlob-based sentiment analysis provides real-time emotional insights. All user interactions and sentiment data are securely stored in MongoDB Atlas for advanced analytics.

## Key Features

### 1. Intelligent Conversational Capabilities
- Powered by **Gemini Pro API**, GemBot understands natural language queries and provides precise, context-aware responses.
- Supports dynamic queries based on structured data inputs, such as CSV files.

### 2. Sentiment Analysis
- Uses **TextBlob** for analyzing the sentiment of user inputs.
- Detects emotional tone, including:
  - Positive
  - Negative
  - Neutral
- Calculates **sentiment polarity** and **subjectivity scores** to provide detailed feedback.

### 3. MongoDB Atlas Integration
- Stores all user inputs, sentiment analysis results, and interaction logs in a **MongoDB Atlas** database.
- Enables scalable and secure data management for sentiment and conversational data.

## Project Architecture

### Components
1. **Frontend:**
   - User-friendly interface for interacting with GemBot.
   - Displays chatbot responses and sentiment analysis results in real time.

2. **Backend:**
   - Handles API requests to the **Gemini Pro API** for chatbot functionality.
   - Processes user inputs for sentiment analysis using TextBlob.
   - Manages data storage and retrieval from **MongoDB Atlas**.

3. **Database:**
   - MongoDB Atlas stores:
     - User inputs
     - Sentiment analysis results
     - Timestamped interaction logs

### Workflow
1. User inputs a query into the chatbot.
2. Backend sends the query to the Gemini Pro API to generate a response.
3. Sentiment analysis module processes the user input using TextBlob to determine polarity and subjectivity.
4. Chatbot response and sentiment analysis results are displayed to the user.
5. Interaction data is stored in MongoDB Atlas for future analysis.

## Getting Started

### Prerequisites
- Python 3.8+
- MongoDB Atlas account
- API key for Gemini Pro
- Libraries: Flask, pymongo, requests, TextBlob

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gembot.git
   cd gembot
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure environment variables:
   - Create a `.env` file and add the following:
     ```env
     GEMINI_API_KEY=your_gemini_api_key
     MONGODB_URI=your_mongodb_connection_uri
     ```

4. Run the application:
   ```bash
   python app.py
   ```

5. Access the chatbot at `http://localhost:5000`.

## Usage

1. **Interacting with GemBot:**
   - Enter queries or conversation prompts into the input field.
   - View chatbot responses powered by the Gemini Pro API.

2. **Sentiment Analysis:**
   - Each user input is analyzed using TextBlob for sentiment polarity and subjectivity.
   - Results are displayed alongside the chatbot response.

3. **Database Analytics:**
   - Access stored data in MongoDB Atlas to gain insights into user interactions and sentiment trends.

## Future Enhancements
- Add support for multilingual sentiment analysis using advanced NLP libraries.
- Implement reporting dashboards to visualize sentiment trends and interaction patterns.
- Integrate voice input and output for enhanced user experience.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or feedback, feel free to reach out:

- Email: slakshman2004@gmail.com

