import { Component, inject, OnInit } from '@angular/core';
import { ResponseAPIPost } from '../../../_interfaces/post';
import { PostService } from '../../../_services/post.service';
import { PostsCardComponent } from '../../components/posts-card/posts-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts-list-page',
  standalone: true,
  imports: [PostsCardComponent, CommonModule],
  templateUrl: './posts-list-page.component.html',
  styleUrl: './posts-list-page.component.css'
})
export class PostsListPageComponent implements OnInit{
  protected posts: ResponseAPIPost[] = [];
  private postService = inject(PostService);

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getAllPosts().then((response) => {
      this.posts = response;
    }).catch((error) => {
      console.log('Error al obtener los posts', error);
    });
  }
}
