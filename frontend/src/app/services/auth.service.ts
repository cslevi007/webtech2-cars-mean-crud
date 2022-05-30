import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  async getOneUser(username: string, password: string) {
    return lastValueFrom(
      this.http.get<User>('http://localhost:3000/users/login', {
        params: { username: username, password: password },
      })
    );
  }

  async authenticateUser(username: string, password: string) {
    return await this.getOneUser(username, password);
  }
}
