// src/components/ChatBox.jsx
import React, { useState } from "react";
import axios from "axios";

const ChatBox = ({ file }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!file) {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: input },
        { sender: "ai", text: "No PDF file selected." },
      ]);
      setInput("");
      return;
    }

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setLoading(true);
    console.log('file name:', file.name);
    console.log('query:', input);

    try {
      const params = {
        file: file.name, // Use the file name
        query: input,
      };
      const res = await axios.get("http://127.0.0.1:8000/askpdf", { params });
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: res.data?.answer || "No answer received." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error contacting backend." },
      ]);
      console.error("Chat API error:", error);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="w-1/3 h-screen flex flex-col bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-md max-w-[80%] ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="p-2 rounded-md bg-gray-200 text-black self-start">
            Processing your question...
          </div>
        )}
      </div>
      <div className="p-4 border-t flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask something about the PDF..."
          className="flex-1 border rounded-md px-3 py-2 mr-2"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
