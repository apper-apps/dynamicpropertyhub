import savedPropertyData from '../mockData/savedProperty.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class SavedPropertyService {
  constructor() {
    this.savedProperties = [...savedPropertyData];
  }

  async getAll() {
    await delay(300);
    return [...this.savedProperties];
  }

  async getById(id) {
    await delay(200);
    const saved = this.savedProperties.find(s => s.id === id);
    if (!saved) {
      throw new Error('Saved property not found');
    }
    return { ...saved };
  }

  async create(savedProperty) {
    await delay(300);
    const newSaved = {
      ...savedProperty,
      id: Date.now().toString(),
      savedDate: new Date().toISOString()
    };
    this.savedProperties.push(newSaved);
    return { ...newSaved };
  }

  async delete(id) {
    await delay(300);
    const index = this.savedProperties.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Saved property not found');
    }
    this.savedProperties.splice(index, 1);
    return { success: true };
  }

  async isPropertySaved(propertyId) {
    await delay(100);
    return this.savedProperties.some(s => s.propertyId === propertyId);
  }

  async toggleSave(propertyId) {
    await delay(200);
    const existingIndex = this.savedProperties.findIndex(s => s.propertyId === propertyId);
    
    if (existingIndex > -1) {
      this.savedProperties.splice(existingIndex, 1);
      return { saved: false };
    } else {
      const newSaved = {
        id: Date.now().toString(),
        propertyId,
        savedDate: new Date().toISOString()
      };
      this.savedProperties.push(newSaved);
      return { saved: true, savedProperty: { ...newSaved } };
    }
  }
}

export default new SavedPropertyService();