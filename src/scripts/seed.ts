import mongoose from 'mongoose';
import User from '@models/User.model';
import Product from '../models/Product.model';
import connectDB from '../config/db';

// Sample data
const users = [
  {
    email: 'admin@example.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'ADMIN'
  },
  {
    email: 'customer@example.com',
    password: 'customer123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'CUSTOMER'
  }
];

const products = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    quantity: 50
  },
  {
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health monitoring',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    quantity: 30
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable running shoes for everyday use',
    price: 89.99,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    quantity: 100
  },
  {
    name: 'Backpack',
    description: 'Durable backpack with multiple compartments',
    price: 59.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    quantity: 75
  }
];

const seedDB = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    
    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded:', createdUsers.length);
    
    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log('Products seeded:', createdProducts.length);
    
    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();