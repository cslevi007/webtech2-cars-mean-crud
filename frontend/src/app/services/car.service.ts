import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  async getAll() {
    return await lastValueFrom(
      this.http.get<Car[]>('http://localhost:3000/cars')
    );
  }

  async addCar(car: Car) {
    return await lastValueFrom(
      this.http.post<Car>('http://localhost:3000/cars', car)
    );
  }

  async modifyCar(id: string, car: Car) {
    return await lastValueFrom(
      this.http.put<Car>('http://localhost:3000/cars/' + id, car)
    );
  }

  async deleteCar(id: string) {
    return await lastValueFrom(
      this.http.delete<Car>('http://localhost:3000/cars/' + id)
    );
  }

  async getCarByID(id: string) {
    return await lastValueFrom(
      this.http.get<Car>('http://localhost:3000/cars/' + id)
    );
  }
}
