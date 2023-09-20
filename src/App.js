import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageGalleryPage from './pages/ImageGalleryPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage/>} />
          <Route path="/image-gallery" element={<ImageGalleryPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
