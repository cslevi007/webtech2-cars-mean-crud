import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Car } from '../models/car';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css'],
})
export class CarFormComponent implements OnInit {
  carForm!: FormGroup;
  existingCars: Car[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get f(): { [key: string]: AbstractControl } {
    return this.carForm.controls;
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    console.log('id:');
    console.log(id);
    this.existingCars = await this.carService.getAll();

    this.carForm = this.formBuilder.group({
      _id: [],
      licensePlateNumber: [
        '',
        Validators.compose([
          Validators.pattern('[a-zA-Z]{3}-[0-9]{3}'),
          Validators.required,
        ]),
      ],
      brand: [
        '',
        Validators.compose([Validators.minLength(3), Validators.required]),
      ],
      type: [
        '',
        Validators.compose([Validators.minLength(3), Validators.required]),
      ],
      fuel: ['', Validators.required],
      consumption: ['', Validators.required],
      odo: ['', Validators.required],
    });

    if (id) {
      const car = await this.carService.getCarByID(id);
      console.log(car);
      this.carForm.controls['_id'].setValue(car?._id);
      this.carForm.controls['licensePlateNumber'].setValue(
        car?.licensePlateNumber
      );
      this.carForm.controls['brand'].setValue(car?.brand);
      this.carForm.controls['type'].setValue(car?.type);
      this.carForm.controls['fuel'].setValue(car?.fuel);
      this.carForm.controls['consumption'].setValue(car?.consumption);
      this.carForm.controls['odo'].setValue(car?.odo);
    } else {
      this.carForm.controls['licensePlateNumber'].addValidators(
        this.isLicencePlateNumberAlreadyExist(this.existingCars)
      );
    }
  }

  private isLicencePlateNumberAlreadyExist(list: Car[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const index = list.find((x) => x.licensePlateNumber === control.value);

      if (index === undefined) {
        return null;
      } else {
        return { licencePlateNumberAlreadyExist: true };
      }
    };
  }

  async addCar() {
    const car = this.carForm.value;

    if (car._id === null) {
      this.carService.addCar(car);
    } else {
      this.carService.modifyCar(car._id, car);
    }

    this.router.navigateByUrl('/car-list');
  }
}
