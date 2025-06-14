import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Loading from '@/components/atoms/Loading';
import ImageGallery from '@/components/organisms/ImageGallery';
import PropertyDetails from '@/components/organisms/PropertyDetails';
import ContactForm from '@/components/organisms/ContactForm';
import { propertyService, savedPropertyService } from '@/services';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [savingToggle, setSavingToggle] = useState(false);

  useEffect(() => {
    if (id) {
      loadProperty();
      checkSavedStatus();
    }
  }, [id]);

  const loadProperty = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await propertyService.getById(id);
      setProperty(data);
    } catch (err) {
      setError(err.message || 'Property not found');
      toast.error('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  const checkSavedStatus = async () => {
    try {
      const saved = await savedPropertyService.isPropertySaved(id);
      setIsSaved(saved);
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const handleSaveToggle = async () => {
    setSavingToggle(true);
    
    try {
      const result = await savedPropertyService.toggleSave(id);
      setIsSaved(result.saved);
      
      if (result.saved) {
        toast.success('Property saved to favorites!');
      } else {
        toast.success('Property removed from favorites');
      }
    } catch (error) {
      toast.error('Failed to update saved status');
    } finally {
      setSavingToggle(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <Loading size="lg" className="mx-auto mb-4" />
              <Text color="gray-600">Loading property details...</Text>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
            </div>
            <Text variant="heading" size="xl" weight="semibold" className="mb-2">
              Property Not Found
            </Text>
            <Text color="gray-600" className="mb-6">
              The property you're looking for doesn't exist or has been removed.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleBackClick} variant="outline">
                <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Button onClick={() => navigate('/buy')} variant="primary">
                Browse Properties
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to Listings
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <ImageGallery
              images={property.images}
              title={property.title}
              className="aspect-[16/10]"
            />

            {/* Property Details */}
            <PropertyDetails property={property} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-3"
              >
                <Button
                  variant={isSaved ? "accent" : "outline"}
                  onClick={handleSaveToggle}
                  disabled={savingToggle}
                  className="flex-1"
                >
                  {savingToggle ? (
                    <Loading size="sm" className="mr-2" />
                  ) : (
                    <ApperIcon 
                      name="Heart" 
                      className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} 
                    />
                  )}
                  {isSaved ? 'Saved' : 'Save'}
                </Button>
                
                <Button variant="outline" className="flex-1">
                  <ApperIcon name="Share" className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </motion.div>

              {/* Contact Form */}
              <ContactForm propertyTitle={property.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;