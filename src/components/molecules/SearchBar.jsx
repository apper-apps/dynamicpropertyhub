import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const SearchBar = ({ onSearch, placeholder = "Search by location, property type, or features...", className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex items-center">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
          <ApperIcon name="Search" className="w-5 h-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors duration-200 bg-white shadow-sm"
        />
        
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-16 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <ApperIcon name="X" className="w-4 h-4 text-gray-400" />
          </button>
        )}
        
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <ApperIcon name="Search" className="w-4 h-4" />
        </Button>
      </div>
    </motion.form>
  );
};

export default SearchBar;