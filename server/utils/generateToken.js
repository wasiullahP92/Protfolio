import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_wasi_portfolio_2026_change_in_production';
  const expiresIn = process.env.JWT_EXPIRE || '30d';

  return jwt.sign({ id }, secret, {
    expiresIn,
  });
};
