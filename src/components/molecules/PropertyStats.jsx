import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';

const PropertyStats = ({ bedrooms, bathrooms, squareFeet, className = '' }) => {
  const stats = [
    { icon: 'Bed', value: bedrooms, label: bedrooms === 1 ? 'Bedroom' : 'Bedrooms' },
    { icon: 'Bath', value: bathrooms, label: bathrooms === 1 ? 'Bathroom' : 'Bathrooms' },
    { icon: 'Square', value: squareFeet?.toLocaleString(), label: 'sq ft' }
  ];

  return (
    <div className={`flex items-center space-x-6 ${className}`}>
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ApperIcon name={stat.icon} className="w-5 h-5 text-gray-600" />
          <div className="flex items-baseline space-x-1">
            <Text weight="semibold" color="gray-900">
              {stat.value}
            </Text>
            <Text size="sm" color="gray-600">
              {stat.label}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyStats;