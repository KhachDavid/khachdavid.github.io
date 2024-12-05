import pen_gif from "./pen_thief_demo.gif";
import kuka_gif from "./kuka.gif";
import generator_gif from "./generator_demo.gif";
import el_tracker from "./el_tracker.jpeg";
import scallop_eyes from "./sclp.gif";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import About from "./About";
import Resume from "./Resume";
import Footer from "./Footer";
import ProjectDetails from "./ProjectDetails";

import "./App.css";

function App() {
  const galleryItems = [
    {
      id: 1,
      title: "Founder of EL Tracker",
      gif: el_tracker,
      description:
        "With thousands of daily users and a 5-star rating, EL Tracker offers an efficient and reliable way to navigate Chicago’s transit system. EL Tracker is also the only app designed to work seamlessly for blind users, ensuring they can navigate the city with confidence and ease.",
      tags: [
        "Swift",
        "iOS Development",
        "Django",
        "Node.js",
        "Linux",
        "Git",
        "CI/CD",
      ],
    },
    {
      id: 2,
      title: "Mobile Manipulation with KUKA youBot",
      gif: kuka_gif,
      description:
        "A software that plans a trajectory for the end effector, conducts odometry while the robot moves, and handles feedback control to ensure the robot reaches its goal.",
      tags: ["Controls", "CoppeliaSim", "KUKA youBot"],
    },
    {
      id: 3,
      title: "'Pen Thief' Robot",
      gif: pen_gif,
      description:
        "The Pen Thief project utilizes a Realsense Camera D435i and OpenCV to track the location of a pen. It utilizes an initial calibration process to command the arm to move towards the pen.",
      tags: ["OpenCV", "Camera Calibration", "Python"],
    },
    {
      id: 4,
      title: "Simulating Scallop Eyes",
      gif: scallop_eyes,
      description:
        "A simulation of how scallops use their eyes to escape from threats. The simulation higlights the importance of bioinspired design in engineering.",
      tags: ["Biomimicry", "Simulation", "Three.js", "Computer Vision"],
    },
    {
      id: 5,
      title: "Hand Crank Generator 2V output",
      gif: generator_gif,
      description:
        "A demonstration of a hand crank generator providing a 2V output. ",
      tags: ["Electronics", "Mechanical", "Energy Generation", "CAD Design"],
    },
  ];

  const handleDetails = (id) => {
    window.location.href = `/project/${id}`;
  };

  return (
    <Router>
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
