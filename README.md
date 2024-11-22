# Restaurant Management System

A full-stack restaurant management application built with React, Node.js, and Azure MySQL.

![image](https://github.com/user-attachments/assets/1d01bfc0-708f-4e76-8089-3fbb5b246112)

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Azure account with MySQL database
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/FarahAbdo/restaurant-management.git
cd restaurant-management
```

2. Install dependencies:
```bash
npm install
```

## Database Setup

1. Log into [Azure Portal](https://portal.azure.com)
2. Navigate to your Azure Database for MySQL server
3. Open Query editor (or use MySQL Workbench connected to your Azure database)
4. Execute the following SQL commands:

```sql
CREATE TABLE menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    item_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (item_id) REFERENCES menu_items(id)
);
```

## Configuration

1. Create a `.env` file in the backend directory:
```env
AZURE_MYSQL_HOST=your-azure-mysql-server.mysql.database.azure.com
AZURE_MYSQL_USER=your-username
AZURE_MYSQL_PASSWORD=your-password
AZURE_MYSQL_DATABASE=your-database-name
```

2. Configure Azure MySQL Firewall:
   - Go to Azure Portal
   - Navigate to your MySQL server
   - Click on "Connection security"
   - Add your IP address to firewall rules
   - Save changes

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```

3. Access the application at `http://localhost:3000`

## Project Structure
```
restaurant-management/
├── src/
│   ├── components/
│   │   └── RestaurantAPP.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.tsx
│   └── main.tsx
│   └── index.css
├── backend/
│   ├── server.js
│   └── .env
├── public/
├── package.json
└── README.md
```

## Features
- Menu item management
- Order creation and tracking
- Real-time order status updates
- Customer management

## API Endpoints

### Menu Items
- GET `/api/menu-items` - Fetch all menu items
- POST `/api/menu-items` - Create new menu item

### Orders
- GET `/api/orders` - Fetch all orders
- POST `/api/orders` - Create new order
- PUT `/api/orders/:id` - Update order status

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments
- React documentation
- Azure MySQL documentation
- Tailwind CSS
```

This README provides:
- Clear installation instructions
- Database setup steps
- Configuration requirements
- Running instructions
- Project structure
- API documentation
- Contributing guidelines


