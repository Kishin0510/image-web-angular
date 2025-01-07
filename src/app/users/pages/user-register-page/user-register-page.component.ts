import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
  selector: 'app-user-register-page',
  standalone: true,
  imports: [CommonModule, RegisterFormComponent],
  templateUrl: './user-register-page.component.html',
  styleUrl: './user-register-page.component.css'
})
export class UserRegisterPageComponent {

}
