import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  async getAll() {
    return await lastValueFrom(
      this.http.get<User[]>('http://localhost:3000/users')
    );
  }

  async addUser(user: User) {
    return await lastValueFrom(
      this.http.post<User>('http://localhost:3000/users', user)
    );
  }

  async modifyUser(id: string, user: User) {
    return await lastValueFrom(
      this.http.put<User>('http://localhost:3000/users/' + id, user)
    );
  }

  async deleteUser(id: string) {
    return await lastValueFrom(
      this.http.delete<User>('http://localhost:3000/users/' + id)
    );
  }

  async getUserByID(id: string) {
    return await lastValueFrom(
      this.http.get<User>('http://localhost:3000/users/' + id)
    );
  }
}
