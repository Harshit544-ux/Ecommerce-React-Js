import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authUser } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';

vi.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    next = vi.fn();
    vi.clearAllMocks();
  });

  it('should call next if token is valid', async () => {
    req.headers.authorization = 'Bearer valid-token';
    jwt.verify.mockReturnValue({ id: 'user123' });

    await authUser(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({ id: 'user123' });
  });

  it('should return 401 if no authorization header', async () => {
    await authUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalled();
    const jsonArgs = res.json.mock.calls[0][0];
    expect(jsonArgs.message).toMatch(/No token provided/);
  });

  it('should return 401 if token is invalid', async () => {
    req.headers.authorization = 'Bearer invalid-token';
    jwt.verify.mockImplementation(() => { throw new Error('invalid'); });

    await authUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalled();
    const jsonArgs = res.json.mock.calls[0][0];
    expect(jsonArgs.message).toMatch(/Invalid or expired token/);
  });
});
