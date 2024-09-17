import { LoginProps } from '@/services/auth-service/auth-validation';

export type IAuth = {
  login: (props: LoginProps) => Promise<void>;
  logout: () => Promise<void>;
};

export class AuthService implements IAuth {
  static #instance: AuthService;

  public static get instance(): AuthService {
    if (!this.#instance) this.#instance = new AuthService();
    return this.#instance;
  }

  login(props: LoginProps) {
    return new Promise<void>((resolve) => {
      console.log(`Logging in with username: ${props}`);
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  }

  logout() {
    return new Promise<void>((resolve) => {
      console.log('Logging out');
      resolve();
    });
  }
}
