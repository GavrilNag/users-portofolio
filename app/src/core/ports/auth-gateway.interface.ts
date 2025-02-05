export interface AuthGateway {
  login(email: string, password: string): Promise<string>;
}
