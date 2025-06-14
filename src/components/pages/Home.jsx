import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import SearchBar from '@/components/molecules/SearchBar';
import PropertyCard from '@/components/molecules/PropertyCard';
import { propertyService } from '@/services';

const Home = () => {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProperties();
  }, []);

  const loadFeaturedProperties = async () => {
    try {
      const properties = await propertyService.getAll();
      // Get first 3 properties as featured
      setFeaturedProperties(properties.slice(0, 3));
    } catch (error) {
      console.error('Error loading featured properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/buy?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const features = [
    {
      icon: 'Search',
      title: 'Smart Search',
      description: 'Find your perfect property with our advanced search filters and location-based recommendations.'
    },
    {
      icon: 'Heart',
      title: 'Save Favorites',
      description: 'Save properties you love and get notified about price changes and similar listings.'
    },
    {
      icon: 'MessageCircle',
      title: 'Expert Support',
      description: 'Connect with experienced real estate professionals who know the local market inside out.'
    },
    {
      icon: 'TrendingUp',
      title: 'Market Insights',
      description: 'Access real-time market data and trends to make informed decisions about your investment.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Properties Listed' },
    { number: '5,000+', label: 'Happy Clients' },
    { number: '15+', label: 'Years Experience' },
    { number: '50+', label: 'Expert Agents' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-primary/90 to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <Text variant="heading" size="4xl" weight="bold" className="mb-6 text-white">
              Find Your Perfect Home
            </Text>
            <Text size="xl" className="mb-8 max-w-3xl mx-auto text-white/90 leading-relaxed">
              Discover exceptional properties in prime locations. Whether you're buying, selling, or renting, we make your real estate journey seamless and rewarding.
            </Text>
            
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search by location, property type, or features..."
                className="shadow-xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="accent"
                size="lg"
                onClick={() => navigate('/buy')}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <ApperIcon name="Home" className="w-5 h-5 mr-2" />
                Browse Properties
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/rent')}
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300"
              >
                <ApperIcon name="Key" className="w-5 h-5 mr-2" />
                View Rentals
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="text-center"
              >
                <Text variant="heading" size="3xl" weight="bold" color="primary" className="mb-2">
                  {stat.number}
                </Text>
                <Text color="gray-600" weight="medium">
                  {stat.label}
                </Text>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Text variant="heading" size="3xl" weight="bold" className="mb-4">
              Why Choose PropertyHub?
            </Text>
            <Text size="lg" color="gray-600" className="max-w-2xl mx-auto">
              We combine cutting-edge technology with personalized service to deliver an exceptional real estate experience.
            </Text>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={feature.icon} className="w-6 h-6 text-primary" />
                </div>
                <Text variant="heading" weight="semibold" size="lg" className="mb-3">
                  {feature.title}
                </Text>
                <Text color="gray-600" className="leading-relaxed">
                  {feature.description}
                </Text>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Text variant="heading" size="3xl" weight="bold" className="mb-4">
              Featured Properties
            </Text>
            <Text size="lg" color="gray-600" className="max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties in the most desirable locations.
            </Text>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 aspect-[4/3] rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/buy')}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              View All Properties
              <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary to-secondary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Text variant="heading" size="3xl" weight="bold" className="mb-4 text-white">
              Ready to Find Your Dream Home?
            </Text>
            <Text size="lg" className="mb-8 max-w-2xl mx-auto text-white/90">
              Join thousands of satisfied customers who found their perfect property with PropertyHub. Start your journey today!
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="accent"
                size="lg"
                onClick={() => navigate('/contact')}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <ApperIcon name="MessageCircle" className="w-5 h-5 mr-2" />
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/buy')}
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-secondary transition-all duration-300"
              >
                <ApperIcon name="Search" className="w-5 h-5 mr-2" />
                Search Properties
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;