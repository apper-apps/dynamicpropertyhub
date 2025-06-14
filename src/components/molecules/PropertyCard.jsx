import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Badge from '@/components/atoms/Badge';
import { savedPropertyService } from '@/services';

const PropertyCard = ({ property, index = 0 }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const saved = await savedPropertyService.isPropertySaved(property.id);
        setIsSaved(saved);
      } catch (error) {
        console.error('Error checking saved status:', error);
      }
    };
    checkSavedStatus();
  }, [property.id]);

  const handleSaveToggle = async (e) => {
    e.stopPropagation();
    setLoading(true);
    
    try {
      const result = await savedPropertyService.toggleSave(property.id);
      setIsSaved(result.saved);
      
      if (result.saved) {
        toast.success('Property saved to favorites!');
      } else {
        toast.success('Property removed from favorites');
      }
    } catch (error) {
      toast.error('Failed to update saved status');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-surface rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSaveToggle}
          disabled={loading}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200"
        >
          <ApperIcon
            name="Heart"
            className={`w-5 h-5 transition-colors duration-200 ${
              isSaved ? 'text-error fill-current' : 'text-gray-600'
            }`}
          />
        </motion.button>

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="primary" size="sm">
            {property.propertyType}
          </Badge>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
            <Text 
              variant="heading" 
              weight="bold" 
              size="lg" 
              color="primary"
              className="leading-none"
            >
              {formatPrice(property.price)}
            </Text>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Text 
          variant="heading" 
          weight="semibold" 
          size="lg" 
          className="mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200"
        >
          {property.title}
        </Text>

        <div className="flex items-center text-gray-600 mb-3">
          <ApperIcon name="MapPin" className="w-4 h-4 mr-1 flex-shrink-0" />
          <Text size="sm" className="line-clamp-1">
            {property.address}
          </Text>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <ApperIcon name="Bed" className="w-4 h-4 mr-1" />
              <Text size="sm">{property.bedrooms}</Text>
            </div>
            <div className="flex items-center">
              <ApperIcon name="Bath" className="w-4 h-4 mr-1" />
              <Text size="sm">{property.bathrooms}</Text>
            </div>
            <div className="flex items-center">
              <ApperIcon name="Square" className="w-4 h-4 mr-1" />
              <Text size="sm">{property.squareFeet.toLocaleString()} sq ft</Text>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/property/${property.id}`);
          }}
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
};

export default PropertyCard;