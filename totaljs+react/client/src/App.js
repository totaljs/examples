import "./normal.css";
import "./App.css";
import { useState } from "react";


function App() {

  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  function clearChat() { setChatLog([])}
  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: 'me', message: `${input}` }];
     setInput('');
     setChatLog(chatLogNew);
    const messages = chatLogNew.map((message) => message.message).join("\n")
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages
      })
    });
    const data = await response.json();
    setChatLog([...chatLogNew, { user: 'gpt', message: `${data.message}`}])
  }
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          New chat
        </div>

      </aside>
      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              className="chat-input-textarea"
              placeholder="Type your message here"
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></input>
          </form>
        </div>
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
          {message.user === "gpt" && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="rgba(255,255,255,1)"
                d="M20.562 10.188c.25-.688.313-1.376.25-2.063-.062-.688-.312-1.375-.625-2-.562-.938-1.375-1.688-2.312-2.125-1-.438-2.063-.563-3.125-.313-.5-.5-1.063-.937-1.688-1.25C12.437 2.126 11.687 2 11 2a5.17 5.17 0 0 0-3 .938c-.875.624-1.5 1.5-1.813 2.5-.75.187-1.375.5-2 .875-.562.437-1 1-1.375 1.562-.562.938-.75 2-.625 3.063a5.438 5.438 0 0 0 1.25 2.874 4.695 4.695 0 0 0-.25 2.063c.063.688.313 1.375.625 2 .563.938 1.375 1.688 2.313 2.125 1 .438 2.062.563 3.125.313.5.5 1.062.937 1.687 1.25.625.312 1.375.437 2.063.437a5.17 5.17 0 0 0 3-.938c.875-.625 1.5-1.5 1.812-2.5a4.543 4.543 0 0 0 1.938-.875c.562-.437 1.062-.937 1.375-1.562.562-.938.75-2 .625-3.063-.125-1.062-.5-2.062-1.188-2.874Zm-7.5 10.5c-1 0-1.75-.313-2.437-.875 0 0 .062-.063.125-.063l4-2.313a.488.488 0 0 0 .25-.25c.062-.125.062-.187.062-.312V11.25l1.688 1v4.625a3.685 3.685 0 0 1-3.688 3.813ZM5 17.25c-.438-.75-.625-1.625-.438-2.5 0 0 .063.063.125.063l4 2.312a.563.563 0 0 0 .313.063c.125 0 .25 0 .312-.063l4.875-2.813v1.938l-4.062 2.375A3.71 3.71 0 0 1 7.312 19c-1-.25-1.812-.875-2.312-1.75ZM3.937 8.562a3.807 3.807 0 0 1 1.938-1.624v4.75c0 .124 0 .25.062.312a.488.488 0 0 0 .25.25l4.875 2.813-1.687 1-4-2.313a3.697 3.697 0 0 1-1.75-2.25c-.25-.938-.188-2.063.312-2.938ZM17.75 11.75l-4.875-2.813 1.687-1 4 2.313c.625.375 1.125.875 1.438 1.5.312.625.5 1.313.437 2.063a3.718 3.718 0 0 1-.75 1.937c-.437.563-1 1-1.687 1.25v-4.75c0-.125 0-.25-.063-.313 0 0-.062-.124-.187-.187Zm1.687-2.5s-.062-.063-.125-.063l-4-2.312c-.125-.063-.187-.063-.312-.063s-.25 0-.313.063L9.812 9.688V7.75l4.063-2.375c.625-.375 1.312-.5 2.062-.5.688 0 1.375.25 2 .688.563.437 1.063 1 1.313 1.625s.312 1.375.187 2.062Zm-10.5 3.5-1.687-1V7.062c0-.687.187-1.437.562-2C8.187 4.438 8.75 4 9.375 3.688a3.365 3.365 0 0 1 2.062-.312c.688.063 1.375.375 1.938.813 0 0-.063.062-.125.062l-4 2.313a.488.488 0 0 0-.25.25c-.063.125-.063.187-.063.312v5.625Zm.875-2L12 9.5l2.187 1.25v2.5L12 14.5l-2.188-1.25v-2.5Z"
              />
            </svg>
          )}
        </div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};

export default App;
