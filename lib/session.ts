// lib/session.ts
import { SessionOptions } from 'iron-session';

export type UserSession = {
  email: string;
  role: 'admin' | 'customer';
  isLoggedIn: true;
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long',
  cookieName: 'realestate_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
