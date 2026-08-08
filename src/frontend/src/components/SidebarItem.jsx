import React from 'react';

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-r-full transition-colors ${
      active ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <span className={`${active ? 'text-blue-600' : 'text-gray-500'}`}>{icon}</span>
    <span className="font-medium text-sm truncate">{label}</span>
  </button>
);

export default SidebarItem;
