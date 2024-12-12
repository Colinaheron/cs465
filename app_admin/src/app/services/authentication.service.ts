import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from '../services/trip-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  public getToken(): string {
    return this.storage.getItem('travlr-token') || ''; // Provide a fallback for null
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public login(user: User): Promise<any> {
    return this.tripDataService
      .login(user)
      .then((authResp: AuthResponse) => {
        this.saveToken(authResp.token);
      })
      .catch((error) => {
        console.error('Login error:', error);
        throw error; // Re-throw the error for further handling
      });
  }

  public register(user: User): Promise<any> {
    return this.tripDataService
      .register(user)
      .then((authResp: AuthResponse) => {
        this.saveToken(authResp.token);
      })
      .catch((error) => {
        console.error('Registration error:', error);
        throw error; // Re-throw the error for further handling
      });
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
      } catch (error) {
        console.error('Invalid token:', error);
        return false;
      }
    }
    return false;
  }

  public getCurrentUser(): User | undefined {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      try {
        const { email, name } = JSON.parse(atob(token.split('.')[1]));
        return { email, name } as User;
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return undefined; // Explicit return for cases where the user is not logged in
  }
}
