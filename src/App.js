import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import logo from './AI.png';
import AdminPanel from './AdminPanel';
import { FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [conversations, setConversations] = useState([]);
  const messagesEndRef = useRef(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [queryHistory, setQueryHistory] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (apiKey && apiEndpoint) {
      setIsModalOpen(false);
    }
  }, [apiKey, apiEndpoint]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const key = event.target.apiKey.value;
    const endpoint = event.target.apiEndpoint.value;
    setApiKey(key);
    setApiEndpoint(endpoint);
    setIsModalOpen(false);
  };

  const handleButtonClick = (text) => {
    setInputValue(text);
    handleSendClick(text); // Automatically send when selecting a sample question
  };

  const handleSendClick = async (text) => {
    const message = text || inputValue;
    if (message.trim() !== '') {
      setConversations([...conversations, { user: message, bot: 'Thinking...' }]);
      setQueryHistory([...queryHistory, message]);
      setInputValue('');
      scrollToBottom();

      try {
        const response = await callAIModel(message);
        const botResponse = response.data[0].generated_text || 'No response';
        setConversations((prevConversations) => {
          const newConversations = [...prevConversations];
          newConversations[newConversations.length - 1].bot = botResponse;
          return newConversations;
        });
      } catch (error) {
        console.error('Error calling AI model:', error);
        setConversations((prevConversations) => {
          const newConversations = [...prevConversations];
          newConversations[newConversations.length - 1].bot = 'Sorry, something went wrong. Please try again.';
          return newConversations;
        });
      }

      scrollToBottom(); // Scroll to the latest message after adding it
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  const handleClearClick = () => {
    setConversations([]);
    setIsScrolledUp(false); // Hide the scroll down button
  };

  const handleDeleteQuery = (index) => {
    const updatedHistory = queryHistory.filter((_, i) => i !== index);
    setQueryHistory(updatedHistory);
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom on initial load
  }, []);

  useEffect(() => {
    if (!isScrolledUp) {
      scrollToBottom();
    }
  }, [conversations, isScrolledUp]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    const chatContainer = document.querySelector('.chat-conversations');
    if (chatContainer.scrollTop + chatContainer.clientHeight < chatContainer.scrollHeight) {
      setIsScrolledUp(true);
    } else {
      setIsScrolledUp(false);
    }
  };

  const toggleAdminPanel = () => {
    setIsAdminPanelOpen(!isAdminPanelOpen);
  };

  const handleQuestionSelect = (questions) => {
    setSelectedQuestions(questions);
  };

  const callAIModel = async (userMessage) => {
    const response = await axios.post(
      apiEndpoint,
      {
        inputs: userMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response;
  };

  return (
    <div className="App">
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Configure API</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                <span>API Key:</span>
                <input type="text" name="apiKey" required />
              </label>
              <label>
                <span>API Endpoint:</span>
                <input type="text" name="apiEndpoint" required />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {!isModalOpen && (
        <header className="App-header">
          <div className="sidebar">
            <div className="sidebar-content">
              <h2>Query History</h2>
              <ul className="query-history">
                {queryHistory.map((query, index) => (
                  <li key={index}>
                    {query}
                    <button className="delete-button" onClick={() => handleDeleteQuery(index)}>
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="chat-container">
            <button className="admin-panel-button" onClick={toggleAdminPanel}>
              <FaPlus />
            </button>
            {isAdminPanelOpen && <AdminPanel onClose={toggleAdminPanel} onQuestionSelect={handleQuestionSelect} />}
            <div className="logo">
              <img src={logo} alt="Logo" className="logo-image" />
            </div>
            <div className="sample-questions">
              {selectedQuestions.map((question, index) => (
                <button key={index} className="question-button" onClick={() => handleButtonClick(question)}>
                  {question}
                </button>
              ))}
            </div>
            {conversations.length > 0 && (
              <div className="chat-conversations" onScroll={handleScroll}>
                {conversations.map((conversation, index) => (
                  <div key={index} className="chat-pair">
                    <div className="chat-message user">{conversation.user}</div>
                    <div className="chat-message bot">{conversation.bot}</div>
                  </div>
                ))}
                <div ref={messagesEndRef}></div>
              </div>
            )}
            {isScrolledUp && (
              <button className="scroll-down-button" onClick={scrollToBottom}>
                ↓
              </button>
            )}
            <div className="chat-input">
              <input
                type="text"
                className="input-field"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
              />
              <button onClick={() => handleSendClick()} className="send-button">
                Send
              </button>
              <button onClick={handleClearClick} className="clear-button">
                Clear
              </button>
            </div>
          </div>
        </header>
      )}
    </div>
  );
}

export default App;
