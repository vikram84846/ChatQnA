# 📄 PDF QnA Backend API

A FastAPI-based backend for summarizing PDFs and answering questions using LLMs. This project uses LangChain, Gemini (via Google API), and DeepSeek (via OpenRouter) to interact with uploaded documents.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/pdf-qna.git
cd pdf-qna

python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```
# 🔐 Environment Variables
 ### Before running the project, you must create a .env file in the root directory with the following keys:
```bash
GOOGLE_API_KEY=your_google_gemini_api_key
OPENAI_API_KEY=your_openrouter_api_key
```

# 📦 Install Dependencies
Install all required packages using uv:
```bash
uv pip install -r requirements.txt
```

# 🧠 Run the Application
Start the FastAPI server with:
```bash
uvicorn main:app --reload
```

# 📁 Features
Upload PDF documents

Automatically summarize content

Ask contextual questions about the uploaded documents

Responses powered by LLMs from Gemini and DeepSeek
