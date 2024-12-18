import pen_gif from "./assets/pen_demo.gif";
import kuka_gif from "./assets/kuka.gif";
import generator_gif from "./generator_demo_cropped.gif";
import el_tracker from "./el_tracker.gif";
import scallop_eyes from "./assets/scallop_sim.gif";
import dice_animation from "./assets/dice_animation.gif";
import { Route, Routes, Link } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import About from "./About";
import Resume from "./Resume";
import Footer from "./Footer";
import ProjectDetails from "./ProjectDetails";
import LeftPanel from "./LeftPanel";

import "./App.css";
import React from "react";

function App() {
  const galleryItems = [
    {
      id: "el_tracker",
      title: "Founder of EL Tracker",
      gif: el_tracker,
      description:
        "With thousands of daily users and a 5-star rating, EL Tracker offers an efficient and reliable way to navigate Chicago’s transit system. EL Tracker is also the only app designed to work seamlessly for blind users, ensuring they can navigate the city with confidence and ease.",
      tags: [
        "Swift",
        "Kotlin",
        "iOS Development",
        "Django",
        "Node.js",
        "Linux",
        "Git",
        "Docker",
        "SQL",
        "CI/CD",
      ],
    },
    {
      id: "mobile_manipulation",
      title: "Mobile Manipulation with KUKA youBot",
      gif: kuka_gif,
      description:
        "A software that plans a trajectory for the end effector, conducts odometry while the robot moves, and handles feedback control to ensure the robot reaches its goal.",
      tags: ["Controls", "CoppeliaSim", "KUKA youBot", "Matrix Transformations"],
    },
    {
      id: "pen_thief",
      title: "'Pen Thief' Robot",
      gif: pen_gif,
      description:
        "The Pen Thief project utilizes a Realsense Camera D435i and OpenCV to track the location of a pen. It utilizes an initial calibration process to command the arm to move towards the pen.",
      tags: ["ROS2", "OpenCV", "Camera Calibration", "Python", "RGB-D Camera"],
    },
    {
      id: "scallop_eyes",
      title: "Simulating Scallop Eyes",
      gif: scallop_eyes,
      description:
        "A simulation of how scallops use their eyes to escape from threats. The simulation higlights the importance of bioinspired design in engineering.",
      tags: [
        "Biomimicry",
        "CNN",
        "PyTorch",
        "Gabor Filters",
        "Simulation",
        "Three.js",
        "Computer Vision",
      ],
    },
    {
      id: "dice_simulation",
      title: "2D Dice in a box simulation",
      gif: dice_animation,
      description: "Using Lagrangian dynamics and impacts to simulate dice in a box from scratch.",
      tags: ["Python", "Sympy", "Physics", "Simulation", "Lagrangian Dynamics"],
    },
    {
      id: "generator",
      title: "Hand Crank Generator",
      gif: generator_gif,
      description: "A demonstration of a hand crank generator powering an LED light.",
      tags: ["Electronics", "Mechanical Design", "CAD Design"],
    },
  ];

  const handleDetails = (id) => {
    window.location.href = `#/project/${id}`;
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        {/* Header Section */}
        <header className="App-header">
          <div className="header-container">
            <Link to="/" className="logo">
              David Khachatryan
            </Link>
            <nav className="nav-links">
              <Link to="/">Projects</Link>
              <Link to="/about">About</Link>
              <Link to="/resume">Resume</Link>
            </nav>
          </div>
        </header>

        <div className="main-content">
          {/* Left Panel */}
          <LeftPanel />
          <div className="central-content">
            {/* Main Content */}
            <Routes>
              <Route
                path="/"
                element={
                  <main className="gallery-container">
                    {galleryItems.map((item) => (
                      <div
                        className="gallery-item"
                        key={item.id}
                        onClick={() => handleDetails(item.id)}
                      >
                        <img
                          src={item.gif}
                          alt={item.title}
                          className="gallery-gif"
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "200px",
                          }}
                        />
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <div className="tags">
                          {item.tags.map((tag, index) => (
                            <span key={index} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </main>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/project/:projectId" element={<ProjectDetails />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
