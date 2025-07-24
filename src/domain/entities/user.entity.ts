export interface User {
  id: number;
  username: string;
  password: string;
  publicKey: string | null;
  createdAt: Date;
  updatedAt: Date;
}
