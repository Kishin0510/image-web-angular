import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private loggedInSubject = new BehaviorSubject<boolean>(this.getVariable('token') ? true : false);

  isLoggedIn = this.loggedInSubject.asObservable();

  constructor() {
    const user = this.getVariable('token');
    this.loggedInSubject.next(user ? true : false);
  }

  setVariable (key: string, value: any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  getVariable (key: string){
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeVariable (key: string){
    localStorage.removeItem(key);
  }

  updateLoginStatus(isLogged: boolean) {
    this.loggedInSubject.next(isLogged);
  }

}
