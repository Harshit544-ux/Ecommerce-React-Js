import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getProducts, getBestsellers, getLatest, singleProduct } from '../controller/productController.js';
import * as productServices from '../services/productService.js';

vi.mock('../services/productService.js');

describe('Product Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      query: {},
      body: {},
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    vi.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should return all products', async () => {
      const mockProducts = [{ id: 1, name: 'P1' }, { id: 2, name: 'P2' }];
      productServices.getAllProduct.mockResolvedValue({ data: mockProducts, error: null });

      await getProducts(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProducts);
    });

    it('should return 500 if there is an error', async () => {
      productServices.getAllProduct.mockResolvedValue({ data: null, error: { message: 'DB Error' } });

      await getProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'DB Error' });
    });
  });

  describe('getBestsellers', () => {
    it('should return bestseller products', async () => {
      const mockProducts = [{ id: 1, name: 'P1', bestseller: true }];
      productServices.getBestsellerProducts.mockResolvedValue({ data: mockProducts, error: null });

      await getBestsellers(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProducts);
    });
  });

  describe('singleProduct', () => {
    it('should return a single product by ID', async () => {
      const mockProduct = { id: 1, name: 'P1' };
      req.params.id = '1';
      productServices.getProductById.mockResolvedValue({ data: mockProduct, error: null });

      await singleProduct(req, res);

      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    it('should return 400 if ID is missing', async () => {
      await singleProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 404 if product not found', async () => {
      req.params.id = '999';
      productServices.getProductById.mockResolvedValue({ data: null, error: { message: 'Not Found' } });

      await singleProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
