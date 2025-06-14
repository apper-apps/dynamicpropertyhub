import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.toString().length > 0;

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className={`absolute left-3 pointer-events-none transition-all duration-200 ${
          isFocused || hasValue
            ? 'top-2 text-xs text-primary bg-white px-1 -translate-y-1/2'
            : 'top-1/2 text-gray-500 -translate-y-1/2'
        }`}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <ApperIcon name={icon} className="w-5 h-5 text-gray-400" />
          </div>
        )}
        
        <input
          type={type}
          placeholder={!label ? placeholder : ''}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors duration-200 ${
            icon ? 'pl-10' : ''
          } ${label ? 'pt-4' : ''} ${
            error ? 'border-error focus:border-error focus:ring-error/50' : ''
          }`}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-error flex items-center">
          <ApperIcon name="AlertCircle" className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;