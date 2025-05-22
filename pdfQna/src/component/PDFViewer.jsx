import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import axios from "axios";

// Use the compatible worker from CDN (pdfjs-dist@2.14.305)
const WORKER_URL =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

const PDFViewer = ({ fileUrl, file }) => {
  const [uploadStatus, setUploadStatus] = useState(null);

  async function uploadFileToBackend(file) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://chatqna.onrender.com/uploadPdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadStatus("File uploaded successfully!");
      return res.data;
    } catch (error) {
      setUploadStatus("Error uploading file.");
      console.error("Upload error:", error);
      return null;
    }
  }

  useEffect(() => {
    if (file) {
      uploadFileToBackend(file);
    }
    // eslint-disable-next-line
  }, [file]);

  return (
    <div className="w-2/3 h-screen overflow-y-scroll bg-gray-900 p-4 border-r">
      {uploadStatus && (
        <div className="mb-2 text-sm text-center text-white">
          {uploadStatus}
        </div>
      )}
      {fileUrl ? (
        <Worker workerUrl={WORKER_URL}>
          <div className="h-full bg-white rounded shadow overflow-hidden">
            <Viewer fileUrl={fileUrl} />
          </div>
        </Worker>
      ) : (
        <div className="text-center text-gray-100 mt-20">
          Please upload a PDF to view it here.
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
