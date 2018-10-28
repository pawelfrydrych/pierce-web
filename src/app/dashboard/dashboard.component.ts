import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  posts: Post[] = [];
  basicForm: FormGroup;
  editMode:boolean =  false;
  currentId: string;

  constructor(private postService: PostService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.basicForm = this.formBuilder.group({
      id: new FormControl({value: '', disabled: true}),
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });

    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().then(response => {
      this.posts = response;
    });
  }

  editPost(post: Post) {
    this.postService.getPost(post.id).then(response => {
      console.log(response.id);

      this.basicForm.patchValue({
        id: response.id,
        title: response.title,
        content: response.content,
      });

      this.currentId = response.id;
    });
    this.editMode = true;
  }

  addNew() {
    this.editMode = false;
    this.currentId = null;
    this.basicForm.patchValue({
      id: null,
      title: null,
      content: null,
    });
  }

  save(){
    if(this.currentId){
      this.postService.update( this.currentId, this.basicForm.value.title,  this.basicForm.value.content).then(response => {
        this.getPosts();
      });
    }else {
      this.postService.save( this.basicForm.value.title,  this.basicForm.value.content).then(response => {
        this.getPosts();
      });
    }
  }

  deletePost(post: Post) {
    this.postService.deletePost(post.id).then(response => {
      this.getPosts();
    });
  }
}
