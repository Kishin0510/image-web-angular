import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponseAPILogin, RegisterUser } from '../../../_interfaces/user';
import { UserService } from '../../../_services/user.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  form! : FormGroup;
  registerAlert: boolean = false;
  error: boolean = false;
  errorMessage: string[] = [];

  private userService = inject(UserService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.registerForm();
  }

  registerForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
    });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const hasNumber = /\d/.test(value);
    const valid = hasNumber;
    return !valid ? { 'passwordInvalid': true } : null;
  }

  async register() {
    if (this.form.invalid) return;
    try {
      const user: RegisterUser = {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value
      }
      const response = await this.userService.RegisterUser(user);
      if (response.token) {
        this.router.navigate(['/auth']);
      } else {
        this.error = true;
        this.errorMessage = this.userService.getErrors();
        this.form.patchValue({
          password: ''
        });
        console.log('Error al registrar usuario', this.errorMessage);
      }
    } catch (error) {
      this.error = true;
      this.errorMessage = this.userService.getErrors();
      this.form.patchValue({
        password: ''
      });
      console.log('Error al registrar', error);
    }
  }

  get emailValidate() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }

  get passwordValidate() {
    return this.form.get('password')?.invalid && this.form.get('password')?.touched;
  }
}
