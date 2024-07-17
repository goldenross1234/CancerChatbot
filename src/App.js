import React from 'react';
import './App.css';
import logo from './DIMER logo 1.png'; // Adjust the path here
import CustomButton from './CustomButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="chat-container">
          <div className="logo">
            <img src={logo} alt="Logo" className="logo-image" />
          </div>
          <div className="sample-questions">
            <CustomButton text="Sample question" />
            <CustomButton text="Sample question" />
            <CustomButton text="Sample question" />
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Start typing here..." className="input-field" />
            <button className="send-button">Send</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
