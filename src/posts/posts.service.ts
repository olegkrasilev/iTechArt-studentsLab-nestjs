import { PostsRepository } from "./../entity/posts/posts.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  getAllPosts(page: string) {
    return this.postsRepository.getAllPosts(page);
  }

  getUserPosts(params: { id: string; page: string }) {
    return this.postsRepository.getUserPosts(params);
  }

  deletePost(postID: number) {
    return this.postsRepository.deletePost(postID);
  }

  updatePost(body: { postID: number; post: string; title: string }) {
    return this.postsRepository.updatePost(body);
  }

  getUserPost(params: { id: number }) {
    return this.postsRepository.getUserPost(params);
  }
}
