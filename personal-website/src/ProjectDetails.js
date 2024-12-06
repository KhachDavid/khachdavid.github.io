// ProjectDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./ProjectDetails.css";
import rehypeRaw from "rehype-raw";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
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
      <ReactMarkdown 
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        remarkPlugins={[remarkMath, remarkGfm]}
        remarkRehypeOptions={{ passThrough: ['link'] }}
        components={{
          a: props => {
                        // Check if the link is a local anchor link
            if (props?.href?.startsWith("#inpage-")) {
              return (
                <a
                  href={props.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.querySelector(props.href);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {props.children}
                </a>
              );
            }

            // For all other links (e.g., external URLs), render as normal
            return <a href={props.href}>{props.children}</a>;
          },
          h1: ({ children }) => (
            <h1 id={children[0].toLowerCase().replace(/\s+/g, "-")}>{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 id={children[0].toLowerCase().replace(/\s+/g, "-")}>{children}</h2>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default ProjectDetails;
