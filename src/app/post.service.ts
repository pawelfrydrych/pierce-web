import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post';
import {environment} from "../environments/environment";

@Injectable({ providedIn: 'root' })
export class PostService {

  private postsUrl = environment.BASE_API_URL + 'posts';

  constructor(
    private http: HttpClient) { }


  getPosts(): Promise<any> {
    return this.http.get(this.postsUrl)
      .toPromise().then();
  }

  getPost(id): Promise<Post> {
    return this.http.get(this.postsUrl + '/' + id)
      .toPromise().then(response => response as Post);
  }

  save(title, content): Promise<any> {
    let postCommand = {title:'', content: ''};
    postCommand.title = title;
    postCommand.content = content;
    return this.http.post(this.postsUrl, postCommand).toPromise();
  }

  update(id, title, content): Promise<any> {
    let post = new Post(id, title, content);
    return this.http.put(this.postsUrl, post).toPromise();
  }

  deletePost(id): Promise<any> {
    return this.http.delete(this.postsUrl + '/' + id).toPromise();
  }

}
