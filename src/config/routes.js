import Home from '@/components/pages/Home';
import Buy from '@/components/pages/Buy';
import Rent from '@/components/pages/Rent';
import PropertyDetails from '@/components/pages/PropertyDetails';
import SavedProperties from '@/components/pages/SavedProperties';
import Contact from '@/components/pages/Contact';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/home',
    icon: 'Home',
    component: Home
  },
  buy: {
    id: 'buy',
    label: 'Buy',
    path: '/buy',
    icon: 'ShoppingCart',
    component: Buy
  },
  rent: {
    id: 'rent',
    label: 'Rent',
    path: '/rent',
    icon: 'Key',
    component: Rent
  },
  propertyDetails: {
    id: 'property-details',
    label: 'Property Details',
    path: '/property/:id',
    icon: 'Home',
    component: PropertyDetails
  },
  saved: {
    id: 'saved',
    label: 'Saved Properties',
    path: '/saved',
    icon: 'Heart',
    component: SavedProperties
  },
  contact: {
    id: 'contact',
    label: 'Contact',
    path: '/contact',
    icon: 'MessageCircle',
    component: Contact
  }
};

export const routeArray = Object.values(routes);
export default routes;