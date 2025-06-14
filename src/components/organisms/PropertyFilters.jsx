import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';
import FilterPill from '@/components/molecules/FilterPill';
import { filterService } from '@/services';

const PropertyFilters = ({ onFiltersChange, activeFilters, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [localFilters, setLocalFilters] = useState({
    priceMin: '',
    priceMax: '',
    propertyType: [],
    bedrooms: '',
    bathrooms: '',
    location: ''
  });

  useEffect(() => {
    const loadFilterData = async () => {
      try {
        const [types, ranges] = await Promise.all([
          filterService.getPropertyTypes(),
          filterService.getPriceRanges()
        ]);
        setPropertyTypes(types);
        setPriceRanges(ranges);
      } catch (error) {
        console.error('Error loading filter data:', error);
      }
    };
    loadFilterData();
  }, []);

  useEffect(() => {
    setLocalFilters(activeFilters);
  }, [activeFilters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters };
    
    if (key === 'propertyType') {
      const types = [...newFilters.propertyType];
      const index = types.indexOf(value);
      if (index > -1) {
        types.splice(index, 1);
      } else {
        types.push(value);
      }
      newFilters.propertyType = types;
    } else {
      newFilters[key] = value;
    }
    
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceRangeSelect = (range) => {
    const newFilters = {
      ...localFilters,
      priceMin: range.min,
      priceMax: range.max
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      priceMin: '',
      priceMax: '',
      propertyType: [],
      bedrooms: '',
      bathrooms: '',
      location: ''
    };
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.priceMin || localFilters.priceMax) count++;
    if (localFilters.propertyType.length > 0) count += localFilters.propertyType.length;
    if (localFilters.bedrooms) count++;
    if (localFilters.bathrooms) count++;
    if (localFilters.location) count++;
    return count;
  };

  const getActiveFilterLabels = () => {
    const labels = [];
    
    if (localFilters.priceMin || localFilters.priceMax) {
      const min = localFilters.priceMin ? `$${(localFilters.priceMin / 1000).toFixed(0)}K` : '';
      const max = localFilters.priceMax ? `$${(localFilters.priceMax / 1000).toFixed(0)}K` : '';
      if (min && max) {
        labels.push(`${min} - ${max}`);
      } else if (min) {
        labels.push(`Over ${min}`);
      } else if (max) {
        labels.push(`Under ${max}`);
      }
    }
    
    localFilters.propertyType.forEach(type => {
      labels.push(type);
    });
    
    if (localFilters.bedrooms) {
      labels.push(`${localFilters.bedrooms} beds`);
    }
    
    if (localFilters.bathrooms) {
      labels.push(`${localFilters.bathrooms} baths`);
    }
    
    if (localFilters.location) {
      labels.push(localFilters.location);
    }
    
    return labels;
  };

  const activeCount = getActiveFilterCount();
  const activeLabels = getActiveFilterLabels();

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Filter Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Filter" className="w-5 h-5 text-gray-600" />
            <Text weight="semibold">Filters</Text>
            {activeCount > 0 && (
              <div className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeCount}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {activeCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-gray-600 hover:text-gray-800"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-600 hover:text-gray-800"
            >
              <ApperIcon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                className="w-4 h-4" 
              />
            </Button>
          </div>
        </div>

        {/* Active Filter Pills */}
        {activeLabels.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {activeLabels.map((label, index) => (
              <FilterPill
                key={index}
                label={label}
                onRemove={() => {
                  // Handle individual filter removal
                  if (label.includes('beds')) {
                    handleFilterChange('bedrooms', '');
                  } else if (label.includes('baths')) {
                    handleFilterChange('bathrooms', '');
                  } else if (label.includes('$')) {
                    handleFilterChange('priceMin', '');
                    handleFilterChange('priceMax', '');
                  } else if (propertyTypes.includes(label)) {
                    handleFilterChange('propertyType', label);
                  } else {
                    handleFilterChange('location', '');
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Expanded Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-6">
              
              {/* Location */}
              <div>
                <Text weight="semibold" className="mb-2">Location</Text>
                <Input
                  placeholder="Enter city, neighborhood, or ZIP code"
                  value={localFilters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  icon="MapPin"
                />
              </div>

              {/* Price Range */}
              <div>
                <Text weight="semibold" className="mb-2">Price Range</Text>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Input
                    type="number"
                    placeholder="Min Price"
                    value={localFilters.priceMin}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value ? parseInt(e.target.value) : '')}
                  />
                  <Input
                    type="number"
                    placeholder="Max Price"
                    value={localFilters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value ? parseInt(e.target.value) : '')}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handlePriceRangeSelect(range)}
                      className="text-xs"
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <Text weight="semibold" className="mb-2">Property Type</Text>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {propertyTypes.map((type) => (
                    <Button
                      key={type}
                      variant={localFilters.propertyType.includes(type) ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleFilterChange('propertyType', type)}
                      className="justify-start"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Bedrooms & Bathrooms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Text weight="semibold" className="mb-2">Bedrooms</Text>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Button
                        key={num}
                        variant={localFilters.bedrooms === num ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => handleFilterChange('bedrooms', localFilters.bedrooms === num ? '' : num)}
                      >
                        {num}+
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Text weight="semibold" className="mb-2">Bathrooms</Text>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Button
                        key={num}
                        variant={localFilters.bathrooms === num ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => handleFilterChange('bathrooms', localFilters.bathrooms === num ? '' : num)}
                      >
                        {num}+
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyFilters;