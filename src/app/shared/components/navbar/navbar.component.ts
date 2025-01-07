import { Component, inject, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../_services/local-storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../_services/toast.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);
  private toast = inject(ToastService);
  public isLogged: boolean = false;

  ngOnInit(): void {
    this.localStorageService.isLoggedIn.subscribe((value) => {
      this.isLogged = value;
    });
  }

  logout() {
    this.localStorageService.removeVariable('token');
    this.localStorageService.removeVariable('email');
    this.localStorageService.updateLoginStatus(false);
    this.toast.info('Sesión cerrada');
    this.router.navigate(['/login']);
  }

}
