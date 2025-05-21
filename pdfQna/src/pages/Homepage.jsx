import React, { useState } from "react";
import UploadPdf from "../component/UploadPdf";
import PDFViewer from "../component/PDFViewer";
import ChatBox from "../component/ChatBox";

function Homepage() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setPdfFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <>
      {!pdfUrl ? (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-900">
          <h1 className="text-center text-5xl font-extrabold mb-4 text-white">
            Chat with any <span className="text-blue-500">PDF</span>
          </h1>
          <p className="text-center text-lg font-semibold text-gray-100 w-1/2 mb-8">
            Join millions of students, researchers and professionals to
            instantly answer questions and understand research with AI
          </p>
          <UploadPdf onFileUpload={handleFileChange} />
        </div>
      ) : (
        <div className="flex h-screen">
          <PDFViewer fileUrl={pdfUrl} file={pdfFile} />
          <ChatBox file={pdfFile} />
        </div>
      )}
    </>
  );
}

export default Homepage;
