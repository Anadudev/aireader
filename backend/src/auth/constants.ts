export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  // expiresIn: 1 week = 60 * 60 * 24 * 7
  expiresIn: 60 * 60 * 24 * 7,
};
