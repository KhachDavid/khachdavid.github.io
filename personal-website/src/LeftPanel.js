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
          href="https://github.com/KhachDavid"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/davidhimself"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a href="mailto:khachatryandavid1@gmail.com">Email</a>
      </div>
    </div>
  );
}

export default LeftPanel;
