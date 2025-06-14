import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Text from '@/components/atoms/Text';
import Badge from '@/components/atoms/Badge';
import PropertyStats from '@/components/molecules/PropertyStats';
import PriceDisplay from '@/components/molecules/PriceDisplay';

const PropertyDetails = ({ property, className = '' }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
const specifications = [
    { label: 'Property Type', value: property?.propertyType || 'N/A' },
    { label: 'Year Built', value: property?.yearBuilt || 'N/A' },
    { label: 'Listed', value: property?.listingDate ? formatDate(property.listingDate) : 'N/A' },
    { label: 'Square Feet', value: property?.squareFeet?.toLocaleString() || 'N/A' },
    { label: 'Bedrooms', value: property?.bedrooms || 'N/A' },
    { label: 'Bathrooms', value: property?.bathrooms || 'N/A' }
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`space-y-8 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
<div className="flex-1">
          <Text variant="heading" weight="bold" size="3xl" className="mb-2">
            {property?.title || 'Property Title'}
          </Text>
          <div className="flex items-center text-gray-600 mb-4">
            <ApperIcon name="MapPin" className="w-5 h-5 mr-2" />
            <Text size="lg">{property?.address || 'Address not available'}</Text>
          </div>
          <PropertyStats
            bedrooms={property?.bedrooms || 0}
            bathrooms={property?.bathrooms || 0}
            squareFeet={property?.squareFeet || 0}
            className="mb-4"
          />
        </div>
<div className="flex flex-col items-end">
          <PriceDisplay price={property?.price || 0} size="3xl" className="mb-2" />
          <Badge variant="primary" size="md">
            {property?.propertyType || 'Property'}
          </Badge>
        </div>
      </div>

      {/* Description */}
      <div>
        <Text variant="heading" weight="semibold" size="xl" className="mb-4">
          About This Property
</Text>
        <Text color="gray-700" className="text-lg leading-relaxed">
          {property?.description || 'No description available.'}
        </Text>
      </div>

      {/* Specifications */}
      <div>
        <Text variant="heading" weight="semibold" size="xl" className="mb-4">
          Property Details
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {specifications.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-4 rounded-lg"
            >
              <Text size="sm" color="gray-600" className="mb-1">
                {spec.label}
</Text>
              <Text weight="semibold" size="lg">
                {spec.value || 'N/A'}
              </Text>
            </motion.div>
          ))}
        </div>
      </div>

{/* Amenities */}
      {property?.amenities && Array.isArray(property.amenities) && property.amenities.length > 0 && (
        <div>
          <Text variant="heading" weight="semibold" size="xl" className="mb-4">
            Amenities & Features
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {property.amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-primary/30 transition-colors duration-200"
              >
                <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                <Text weight="medium">{amenity || 'Feature'}</Text>
              </motion.div>
            ))}
          </div>
        </div>
      )}

{/* Location Info */}
      {property?.coordinates && (
        <div>
          <Text variant="heading" weight="semibold" size="xl" className="mb-4">
            Location
          </Text>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center mb-3">
              <ApperIcon name="MapPin" className="w-5 h-5 text-primary mr-2" />
              <Text weight="medium">{property?.address || 'Address not available'}</Text>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Text color="gray-600" className="mb-1">Latitude</Text>
                <Text weight="medium">{property?.coordinates?.lat || 'N/A'}</Text>
              </div>
              <div>
                <Text color="gray-600" className="mb-1">Longitude</Text>
                <Text weight="medium">{property?.coordinates?.lng || 'N/A'}</Text>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PropertyDetails;