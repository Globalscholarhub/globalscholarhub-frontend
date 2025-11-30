"use client";
import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    const input = e.target.message.value;
    if (!input) return;

    setMessages([...messages, { sender: "user", text: input }]);

    // Basic auto reply (AI can be added later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Thanks for your message! Our team will reply soon." },
      ]);
    }, 500);

    e.target.reset();
  };

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        🤖
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white border shadow-lg rounded-lg p-4">
          <h3 className="font-bold text-xl mb-3">GlobalScholarHub Chat</h3>
          <div className="h-60 overflow-y-auto border p-2 mb-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 my-1 rounded ${
                  m.sender === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              name="message"
              placeholder="Type..."
              className="flex-1 border p-2 rounded"
            />
            <button className="bg-blue-600 text-white px-3 rounded">Send</button>
          </form>
        </div>
      )}
    </>
  );
}
