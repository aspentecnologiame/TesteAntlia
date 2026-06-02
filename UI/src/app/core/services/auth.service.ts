import { Injectable, signal } from '@angular/core';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUser = signal<AuthUser | null>(null);
  public isAuthenticated = signal(false);

  constructor() {
    // Carregar usuário do localStorage ao inicializar
    this.loadAuthState();
  }

  /**
   * Realizar login com credenciais
   */
  login(credentials: LoginCredentials): Promise<AuthUser> {
    return new Promise((resolve, reject) => {
      // Simular chamada de API
      setTimeout(() => {
        if (credentials.email && credentials.password.length >= 8) {
          const user: AuthUser = {
            id: '1',
            email: credentials.email,
            name: credentials.email.split('@')[0]
          };
          this.setAuthUser(user);
          resolve(user);
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 500);
    });
  }

  /**
   * Realizar logout
   */
  logout(): void {
    this.authUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem('authUser');
  }

  /**
   * Definir usuário autenticado
   */
  private setAuthUser(user: AuthUser): void {
    this.authUser.set(user);
    this.isAuthenticated.set(true);
    localStorage.setItem('authUser', JSON.stringify(user));
  }

  /**
   * Obter usuário autenticado
   */
  getAuthUser(): AuthUser | null {
    return this.authUser();
  }

  /**
   * Carregar estado de autenticação do localStorage
   */
  private loadAuthState(): void {
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        this.authUser.set(user);
        this.isAuthenticated.set(true);
      } catch (error) {
        console.error('Erro ao carregar estado de autenticação:', error);
      }
    }
  }
}
