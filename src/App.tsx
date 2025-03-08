import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Posts from "./pages/Posts";
import Modal from "./components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<h1 className="text-center p-4">Welcome to Codingal</h1>} />
        <Route path="/posts" element={<Posts />} />
      </Routes>

      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          console.log("Class ended"); 
        }}
      />
    </Router>
  );
}

export default App;
