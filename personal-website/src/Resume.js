import React, { useState, useEffect } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

import resumePDF from "./David_Khachatryan_Resume.pdf"; // Path to your static PDF file
import "./Resume.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function Resume() {
  const [width, setWidth] = useState(window.innerWidth); // Track viewport width

  useEffect(() => {
    setWidth(window.innerWidth); // Update window width on resize
    // Set up the PDF Worker for optimal performance
    //pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    // Add functionality if needed, such as setting the total number of pages
  }

  return (
    <div className="resume-page">
      {/* PDF Viewer */}
      <div
        className="resume-viewer"
        style={{ cursor: "pointer" }}
      >
        <Document file={resumePDF} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={1}
            width={
              width < 768
                ? width * 0.82 // Small screens: 82% of the viewport width
                : width <= 874
                ? width * 0.47
                : width <= 996
                ? width * 0.54
                : width <= 1062
                ? width * 0.6
                : width <= 1148
                ? width * 0.63
                : Math.min(750, width * 0.9) // Large screens
            }
          />
        </Document>
      </div>
      <div className="resume-header">
        {/* Download button */}
        <a
          href={resumePDF}
          download="David_Khachatryan_Resume.pdf"
          className="download-button"
        >
          Download Resume
        </a>
      </div>
    </div>
  );
}

export default Resume;
