import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createUser, loginUserService } from '../services/userServices.js';
import supabase from '../config/supabase.js';
import bcrypt from 'bcryptjs';

// Explicitly mock the module here
vi.mock('../config/supabase.js', () => ({
  default: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnThis(),
  }
}));

vi.mock('bcryptjs');

describe('User Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createUser', () => {
    it('should hash password and insert user into supabase', async () => {
      const userData = { name: 'Test', email: 'test@test.com', password: 'password123' };
      
      // We know supabase is the mocked object now
      supabase.single.mockResolvedValueOnce({ data: null, error: null }); 
      bcrypt.hash.mockResolvedValue('hashed_password');
      supabase.single.mockResolvedValueOnce({ data: { id: '1', ...userData, password: 'hashed_password' }, error: null });

      const result = await createUser(userData);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(result.name).toBe('Test');
    });

    it('should throw error if user already exists', async () => {
      supabase.single.mockResolvedValueOnce({ data: { email: 'test@test.com' }, error: null });
      
      await expect(createUser({ email: 'test@test.com' }))
        .rejects.toThrow('User already registered');
    });
  });

  describe('loginUserService', () => {
    it('should return user if credentials are valid', async () => {
      const mockUser = { email: 'test@test.com', password: 'hashed_password' };
      supabase.single.mockResolvedValueOnce({ data: mockUser, error: null });
      bcrypt.compare.mockResolvedValue(true);

      const result = await loginUserService('test@test.com', 'password123');
      expect(result).toEqual(mockUser);
    });
  });
});
