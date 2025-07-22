import { inject, Injectable } from '@angular/core';
import User from '../data/user';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../config/environment';
import { UserStore } from '../../store/user.store';
import Cookies from 'js-cookie';

export interface AuthenticationRequest {
  username: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
  errorMessage?: string;
}

export interface UserUpdateDto {
  userId: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = (environment.production ? '' : environment.apiBaseUrl) + 'api/';
  private userStore = inject(UserStore);

  constructor(private http: HttpClient) {}

  getUserData(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}users/username/${username}`).pipe(
      tap((user) => {
        this.userStore.setUser(user);
        this.userStore.setLoggedIn(true);
      })
    );
  }

  logIn(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    Cookies.remove('authToken');
    return this.http
      .post<AuthenticationResponse>(`${this.apiUrl}auth/authenticate`, request)
      .pipe(
        tap((res) => {
          Cookies.set('authToken', res.token, { expires: 1 });
          this.getUserData(request.username).subscribe();
        })
      );
  }

  signUp(user: User): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      `${this.apiUrl}auth/register`,
      user
    );
  }

  logOut() {
    this.userStore.logOut();
  }

  modify(user: UserUpdateDto): Observable<AuthenticationResponse> {
    return this.http
      .put<AuthenticationResponse>(`${this.apiUrl}users/${user.userId}`, user)
      .pipe(
        tap((res) => {
          Cookies.set('authToken', res.token, { expires: 1 });
          this.getUserData(user.username).subscribe();
        })
      );
  }

  init() {
    const username = Cookies.get('username');
    if (Cookies.get('authToken') && username) {
      this.getUserData(username).subscribe();
    } else {
      this.logOut();
    }
  }
}
