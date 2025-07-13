declare namespace Express {
  export interface Request {
    user: {
      email: string;
      role: 'admin' | 'customer';
    };
  }
  export interface Response {
    user: {
      email: string;
      role: 'admin' | 'customer';
    };
  }
}
