import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Car } from '../models/car';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  cars: Car[] | undefined = undefined;

  constructor(
    private appComponent: AppComponent,
    private carService: CarService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.cars = await this.carService.getAll();
  }

  navigateToCarForm(id: string) {
    this.router.navigate(['/car-form'], {
      queryParams: {
        id: id,
      },
    });
  }

  async deleteCar(id: string) {
    await this.carService.deleteCar(id);
    this.ngOnInit();
  }
}
