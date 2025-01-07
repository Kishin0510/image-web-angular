import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostFormComponent } from '../../components/add-post-form/add-post-form.component';

@Component({
  selector: 'app-posts-creation-page',
  standalone: true,
  imports: [CommonModule, AddPostFormComponent],
  templateUrl: './posts-creation-page.component.html',
  styleUrl: './posts-creation-page.component.css'
})
export class PostsCreationPageComponent {

}
