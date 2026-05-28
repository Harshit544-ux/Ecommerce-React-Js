import { describe, it, expect, vi, beforeEach } from 'vitest';
import { addToCart, updateCart, getUserCart } from '../controller/cartController.js';
import * as cartServices from '../services/cartService.js';

vi.mock('../services/cartService.js');

describe('Cart Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: { id: 'user123' },
      body: {},
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    vi.clearAllMocks();
  });

  describe('getUserCart', () => {
    it('should return the user cart', async () => {
      const mockCart = { cart_data: { 'item1': { 'M': 1 } } };
      cartServices.getUserCartService.mockResolvedValue({ data: mockCart, error: null });

      await getUserCart(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        cart: mockCart.cart_data
      });
    });

    it('should return empty object if cart does not exist', async () => {
      cartServices.getUserCartService.mockResolvedValue({ data: null, error: null });

      await getUserCart(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        cart: {}
      });
    });
  });

  describe('addToCart', () => {
    it('should add item to cart', async () => {
      req.body = { itemId: 'item1', size: 'M' };
      cartServices.addToCartService.mockResolvedValue({ data: { 'item1': { 'M': 1 } }, error: null });

      await addToCart(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });

    it('should return 400 if itemId or size missing', async () => {
      req.body = { itemId: 'item1' };
      await addToCart(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
