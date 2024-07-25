import React, { useState, useEffect } from 'react';
import './css/AdminPanel.css';

const AdminPanel = ({ onClose, onQuestionSelect }) => {
  const [questions, setQuestions] = useState(() => {
    const savedQuestions = localStorage.getItem('questions');
    return savedQuestions ? JSON.parse(savedQuestions) : [];
  });

  const [newQuestion, setNewQuestion] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    onQuestionSelect(selectedQuestions);
  }, [selectedQuestions, onQuestionSelect]);

  const handleAddQuestion = () => {
    if (newQuestion.trim() !== '') {
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      setNewQuestion('');
      localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = questions.map((question, i) => (i === index ? value : question));
    setQuestions(updatedQuestions);
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  const handleCheckboxChange = (question) => {
    const updatedSelectedQuestions = selectedQuestions.includes(question)
      ? selectedQuestions.filter((q) => q !== question)
      : [...selectedQuestions, question];
    if (updatedSelectedQuestions.length <= 3) {
      setSelectedQuestions(updatedSelectedQuestions);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-content">
        <h2>Admin Panel</h2>
        <button className="close-button" onClick={onClose}>Close</button>
        <div className="question-list">
          {questions.map((question, index) => (
            <div key={index} className="question-item">
              <input
                type="text"
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
              />
              <button onClick={() => handleDeleteQuestion(index)}>Delete</button>
              <input
                type="checkbox"
                checked={selectedQuestions.includes(question)}
                onChange={() => handleCheckboxChange(question)}
              />
            </div>
          ))}
        </div>
        <div className="add-question">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Add new question"
          />
          <button onClick={handleAddQuestion}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
