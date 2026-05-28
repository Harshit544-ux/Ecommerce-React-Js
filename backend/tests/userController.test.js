import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerUser, loginUser } from '../controller/userController.js';
import * as userServices from '../services/userServices.js';
import * as jwtUtils from '../utils/jwt.js';

vi.mock('../services/userServices.js');
vi.mock('../utils/jwt.js');

describe('User Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    vi.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should return 400 if fields are missing', async () => {
      req.body = { email: 'test@test.com' };
      await registerUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'All fields are required' }));
    });

    it('should register a user successfully', async () => {
      const mockUser = { id: 1, name: 'Test', email: 'test@test.com' };
      req.body = { name: 'Test', email: 'test@test.com', password: 'password' };
      
      userServices.createUser.mockResolvedValue(mockUser);
      jwtUtils.generateToken.mockReturnValue('fake-token');

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        token: 'fake-token',
        user: mockUser
      }));
    });

    it('should return 409 if user already exists', async () => {
      req.body = { name: 'Test', email: 'test@test.com', password: 'password' };
      userServices.createUser.mockRejectedValue(new Error('User already registered'));

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'User already exists' }));
    });
  });

  describe('loginUser', () => {
    it('should login successfully', async () => {
      const mockUser = { id: 1, name: 'Test', email: 'test@test.com' };
      req.body = { email: 'test@test.com', password: 'password' };
      
      userServices.loginUserService.mockResolvedValue(mockUser);
      jwtUtils.generateToken.mockReturnValue('fake-token');

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        token: 'fake-token',
        user: mockUser
      }));
    });

    it('should return 400 if email or password missing', async () => {
      req.body = { email: 'test@test.com' };
      await loginUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
