import pen_gif from './pen_thief_demo.gif';
import kuka_gif from './kuka.gif';
import generator_gif from './generator_demo.gif';
import el_tracker from './el_tracker.jpeg';
import './App.css';

function App() {
  const galleryItems = [
    {
      id: 1,
      title: 'EL Tracker',
      gif: el_tracker,
    },
    {
      id: 2,
      title: 'Mobile Manipulation with KUKA youBot',
      gif: kuka_gif,
    },
    {
      id: 3,
      title: '\'Pen Thief\' Robot',
      gif: pen_gif,
    },
    {
      id: 4,
      title: 'Hand Crank Generator 2V output',
      gif: generator_gif,
    },

  ];

  const handleDetails = (id) => {
    alert(`Opening details for item ${id}`);
  };

  return (
    <div className="App">
      {/* Header Section */}
      <header className="App-header">
        <div className="header-container">
          <h1 className="logo">David Khachatryan</h1>
          <nav className="nav-links">
            <a href="#about">About</a>
            <a href="#resume">Resume</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      {/* Gallery Section */}
      <main className="gallery-container">
        {galleryItems.map((item) => (
          <div className="gallery-item" key={item.id}>
            <img src={item.gif} alt={item.title} className="gallery-gif" />
            <h2>{item.title}</h2>
            <button onClick={() => handleDetails(item.id)} className="details-button">
              View Details
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
