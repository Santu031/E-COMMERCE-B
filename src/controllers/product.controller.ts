import { Request, Response } from 'express';
import { productService } from '../services/product.service';
import { IProduct } from '../models/Product.model';

// Send response helper
const sendResponse = (res: Response, success: boolean, data: any, message: string, statusCode = 200) => {
  res.status(statusCode).json({
    success,
    message,
    data
  });
};

export const productController = {
  // Get all products
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const category = req.query.category as string;
      const search = req.query.search as string;
      
      const result = await productService.getAllProducts(page, limit, category, search);
      
      sendResponse(res, true, result, 'Products fetched successfully');
    } catch (error: any) {
      sendResponse(res, false, null, error.message || 'Failed to fetch products', 500);
    }
  },

  // Get product by ID
  getProductById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const product: IProduct | null = await productService.getProductById(id);
      
      if (!product) {
        return sendResponse(res, false, null, 'Product not found', 404);
      }
      
      sendResponse(res, true, product, 'Product fetched successfully');
    } catch (error: any) {
      sendResponse(res, false, null, error.message || 'Failed to fetch product', 500);
    }
  },

  // Create a new product (admin only)
  createProduct: async (req: Request, res: Response) => {
    try {
      // Check if user is admin (assuming this is handled by auth middleware)
      const user = (req as any).user;
      if (user.role !== 'ADMIN') {
        return sendResponse(res, false, null, 'Access denied. Admin only.', 403);
      }
      
      const productData = req.body;
      const product: IProduct = await productService.createProduct(productData);
      
      sendResponse(res, true, product, 'Product created successfully', 201);
    } catch (error: any) {
      sendResponse(res, false, null, error.message || 'Failed to create product', 500);
    }
  },

  // Update a product (admin only)
  updateProduct: async (req: Request, res: Response) => {
    try {
      // Check if user is admin (assuming this is handled by auth middleware)
      const user = (req as any).user;
      if (user.role !== 'ADMIN') {
        return sendResponse(res, false, null, 'Access denied. Admin only.', 403);
      }
      
      const { id } = req.params;
      const productData = req.body;
      
      const product: IProduct | null = await productService.updateProduct(id, productData);
      
      if (!product) {
        return sendResponse(res, false, null, 'Product not found', 404);
      }
      
      sendResponse(res, true, product, 'Product updated successfully');
    } catch (error: any) {
      sendResponse(res, false, null, error.message || 'Failed to update product', 500);
    }
  },

  // Delete a product (admin only)
  deleteProduct: async (req: Request, res: Response) => {
    try {
      // Check if user is admin (assuming this is handled by auth middleware)
      const user = (req as any).user;
      if (user.role !== 'ADMIN') {
        return sendResponse(res, false, null, 'Access denied. Admin only.', 403);
      }
      
      const { id } = req.params;
      
      const product: IProduct | null = await productService.deleteProduct(id);
      
      if (!product) {
        return sendResponse(res, false, null, 'Product not found', 404);
      }
      
      sendResponse(res, true, null, 'Product deleted successfully');
    } catch (error: any) {
      sendResponse(res, false, null, error.message || 'Failed to delete product', 500);
    }
  }
};