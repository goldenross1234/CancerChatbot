import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const sendMessage = async () => {
    setError('');
    try {
      const res = await axios.post('http://localhost:3001/send-message', {
        prompt: prompt,
        max_tokens: 50,
        temperature: 0.7
      });
      setResponse(res.data.choices[0].text);
    } catch (error) {
      console.error('Error sending message:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="App">
      <h1>Chatbot</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <button onClick={sendMessage}>Send</button>
      {response && <pre>{response}</pre>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
