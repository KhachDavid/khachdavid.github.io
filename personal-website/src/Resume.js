import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

import resumePDF from './David_Khachatryan_Resume.pdf'; // Update the path to your static PDF file
import './Resume.css';

function Resume() {
  return (
    <div className="resume-page">
      <div className="resume-header">
        <a
          href={resumePDF}
          download="David_Khachatryan_Resume.pdf"
          className="download-button"
        >
          Download Resume
        </a>
      </div>

      <div className="resume-viewer">
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
          <Viewer fileUrl={resumePDF} />
        </Worker>
      </div>
    </div>
  );
}

export default Resume;
