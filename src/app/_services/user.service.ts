import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/environments.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResponseAPILogin, RegisterUser } from '../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL: string = environment.apiUrl;

  public errors: string[] = [];

  private http = inject(HttpClient);

  async Login(form: RegisterUser): Promise<ResponseAPILogin> {
    try {
      const response = await firstValueFrom(this.http.post<ResponseAPILogin>(`${this.baseURL}/auth/login`, form));
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en el servicio de login', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error desconocido');
      return Promise.reject(this.errors);
    }
  }

  async RegisterUser(form: RegisterUser): Promise<ResponseAPILogin> {
    try {
      const response = await firstValueFrom(this.http.post<ResponseAPILogin>(`${this.baseURL}/auth/register`, form));
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en el servicio de registro de usuario', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error desconocido');
      return Promise.reject(this.errors);
    }
  }
}
