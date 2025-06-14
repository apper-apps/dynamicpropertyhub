import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Loading from '@/components/atoms/Loading';
import PropertyCard from '@/components/molecules/PropertyCard';
import { savedPropertyService, propertyService } from '@/services';

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSavedProperties();
  }, []);

  const loadSavedProperties = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [savedData, allProperties] = await Promise.all([
        savedPropertyService.getAll(),
        propertyService.getAll()
      ]);

      // Match saved properties with full property data
      const savedWithDetails = savedData.map(saved => {
        const propertyDetails = allProperties.find(p => p.id === saved.propertyId);
        return {
          ...saved,
          property: propertyDetails
        };
      }).filter(item => item.property); // Remove any saved properties that don't have matching property data

      setSavedProperties(savedWithDetails);
      setProperties(savedWithDetails.map(item => item.property));
    } catch (err) {
      setError(err.message || 'Failed to load saved properties');
      toast.error('Failed to load saved properties');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProperty = async (propertyId) => {
    try {
      await savedPropertyService.toggleSave(propertyId);
      
      // Remove from local state
      setSavedProperties(prev => prev.filter(item => item.propertyId !== propertyId));
      setProperties(prev => prev.filter(p => p.id !== propertyId));
      
      toast.success('Property removed from saved list');
    } catch (error) {
      toast.error('Failed to remove property');
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to remove all saved properties?')) {
      try {
        // Remove all saved properties
        const removePromises = savedProperties.map(item => 
          savedPropertyService.toggleSave(item.propertyId)
        );
        await Promise.all(removePromises);
        
        setSavedProperties([]);
        setProperties([]);
        
        toast.success('All saved properties removed');
      } catch (error) {
        toast.error('Failed to remove all properties');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <Loading size="lg" className="mx-auto mb-4" />
              <Text color="gray-600">Loading saved properties...</Text>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
          </div>
          <Text variant="heading" size="xl" weight="semibold" className="mb-2">
            Failed to Load Saved Properties
          </Text>
          <Text color="gray-600" className="mb-6">
            {error}
          </Text>
          <Button onClick={loadSavedProperties} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Text variant="heading" size="3xl" weight="bold" className="mb-2">
                Saved Properties
              </Text>
              <Text color="gray-600" size="lg">
                {properties.length} {properties.length === 1 ? 'property' : 'properties'} saved
              </Text>
            </div>
            
            {properties.length > 0 && (
              <div className="mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  onClick={handleClearAll}
                  className="flex items-center"
                >
                  <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Content */}
        {properties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Heart" className="w-12 h-12 text-gray-400" />
              </div>
            </motion.div>
            <Text variant="heading" size="2xl" weight="semibold" className="mb-4">
              No Saved Properties Yet
            </Text>
            <Text color="gray-600" size="lg" className="mb-8 max-w-md mx-auto">
              Start exploring properties and save your favorites to create your personal collection
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                onClick={() => window.location.href = '/buy'}
                className="flex items-center"
              >
                <ApperIcon name="Search" className="w-4 h-4 mr-2" />
                Browse Properties
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/rent'}
                className="flex items-center"
              >
                <ApperIcon name="Key" className="w-4 h-4 mr-2" />
                View Rentals
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <PropertyCard property={property} index={index} />
                
                {/* Remove Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemoveProperty(property.id)}
                  className="absolute top-2 left-2 p-2 bg-error/90 hover:bg-error text-white rounded-full shadow-lg transition-colors duration-200 z-10"
                  title="Remove from saved"
                >
                  <ApperIcon name="X" className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProperties;