import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponseAPIPost } from '../../../_interfaces/post';

@Component({
  selector: 'app-posts-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts-card.component.html',
  styleUrl: './posts-card.component.css'
})
export class PostsCardComponent {
  @Input() post!: ResponseAPIPost;

}
