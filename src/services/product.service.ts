import Product, { IProduct } from '../models/Product.model';

export const productService = {
  // Get all products with pagination and filtering
  getAllProducts: async (
    page: number = 1,
    limit: number = 10,
    category?: string,
    search?: string
  ): Promise<{ products: IProduct[]; totalCount: number }> => {
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter: any = {};
    
    if (category) {
      filter.category = category;
    }
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const products = await Product.find(filter)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });
      
    const totalCount = await Product.countDocuments(filter);
    
    return { products, totalCount };
  },

  // Get product by ID
  getProductById: async (id: string): Promise<IProduct | null> => {
    return await Product.findById(id);
  },

  // Create a new product (admin only)
  createProduct: async (productData: Partial<IProduct>): Promise<IProduct> => {
    const product = new Product(productData);
    return await product.save();
  },

  // Update a product (admin only)
  updateProduct: async (id: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  },

  // Delete a product (admin only)
  deleteProduct: async (id: string): Promise<IProduct | null> => {
    return await Product.findByIdAndDelete(id);
  }
};