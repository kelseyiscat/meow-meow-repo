// sp500-tracker.js
// A simple S&P 500 tracking utility

class SP500Tracker {
  constructor() {
    this.symbol = '^GSPC';
    this.history = [];
  }

  async getLatestPrice() {
    try {
      // Simulate API call for demo purposes
      const mockData = {
        symbol: this.symbol,
        price: (Math.random() * (6000 - 5000) + 5000).toFixed(2),
        change: (Math.random() * 20 - 10).toFixed(2),
        timestamp: new Date().toISOString()
      };
      
      this.history.push(mockData);
      console.log(`📈 S&P 500 (^GSPC): $${mockData.price} (${mockData.change > 0 ? '+' : ''}${mockData.change})`);
      return mockData;
    } catch (error) {
      console.error('Failed to fetch S&P 500 data:', error);
      throw error;
    }
  }

  getHistory() {
    return this.history;
  }

  clearHistory() {
    this.history = [];
    console.log('S&P 500 history cleared.');
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SP500Tracker;
}

// Demo usage
if (require.main === module) {
  const tracker = new SP500Tracker();
  console.log('=== S&P 500 Tracker Demo ===');
  tracker.getLatestPrice();
  tracker.getLatestPrice();
  tracker.getLatestPrice();
  console.log('\nHistory:', tracker.getHistory());
}
