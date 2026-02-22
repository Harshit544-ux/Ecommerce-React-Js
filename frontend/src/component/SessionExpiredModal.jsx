import React from 'react';
import { useNavigate } from 'react-router-dom';

const SessionExpiredModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const handleLoginClick = () => {
    onClose();
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm mx-auto">
        <h2 className="text-2xl prata-regular mb-4">Your session has expired</h2>
        <p className="mb-6 text-gray-600">Please log in again to continue.</p>
        <button
          onClick={handleLoginClick}
          className="w-full bg-gray-800 text-white py-2 mt-2 rounded-md"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
