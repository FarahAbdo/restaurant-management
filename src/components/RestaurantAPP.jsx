// src/components/RestaurantApp.jsx
import { useState, useEffect } from 'react';
import { fetchMenuItems, createOrder } from '../services/api';

export default function RestaurantApp() {
  const [activeTab, setActiveTab] = useState('menu');
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    customerId: '',
    items: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        console.log('Fetching menu items...');
        const data = await fetchMenuItems();
        console.log('Received data:', data);
        setMenuItems(data);
        setError(null);
      } catch (err) {
        console.error('Error details:', err);
        setError('Failed to load menu items: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMenuItems();
  }, []);

  const handleAddToOrder = (item) => {
    setNewOrder(prev => ({
      ...prev,
      items: [...prev.items, item]
    }));
  };

  const handleCreateOrder = async () => {
    if (!newOrder.customerId || newOrder.items.length === 0) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      const createdOrder = await createOrder({
        customer_id: newOrder.customerId,
        items: newOrder.items.map(item => ({
          item_id: item.id,
          quantity: 1
        }))
      });
      
      setOrders(prev => [...prev, createdOrder]);
      setNewOrder({ customerId: '', items: [] });
      setError(null);
    } catch (err) {
      setError('Failed to create order');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Restaurant Management</h1>
      
      {/* Navigation */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'menu' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('menu')}
        >
          Menu
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Menu View */}
      {activeTab === 'menu' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map(item => (
              <div key={item.id} className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="my-2">{item.description}</p>
                <p className="font-bold">${item.price.toFixed(2)}</p>
                <button
                  onClick={() => handleAddToOrder(item)}
                  className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add to Order
                </button>
              </div>
            ))}
          </div>

          {/* New Order Form */}
          <div className="mt-8 border rounded-lg p-4">
            <h3 className="text-xl font-bold mb-4">Create New Order</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Customer ID</label>
              <input
                type="text"
                value={newOrder.customerId}
                onChange={(e) => setNewOrder(prev => ({ ...prev, customerId: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Selected Items:</h4>
              {newOrder.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-1">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="mt-2 font-bold">
                Total: ${newOrder.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </div>
            </div>
            <button
              onClick={handleCreateOrder}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Create Order
            </button>
          </div>
        </div>
      )}

      {/* Orders View */}
      {activeTab === 'orders' && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Orders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map(order => (
              <div
                key={order.id}
                className="border rounded-lg p-4 cursor-pointer hover:shadow-lg"
                onClick={() => setSelectedOrder(order)}
              >
                <h3 className="font-semibold">Order #{order.id}</h3>
                <p>Customer ID: {order.customerId}</p>
                <p>Status: {order.status}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
              </div>
            ))}
          </div>

          {selectedOrder && (
            <div className="mt-6 border rounded-lg p-4">
              <h3 className="text-xl font-bold mb-4">Order Details</h3>
              <p>Order #{selectedOrder.id}</p>
              <p>Customer ID: {selectedOrder.customerId}</p>
              <p>Status: {selectedOrder.status}</p>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Items:</h4>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <span>{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-bold">
                Total: ${selectedOrder.total.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}