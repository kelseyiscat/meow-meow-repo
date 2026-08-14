// weather-tracker.js
// A simple weather tracking utility

class WeatherTracker {
  constructor(apiKey = 'demo-key') {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    this.history = [];
  }

  async getCurrentWeather(city) {
    try {
      // Simulate API call for demo purposes
      const mockData = {
        city: city,
        temp: Math.floor(Math.random() * 30) + 5,
        condition: ['Sunny', 'Cloudy', 'Rainy', 'Clear'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 40) + 40,
        timestamp: new Date().toISOString()
      };
      
      this.history.push(mockData);
      console.log(`🌤️  Weather in ${city}: ${mockData.temp}°C, ${mockData.condition}, Humidity: ${mockData.humidity}%`);
      return mockData;
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      throw error;
    }
  }

  getHistory() {
    return this.history;
  }

  clearHistory() {
    this.history = [];
    console.log('Weather history cleared.');
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WeatherTracker;
}

// Demo usage
if (require.main === module) {
  const tracker = new WeatherTracker();
  console.log('=== Weather Tracker Demo ===');
  tracker.getCurrentWeather('New York');
  tracker.getCurrentWeather('Tokyo');
  tracker.getCurrentWeather('London');
  console.log('\nHistory:', tracker.getHistory());
}
