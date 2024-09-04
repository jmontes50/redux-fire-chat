import React, { useState } from "react";

export default function ChatView() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Juan", text: "Hola, ¿cómo estás?", isMe: false },
    { id: 2, sender: "Tú", text: "Hola Juan, estoy bien ¿y tú?", isMe: true },
    { id: 3, sender: "María", text: "¡Hola a todos!", isMe: false },
    { id: 4, sender: "Tú", text: "Hola María, bienvenida", isMe: true },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: "Tú", text: newMessage, isMe: true },
      ]);
      setNewMessage("");
    }
  };

  return (
    <main className="px-4 mx-auto lg:px-8 xl:max-w-7xl">
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-xs ${
                  message.isMe ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                    message.isMe ? "bg-blue-500" : "bg-green-500"
                  }`}
                >
                  {message.sender[0].toUpperCase()}
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    message.isMe
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <p className="font-semibold text-sm">{message.sender}</p>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="p-4 bg-white">
          <div className="flex space-x-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <i className="fa-solid fa-paper-plane fa-2x"></i>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
