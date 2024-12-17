import React from 'react';
import './Resume.css';
import resumePDF from './David_Khachatryan_Resume.pdf';

function Resume() {
  return (
    <div className="resume-page">
      <div className="resume-actions">
        <a href={resumePDF} download="David_Khachatryan_Resume.pdf" className="download-button">
          Download Resume
        </a>
        <iframe 
          src={resumePDF} 
          title="David Khachatryan Resume" 
          className="resume-iframe" 
        />
      </div>
    </div>
  );
}

export default Resume;
