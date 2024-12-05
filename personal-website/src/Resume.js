import React from 'react';
import './Resume.css';
import resumePDF from './David_Khachatryan_Resume.pdf';

function Resume() {
  return (
    <div className="resume-page">
      <h1>My Resume</h1>
      <p>
        Below, you can view my resume or download it for your reference.
      </p>
      <div className="resume-actions">
        <iframe 
          src={resumePDF} 
          title="David Khachatryan Resume" 
          className="resume-iframe" 
        />
        <a href={resumePDF} download="David_Khachatryan_Resume.pdf" className="download-button">
          Download Resume
        </a>
      </div>
    </div>
  );
}

export default Resume;
