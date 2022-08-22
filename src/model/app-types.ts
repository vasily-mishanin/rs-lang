export interface User {
  userId?: string;
  email: string;
  password: string;
  name?: string;
  message?: string;
  token?: string;
  refreshToken?: string;
}
