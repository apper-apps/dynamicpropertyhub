import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';

const ContactForm = ({ propertyTitle, className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Your inquiry has been sent successfully! We\'ll contact you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
    } catch (error) {
      toast.error('Failed to send inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-surface p-6 rounded-lg shadow-lg border border-gray-200 ${className}`}
    >
      <div className="flex items-center mb-6">
        <div className="p-2 bg-primary/10 rounded-lg mr-3">
          <ApperIcon name="MessageCircle" className="w-6 h-6 text-primary" />
        </div>
        <div>
          <Text variant="heading" weight="semibold" size="lg">
            Contact Agent
          </Text>
          {propertyTitle && (
            <Text size="sm" color="gray-600">
              Inquire about {propertyTitle}
            </Text>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          label="Full Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          placeholder="Enter your full name"
          icon="User"
        />

        <Input
          type="email"
          label="Email Address"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          placeholder="Enter your email address"
          icon="Mail"
        />

        <Input
          type="tel"
          label="Phone Number"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={errors.phone}
          placeholder="Enter your phone number"
          icon="Phone"
        />

        <div className="relative">
          <label className={`absolute left-3 pointer-events-none transition-all duration-200 ${
            formData.message
              ? 'top-2 text-xs text-primary bg-white px-1 -translate-y-1/2'
              : 'top-4 text-gray-500'
          }`}>
            Message
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            onFocus={() => {}}
            className={`w-full px-3 py-3 pt-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors duration-200 resize-none ${
              errors.message ? 'border-error focus:border-error focus:ring-error/50' : ''
            }`}
            rows="4"
            placeholder=""
          />
          {errors.message && (
            <p className="mt-1 text-sm text-error flex items-center">
              <ApperIcon name="AlertCircle" className="w-4 h-4 mr-1" />
              {errors.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending...
            </div>
          ) : (
            <div className="flex items-center">
              <ApperIcon name="Send" className="w-4 h-4 mr-2" />
              Send Inquiry
            </div>
          )}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <ApperIcon name="Shield" className="w-4 h-4 mr-1" />
            <span>Secure & confidential</span>
          </div>
          <div className="flex items-center">
            <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
            <span>Response within 24 hours</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactForm;