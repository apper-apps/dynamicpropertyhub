import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const FilterPill = ({ label, onRemove, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 ${className}`}
    >
      <Text size="sm" weight="medium">
        {label}
      </Text>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onRemove}
        className="ml-2 p-0.5 hover:bg-primary/20 rounded-full transition-colors duration-200"
      >
        <ApperIcon name="X" className="w-3 h-3" />
      </motion.button>
    </motion.div>
  );
};

export default FilterPill;