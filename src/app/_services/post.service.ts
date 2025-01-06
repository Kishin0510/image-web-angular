import { Injectable, inject } from '@angular/core';
import { environment } from '../../environment/environments.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ResponseAPIPost, AddPost } from '../_interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseURL: string = environment.apiUrl;

  public errors: string[] = [];

  private http = inject(HttpClient);

  async getAllPosts(): Promise<ResponseAPIPost[]> {
    try {
      const response = await firstValueFrom(this.http.get<ResponseAPIPost[]>(`${this.baseURL}/posts`));
      console.log('Posts obtenidos', response);
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en el servicio para obtener todos los posts', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error desconocido');
      return Promise.reject(this.errors);
    }
  }

  async addPost(post: FormData): Promise<ResponseAPIPost> {
    try {
      const response = await firstValueFrom(this.http.post<ResponseAPIPost>(`${this.baseURL}/posts`, post));
      console.log('Post agregado', response);
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en el servicio para agregar un post', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message || 'Error desconocido');
      return Promise.reject(this.errors);
    }
  }
}
