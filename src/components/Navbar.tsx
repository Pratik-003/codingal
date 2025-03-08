import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const Navbar = () => {
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Timer logic
  useEffect(() => {
    if (!isTimerRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  // Format time to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Handle End Class button click
  const handleEndClass = () => {
    setIsModalOpen(true);
  };

  // Handle modal confirmation
  const handleConfirm = () => {
    setIsModalOpen(false);
    setIsTimerRunning(false); // Stop the timer
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md relative z-50">
      
      {/* Left Side: Logo and Home */}
      <div className="flex items-center space-x-3">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <span className="text-lg font-semibold">Codingal</span>
        <Link
          to="/"
          className="hidden md:block text-blue-600 text-lg font-semibold hover:underline"
        >
          Home
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4">
        <Link
          to="/posts"
          className="text-blue-600 text-lg font-semibold hover:underline"
        >
          Posts
        </Link>
        <span className="text-lg font-bold text-gray-700">
          {formatTime(timeLeft)}
        </span>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={handleEndClass}
        >
          End Class
        </button>
      </div>

      {/* Mobile Hamburger Menu */}
      <button
        className="md:hidden block focus:outline-none"
        onClick={toggleDropdown}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Mobile Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-md p-4 w-48 z-50 transition-all duration-300 ease-in-out">
          <Link
            to="/"
            className="block text-blue-600 text-lg font-semibold hover:underline mb-3"
          >
            Home
          </Link>
          <Link
            to="/posts"
            className="block text-blue-600 text-lg font-semibold hover:underline mb-3"
          >
            Posts
          </Link>
          <span className="block text-lg font-bold text-gray-700 mb-3">
            {formatTime(timeLeft)}
          </span>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
            onClick={handleEndClass}
          >
            End Class
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </nav>
  );
};

export default Navbar;
