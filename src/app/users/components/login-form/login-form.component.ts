import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../_services/local-storage.service';
import { UserService } from '../../../_services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from '../../../_services/toast.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  form!: FormGroup;

  loginAlert: boolean = false;

  error: boolean = false;

  errorMessage: string[] = [];

  private userService = inject(UserService);

  private localStorageService = inject(LocalStorageService);

  private toast = inject(ToastService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm();
  }

  loginForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async login() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.error = false;
    this.errorMessage = [];

    try {
      const response = await this.userService.Login(this.form.value);
      if (response.token) {
        this.localStorageService.setVariable('token', response.token);
        this.localStorageService.setVariable('email', response.email);
        this.localStorageService.updateLoginStatus(true);
        this.toast.succes('Bienvenido: ' + response.email);
        this.router.navigate(['/posts']);
      } else {
        this.error = true;
        this.errorMessage = this.userService.getErrors();
        this.form.patchValue({
          password: ''
        });
      }
    } catch (error) {
      this.error = true;
      this.errorMessage = ['Credenciales Inválidas.'];
      this.form.patchValue({
        password: ''
      });
    }
  }

  get emailValidate() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched;
  }

  get passwordValidate() {
    return this.form.get('password')?.invalid && this.form.get('password')?.touched;
  }
}
