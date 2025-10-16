import Product, { IProduct } from '../models/Product.model';

interface GetProductsQuery {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export class ProductService {
  async getProducts(query: GetProductsQuery) {
    const { page = 1, limit = 12, category, search } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getProductById(id: string): Promise<IProduct> {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    const product = await Product.create(data);
    return product;
  }

  async updateProduct(id: string, data: Partial<IProduct>): Promise<IProduct> {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new Error('Product not found');
    }
  }
}

export default new ProductService();
