from fastapi import FastAPI, UploadFile, File, HTTPException
from langchain_community.document_loaders import PyPDFLoader
import enum
import os
import shutil
from dotenv import load_dotenv
from utils import store_embeddings,get_prompt, chatmodel, get_retriver
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from fastapi.middleware.cors import CORSMiddleware
import re




app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins =["*"],
                 allow_methods =["*"],
                 allow_headers = ["*"] 
                 )








load_dotenv()
@app.get("/")
async def home_route():
    return {
        "about": "This is PDF reader and QA",
        "description": "This project summarizes the PDF and answers questions based on its content.",
        "routes": [("/", "home"),
                   ("/uploadPdf/","uploads the pdf to server"),
                   ("/getPdfs","lists all the pdf at the backend"),
                   ("/askpdf","query pdf and get answered"),
                   ("/docs","swaggerUI as per openAPI "
                   "")
                   ]

    }

@app.post("/uploadPdf")
async def upload_pdf(file: UploadFile = File(...)):
    """Upload only PDF files to the server"""
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Uploaded file is not a PDF")

    os.makedirs("uploads", exist_ok=True)
    filepath = os.path.join("uploads", file.filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)   
    loader = PyPDFLoader(file_path=filepath)
    store_embeddings(loader,filepath)
    return {
        "success": True,
        "filename": file.filename,
        "message": "PDF uploaded successfully"
    }
@app.get("/getPdfs")
async def fet_all_pdf():
    if os.path.exists("uploads"):
        listfiles = os.listdir("uploads")
        if listfiles:
            pdfFiles = [pdf for pdf in listfiles if pdf.lower().endswith(".pdf")]
            return {"Portable Document Files":pdfFiles}
        else:
            return {"error":"no pdf exists"}
    else:
        raise HTTPException(status_code=404,detail="resource not found")
    
@app.get("/askpdf")
def query_pdf(file:str,query:str):
    retriver = get_retriver(file)
    question_answer_chain = create_stuff_documents_chain(chatmodel(),prompt=get_prompt())
    rag_chain = create_retrieval_chain(retriver,question_answer_chain)
    response = rag_chain.invoke({"input":query})
    print(response)
    return{"answer": response["answer"]}
    

