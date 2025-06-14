import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import SearchBar from '@/components/molecules/SearchBar';
import PropertyGrid from '@/components/organisms/PropertyGrid';
import PropertyFilters from '@/components/organisms/PropertyFilters';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { propertyService } from '@/services';

const Rent = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    priceMin: '',
    priceMax: '',
    propertyType: [],
    bedrooms: '',
    bathrooms: '',
    location: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [properties, searchTerm, activeFilters]);

  const loadProperties = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // For rental properties, we'll use all properties and adjust display for rental context
      const data = await propertyService.getAll();
      // Convert purchase prices to rental prices (rough estimate: monthly rent = price / 200)
      const rentalProperties = data.map(property => ({
        ...property,
        price: Math.round(property.price / 200), // Convert to monthly rent
        isRental: true
      }));
      setProperties(rentalProperties);
    } catch (err) {
      setError(err.message || 'Failed to load rental properties');
      toast.error('Failed to load rental properties');
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSearch = () => {
    let filtered = [...properties];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.propertyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (activeFilters.priceMin) {
      filtered = filtered.filter(p => p.price >= activeFilters.priceMin);
    }

    if (activeFilters.priceMax) {
      filtered = filtered.filter(p => p.price <= activeFilters.priceMax);
    }

    if (activeFilters.propertyType.length > 0) {
      filtered = filtered.filter(p => 
        activeFilters.propertyType.includes(p.propertyType)
      );
    }

    if (activeFilters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= activeFilters.bedrooms);
    }

    if (activeFilters.bathrooms) {
      filtered = filtered.filter(p => p.bathrooms >= activeFilters.bathrooms);
    }

    if (activeFilters.location) {
      filtered = filtered.filter(p => 
        p.address.toLowerCase().includes(activeFilters.location.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFiltersChange = (filters) => {
    setActiveFilters(filters);
  };

  const clearAllFilters = () => {
    setActiveFilters({
      priceMin: '',
      priceMax: '',
      propertyType: [],
      bedrooms: '',
      bathrooms: '',
      location: ''
    });
    setSearchTerm('');
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
          </div>
          <Text variant="heading" size="xl" weight="semibold" className="mb-2">
            Failed to Load Rental Properties
          </Text>
          <Text color="gray-600" className="mb-6">
            {error}
          </Text>
          <Button onClick={loadProperties} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-secondary to-secondary/80 text-white">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <Text variant="heading" size="4xl" weight="bold" className="mb-4 text-white">
              Find Your Perfect Rental
            </Text>
            <Text size="xl" className="text-white/90 mb-8 max-w-2xl mx-auto">
              Discover comfortable and convenient rental properties in your desired location
            </Text>
            
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search by location, property type, or features..."
              className="max-w-2xl mx-auto"
            />
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-8">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full flex items-center justify-center"
                >
                  <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>

              {/* Filters */}
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                <PropertyFilters
                  onFiltersChange={handleFiltersChange}
                  activeFilters={activeFilters}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <Text variant="heading" size="2xl" weight="semibold" className="mb-2">
                  Properties for Rent
                </Text>
                <Text color="gray-600">
                  {loading ? 'Loading...' : `${filteredProperties.length} rental properties found`}
                </Text>
              </div>
              
              {(searchTerm || Object.values(activeFilters).some(v => v && (Array.isArray(v) ? v.length > 0 : true))) && (
                <Button
                  variant="ghost"
                  onClick={clearAllFilters}
                  className="mt-4 sm:mt-0"
                >
                  <ApperIcon name="X" className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>

            {/* Property Grid */}
            <PropertyGrid
              properties={filteredProperties}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;