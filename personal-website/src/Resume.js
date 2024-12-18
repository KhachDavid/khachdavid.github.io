import React, { useState, useEffect, useRef } from "react";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import resumePDF from "./David_Khachatryan_Resume.pdf"; // Path to your static PDF file
import "./Resume.css";

function Resume() {
  const [pageNumber, setPageNumber] = useState(1); // Current page number
  const [zoomLevel, setZoomLevel] = useState(1.0); // Zoom level
  const [isModalOpen, setModalOpen] = useState(false); // Modal for "maximize" version
  const [width, setWidth] = useState(window.innerWidth); // Track viewport width

  useEffect(() => {
    setWidth(window.innerWidth); // Update window width on resize
    // Set up the PDF Worker for optimal performance
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    if (isModalOpen) {
      // Dynamically adjust zoom level when the modal is open and screen resizes
      adjustZoomLevel(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    // Add functionality if needed, such as setting the total number of pages
  }

  const openModal = () => {
    adjustZoomLevel(width); // Dynamically set the zoom level based on screen size
    setModalOpen(true); // Open the modal for full-screen-like view
  };

   // Adjust zoom level based on screen size
   const adjustZoomLevel = (width) => {
    if (width < 768) {
      setZoomLevel(0.5); // Smaller zoom for small screens
    } else if (width < 992) {
      setZoomLevel(1.2); // Default zoom for medium screens
    } else {
      setZoomLevel(1.5); // Larger zoom for larger screens
    }
  };

  return (
    <div className="resume-page">
      {/* PDF Viewer */}
      <div
        className="resume-viewer"
        style={{ cursor: "pointer" }}
        onClick={openModal} // Open modal on click
      >
        <Document file={resumePDF} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
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
            pageNumber={pageNumber}
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
