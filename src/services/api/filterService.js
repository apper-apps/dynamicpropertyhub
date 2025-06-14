const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class FilterService {
  constructor() {
    this.savedFilters = [];
  }

  async getPropertyTypes() {
    await delay(200);
    return [
      'House',
      'Apartment',
      'Condo',
      'Townhouse',
      'Villa',
      'Studio'
    ];
  }

  async getPriceRanges() {
    await delay(200);
    return [
      { label: 'Under $200K', min: 0, max: 200000 },
      { label: '$200K - $400K', min: 200000, max: 400000 },
      { label: '$400K - $600K', min: 400000, max: 600000 },
      { label: '$600K - $800K', min: 600000, max: 800000 },
      { label: '$800K - $1M', min: 800000, max: 1000000 },
      { label: 'Over $1M', min: 1000000, max: null }
    ];
  }

  async saveFilter(filter) {
    await delay(200);
    const savedFilter = {
      ...filter,
      id: Date.now().toString(),
      savedDate: new Date().toISOString()
    };
    this.savedFilters.push(savedFilter);
    return { ...savedFilter };
  }

  async getSavedFilters() {
    await delay(200);
    return [...this.savedFilters];
  }

  async deleteFilter(id) {
    await delay(200);
    const index = this.savedFilters.findIndex(f => f.id === id);
    if (index === -1) {
      throw new Error('Filter not found');
    }
    this.savedFilters.splice(index, 1);
    return { success: true };
  }
}

export default new FilterService();