declare global {
  namespace Express {
    interface Request {
      admin?: any;
    }
  }
}

export {};
