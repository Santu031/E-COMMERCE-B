import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/product.model';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/retail-relay';

const products = [
  {
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    price: 24899,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 50,
    featured: true,
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health tracking, GPS, and long battery life.',
    price: 33199,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    stock: 30,
    featured: true,
  },
  {
    name: 'Designer Sunglasses',
    description: 'Stylish sunglasses with UV protection and premium frame quality.',
    price: 13279,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    category: 'Accessories',
    stock: 100,
    featured: false,
  },
  {
    name: 'Leather Backpack',
    description: 'Premium leather backpack with multiple compartments and laptop sleeve.',
    price: 15769,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Bags',
    stock: 45,
    featured: true,
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable running shoes with advanced cushioning and support.',
    price: 10789,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Footwear',
    stock: 75,
    featured: false,
  },
  {
    name: 'Vintage Camera',
    description: 'Classic vintage-style camera for photography enthusiasts.',
    price: 74699,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500',
    category: 'Electronics',
    stock: 15,
    featured: true,
  },
  {
    name: 'Coffee Maker',
    description: 'Professional-grade coffee maker for the perfect brew every morning.',
    price: 20749,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    category: 'Home',
    stock: 40,
    featured: false,
  },
  {
    name: 'Yoga Mat',
    description: 'Eco-friendly yoga mat with excellent grip and cushioning.',
    price: 4149,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    category: 'Sports',
    stock: 200,
    featured: false,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create products
    await Product.insertMany(products);
    console.log('✅ Created products');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      email: 'admin@retailrelay.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    });
    console.log('✅ Created admin user');

    // Create customer user
    const customerPassword = await bcrypt.hash('customer123', 10);
    await User.create({
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'CUSTOMER',
    });
    console.log('✅ Created customer user');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nTest Accounts:');
    console.log('Admin: admin@retailrelay.com / admin123');
    console.log('Customer: customer@example.com / customer123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
