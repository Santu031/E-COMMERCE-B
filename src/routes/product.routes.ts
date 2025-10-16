import { Router } from 'express';
import productController from '../controllers/product.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', productController.getProducts.bind(productController));
router.get('/:id', productController.getProductById.bind(productController));
router.post('/', authenticate, authorize('ADMIN'), productController.createProduct.bind(productController));
router.put('/:id', authenticate, authorize('ADMIN'), productController.updateProduct.bind(productController));
router.delete('/:id', authenticate, authorize('ADMIN'), productController.deleteProduct.bind(productController));

export default router;
