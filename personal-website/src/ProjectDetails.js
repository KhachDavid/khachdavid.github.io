// ProjectDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./ProjectDetails.css";
import rehypeRaw from "rehype-raw";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Import KaTeX styles


function ProjectDetails() {
  const { projectId } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const response = await import(`./markdown/${projectId}.md`);
        const markdownContent = await fetch(response.default).then((res) =>
          res.text()
        );
        setContent(markdownContent);
      } catch (error) {
        setContent("# Project Not Found\nThe requested project could not be found.");
      }
    };
    loadMarkdown();
  }, [projectId]);

  return (
    <div className="project-details">
      <ReactMarkdown  rehypePlugins={[rehypeRaw, rehypeKatex]} remarkPlugins={remarkMath}>{content}</ReactMarkdown>
    </div>
  );
}

export default ProjectDetails;
