import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  userExistList: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.userExistList = await this.userService.getAll();

    this.userForm = this.formBuilder.group({
      _id: [],
      username: [
        '',
        Validators.compose([Validators.minLength(3), Validators.required]),
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(3), Validators.required]),
      ],
    });

    if (id) {
      const user = await this.userService.getUserByID(id);
      this.userForm.controls['_id'].setValue(user?._id);
      this.userForm.controls['username'].setValue(user?.username);
      this.userForm.controls['password'].setValue(user?.password);
    } else {
      this.userForm.controls['username'].addValidators(
        this.isusernameAlreadyExist(this.userExistList)
      );
    }
  }

  private isusernameAlreadyExist(list: User[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const index = list.find((x) => x.username === control.value);

      if (index === undefined) {
        return null;
      } else {
        return { usernameAlreadyExist: true };
      }
    };
  }

  async addOrModifyUser() {
    const user = this.userForm.value;

    if (user._id === null) {
      this.userService.addUser(user);
      this.router.navigateByUrl('/');
    } else {
      this.userService.modifyUser(user._id, user);
      this.router.navigateByUrl('/user-list');
    }
  }
}
