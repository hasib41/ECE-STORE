const axios = require('axios');

// Base URL for your API
const API_URL = 'http://localhost:5005';

// Test function to check if server is running
async function testServerRunning() {
  try {
    const response = await axios.get(API_URL);
    console.log('Server status:', response.status, response.data);
    return true;
  } catch (error) {
    console.error('Server not running:', error.message);
    return false;
  }
}

// Test function to get all merchandise
async function testGetAllMerchandise() {
  try {
    const response = await axios.get(`${API_URL}/api/merchandises`);
    console.log('Get all merchandise status:', response.status);
    console.log('Total items:', response.data.length);
    return response.data;
  } catch (error) {
    console.error('Error getting merchandise:', error.message);
    return null;
  }
}

// Main function to run all tests
async function runTests() {
  console.log('---- TESTING API ENDPOINTS ----');
  
  // Check if server is running
  const serverRunning = await testServerRunning();
  if (!serverRunning) {
    console.log('Cannot continue testing as server is not running');
    return;
  }
  
  // Test merchandise endpoints
  const merchandise = await testGetAllMerchandise();
  if (merchandise && merchandise.length > 0) {
    // Test getting a single merchandise item
    try {
      const singleResponse = await axios.get(`${API_URL}/api/merchandises/${merchandise[0]._id}`);
      console.log('Get single merchandise status:', singleResponse.status);
      console.log('Item name:', singleResponse.data.name);
    } catch (error) {
      console.error('Error getting single merchandise:', error.message);
    }
  }
  
  // Test orders endpoint
  try {
    const ordersResponse = await axios.get(`${API_URL}/api/orders`);
    console.log('Get orders status:', ordersResponse.status);
    console.log('Orders returned:', ordersResponse.data.length || 'N/A');
  } catch (error) {
    console.error('Error getting orders:', error.message);
  }
  
  console.log('---- TESTING COMPLETE ----');
}

// Run all tests
runTests();
