import headshot from "./headshot.png";

function LeftPanel() {
  return (
    <div className="left-panel">
      <img src={headshot} alt="David Khachatryan" className="headshot" />
      <p>MS in Robotics @ Northwestern</p>
      <span>
        <i className="fas fa-map-marker-alt"></i>
        <p> Chicago, IL</p>
      </span>
      <div className="left-panel-links">
        <a
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a href="mailto:youremail@example.com">Email</a>
      </div>
    </div>
  );
}

export default LeftPanel;
