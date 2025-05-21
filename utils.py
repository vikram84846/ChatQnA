from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.chat_models import ChatOpenAI
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import  create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import  ChatPromptTemplate


load_dotenv()

def embeddingModel():
    model = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    return model


def store_embeddings(loader,filepath):
    pages = loader.load()
    for page in pages:
        page.metadata["source"]= os.path.basename(filepath)
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=200)
    docs = text_splitter.split_documents(pages)
    vector_db = Chroma.from_documents(documents=docs,embedding=embeddingModel(),persist_directory="chroma_db")


def get_retriver(filepath):
    vector_db = Chroma(
        persist_directory="chroma_db",
        embedding_function= embeddingModel()
    )
    retriver = vector_db.as_retriever(
        search_type ="similarity",
        search_kwargs ={"k":10,
                        "filter":{"source":os.path.basename(filepath)}
                        }

    )
    return retriver


def get_prompt():
    system_prompt = (
    "You are an intelligent assistant for question-answering tasks. "
    "Use the following pieces of retrieved context to generate a clear, complete, and accurate answer "
    "to the question. The answer should adapt in length based on what is required for correctness and clarity. "
    "give a thorough detailed answer to each question . If it requires more detail, provide a thorough explanation. "
    "If you don't know the answer, say you don't know.\n\n{context}"
)

    prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)
    return prompt

def chatmodel():
    chat_model = ChatGoogleGenerativeAI(
        model= "gemini-2.0-flash",
        temperature=0.5
    )
    return chat_model