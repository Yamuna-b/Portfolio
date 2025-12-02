import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto my-6">
      <input
        type="text"
        placeholder="Search all projects by title, tech, or description..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-5 py-3 pl-14 text-lg text-white bg-slate-800/70 border-2 border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/80 backdrop-blur-sm transition-all duration-300"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
        <Search className="w-6 h-6 text-slate-400" />
      </div>
    </div>
  );
};

export default SearchBar;
