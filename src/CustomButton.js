import React from 'react';
import './CustomButton.css';

const CustomButton = ({ text, onClick }) => {
  const handleClick = () => {
    onClick(text); // Passes the button text to the onClick function provided by the parent
  };

  return (
    <button className="custom-button" onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        className="icon-md"
        style={{ color: 'rgb(237, 98, 98)' }}
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm3-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zm1.293 4.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-2 2a1 1 0 0 1-1.414-1.414L8.586 12l-1.293-1.293a1 1 0 0 1 0-1.414M12 14a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1"
          clipRule="evenodd"
        ></path>
      </svg>
      <div className="button-text">{text}</div>
    </button>
  );
};

export default CustomButton;
