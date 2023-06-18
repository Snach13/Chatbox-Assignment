import { useState } from "react";

const ChatBox = () => {
  const [chats, setChats] = useState([]);

  // Function to add a new chat box
  const addChatBox = () => {
    const chatId = `chat_${chats.length + 1}`;
    setChats((prevChats) => [...prevChats, { id: chatId, messages: [] }]);
  };

  // Function to handle sending a message
  const sendMessage = (chatId, message) => {
    const newMessage = {
      sender: chatId,
      text: message,
      timestamp: new Date().toLocaleTimeString(), // Add the timestamp
    };
    setChats((prevChats) =>
      prevChats.map((chat) => {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
        };
      })
    );
  };

  // Function to close a chat box
  const closeChatBox = (chatId) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-green-500 p-4 text-white">
        <h1 className="text-2xl font-bold">Chat Application</h1>
      </div>
      <div className="flex-grow flex flex-wrap mt-4">
        {chats.map((chat) => (
          <div key={chat.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg">
              <div className="flex items-center justify-between bg-gray-100 p-2">
                <h2 className="text-lg font-bold">{chat.id}</h2>
                <button
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => closeChatBox(chat.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 1c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 16.523 0 11 4.477 1 10 1zm4.95 13.536a.733.733 0 01-1.04 1.04L10 11.04l-3.91 3.536a.733.733 0 11-1.04-1.04L8.96 10 5.05 6.464a.733.733 0 011.04-1.04L10 8.96l3.91-3.536a.733.733 0 111.04 1.04L11.04 10l3.91 3.536z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                {chat.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`${
                      message.sender === chat.id ? "text-right" : "text-left"
                    } mb-2`}
                  >
                    <div
                      className={`${
                        message.sender === chat.id
                          ? "bg-green-500 text-white"
                          : "bg-gray-300"
                      } rounded-lg p-2 inline-block`}
                    >
                      {message.text}
                      <div className="text-xs text-gray-500 mt-1">
                        {message.timestamp}
                      </div>{" "}
                      {/* Display the timestamp */}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4">
                <textarea
                  className="w-full h-20 resize-none border border-gray-300 rounded-lg p-2 mb-2"
                  onChange={(e) => (chat.text = e.target.value)}
                  placeholder="Type a message..."
                ></textarea>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    sendMessage(chat.id, chat.text);
                    chat.text = "";
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="fixed bottom-0 right-0 m-4 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-700"
        onClick={addChatBox}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
};

export default ChatBox;
