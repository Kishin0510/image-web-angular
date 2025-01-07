import { Component, OnInit, inject } from '@angular/core';
import { PostService } from '../../../_services/post.service';
import { ResponseAPIPost, AddPost } from '../../../_interfaces/post';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../_services/local-storage.service';

@Component({
  selector: 'app-add-post-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-post-form.component.html',
  styleUrl: './add-post-form.component.css'
})
export class AddPostFormComponent implements OnInit {
  forms!: FormGroup;

  error: boolean = false;
  errorMessage: string[] = [];

  private postService = inject(PostService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  async createForm() {
    this.forms = this.fb.group({
      title: ['', [Validators.required,Validators.minLength(5)]],
      image: [null, Validators.required],
      userEmail: [this.localStorageService.getVariable('email'), Validators.required],
    });
  }

  async onSubmit() {
    if (this.forms.invalid) return;
    try {
      const formData = new FormData();
      formData.append('title', this.forms.get('title')?.value);
      formData.append('image', this.forms.get('image')?.value);
      formData.append('userEmail', this.forms.get('userEmail')?.value);

      const response = await this.postService.addPost(formData);
      console.log(response);

      if (response) {
        this.error = false;
        this.errorMessage = [];
        this.router.navigate(['/posts']);
      } else {
        this.error = true;
        this.errorMessage = this.postService.getErrors();
        console.log('Error al agregar el post', this.errorMessage);
        this.forms.patchValue({
          image: null
        });
      }
    } catch (error) {
      this.error = true;
      this.errorMessage = this.postService.getErrors();
      console.log('Error al agregar el post A', this.errorMessage);
      this.forms.patchValue({
        image: null
      });
    }
  }

  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.forms.patchValue({
        image: file
      });

    }
  }

  get titleValidate() {
    return this.forms.get('title')?.invalid && this.forms.get('title')?.touched;
  }

  get imageValidate() {
    return this.forms.get('image')?.invalid && this.forms.get('image')?.touched;
  }
}
