import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
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
      
      toast.success('Your message has been sent successfully! We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: 'MapPin',
      title: 'Visit Our Office',
      details: ['123 Real Estate Avenue', 'Downtown Business District', 'Los Angeles, CA 90210']
    },
    {
      icon: 'Phone',
      title: 'Call Us',
      details: ['(555) 123-4567', 'Mon-Fri: 9AM-6PM', 'Sat-Sun: 10AM-4PM']
    },
    {
      icon: 'Mail',
      title: 'Email Us',
      details: ['info@propertyhub.com', 'support@propertyhub.com', 'We respond within 24 hours']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Text variant="heading" size="4xl" weight="bold" className="mb-4 text-white">
              Get in Touch
            </Text>
            <Text size="xl" className="text-white/90 max-w-2xl mx-auto">
              Ready to find your dream property? Our experienced team is here to help you every step of the way.
            </Text>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <Text variant="heading" size="2xl" weight="semibold" className="mb-4">
                Let's Connect
              </Text>
              <Text color="gray-600" size="lg" className="leading-relaxed">
                Whether you're buying, selling, or renting, our dedicated team of real estate professionals is ready to assist you. Reach out to us through any of the channels below.
              </Text>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                    <ApperIcon name={info.icon} className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <Text weight="semibold" size="lg" className="mb-2">
                      {info.title}
                    </Text>
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <Text key={detailIndex} color="gray-600">
                          {detail}
                        </Text>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-6 border-t border-gray-200"
            >
              <Text weight="semibold" className="mb-4">
                Follow Us
              </Text>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'Linkedin'].map((social) => (
                  <motion.button
                    key={social}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-gray-100 hover:bg-primary hover:text-white rounded-lg transition-colors duration-200"
                  >
                    <ApperIcon name={social} className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
          >
            <div className="mb-8">
              <Text variant="heading" size="2xl" weight="semibold" className="mb-2">
                Send Us a Message
              </Text>
              <Text color="gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </Text>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  error={errors.name}
                  icon="User"
                />

                <Input
                  type="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  error={errors.email}
                  icon="Mail"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="tel"
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  error={errors.phone}
                  icon="Phone"
                />

                <Input
                  type="text"
                  label="Subject"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  error={errors.subject}
                  icon="MessageSquare"
                />
              </div>

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
                  className={`w-full px-3 py-3 pt-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors duration-200 resize-none ${
                    errors.message ? 'border-error focus:border-error focus:ring-error/50' : ''
                  }`}
                  rows="5"
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
                    Sending Message...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <ApperIcon name="Send" className="w-4 h-4 mr-2" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;