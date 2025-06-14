import propertyData from '../mockData/property.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PropertyService {
  constructor() {
    this.properties = [...propertyData];
  }

  async getAll() {
    await delay(300);
    return [...this.properties];
  }

  async getById(id) {
    await delay(200);
    const property = this.properties.find(p => p.id === id);
    if (!property) {
      throw new Error('Property not found');
    }
    return { ...property };
  }

  async getByType(type) {
    await delay(300);
    const filtered = this.properties.filter(p => 
      p.propertyType.toLowerCase() === type.toLowerCase()
    );
    return [...filtered];
  }

  async search(filters) {
    await delay(400);
    let filtered = [...this.properties];

    if (filters.priceMin) {
      filtered = filtered.filter(p => p.price >= filters.priceMin);
    }

    if (filters.priceMax) {
      filtered = filtered.filter(p => p.price <= filters.priceMax);
    }

    if (filters.propertyType && filters.propertyType.length > 0) {
      filtered = filtered.filter(p => 
        filters.propertyType.includes(p.propertyType)
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= filters.bedrooms);
    }

    if (filters.bathrooms) {
      filtered = filtered.filter(p => p.bathrooms >= filters.bathrooms);
    }

    if (filters.location) {
      filtered = filtered.filter(p => 
        p.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    return [...filtered];
  }

  async create(property) {
    await delay(300);
    const newProperty = {
      ...property,
      id: Date.now().toString(),
      listingDate: new Date().toISOString()
    };
    this.properties.push(newProperty);
    return { ...newProperty };
  }

  async update(id, updates) {
    await delay(300);
    const index = this.properties.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Property not found');
    }
    this.properties[index] = { ...this.properties[index], ...updates };
    return { ...this.properties[index] };
  }

  async delete(id) {
    await delay(300);
    const index = this.properties.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Property not found');
    }
    this.properties.splice(index, 1);
    return { success: true };
  }
}

export default new PropertyService();