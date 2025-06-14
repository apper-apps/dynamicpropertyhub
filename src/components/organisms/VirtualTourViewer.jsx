import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Loading from '@/components/atoms/Loading';
import Text from '@/components/atoms/Text';

const VirtualTourViewer = ({ isOpen, onClose, tourUrl, propertyTitle }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleClose = () => {
    setIsLoading(true);
    setHasError(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <Text variant="heading" size="lg" weight="semibold" className="mb-1">
                  Virtual Tour
                </Text>
                <Text color="gray-600" size="sm">
                  {propertyTitle}
                </Text>
              </div>
              <Button
                variant="ghost"
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Tour Content */}
          <div className="pt-20 h-full">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <Loading size="lg" className="mx-auto mb-4" />
                  <Text color="gray-600">Loading virtual tour...</Text>
                </div>
              </div>
            )}

            {hasError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
                  </div>
                  <Text variant="heading" size="lg" weight="semibold" className="mb-2">
                    Tour Unavailable
                  </Text>
                  <Text color="gray-600" className="mb-6">
                    Unable to load the virtual tour. Please try again later.
                  </Text>
                  <Button onClick={handleClose} variant="primary">
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <iframe
                src={tourUrl}
                className="w-full h-full border-0"
                allowFullScreen
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title="Virtual Property Tour"
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VirtualTourViewer;