const API_BASE_URL = 'http://localhost:3001/api';

export const fetchMenuItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/menu-items`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error in fetchMenuItems:', error);
    throw new Error('Failed to fetch menu items: ' + error.message);
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error in createOrder:', error);
    throw new Error('Failed to create order: ' + error.message);
  }
};