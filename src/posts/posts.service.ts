import { PostsRepository } from "./../entity/posts/posts.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  getAllPosts(params: { page: string }) {
    return this.postsRepository.getAllPosts(params);
  }

  getUserPosts(params: { id: string; page: string }) {
    return this.postsRepository.getUserPosts(params);
  }

  deletePost(body: { postID: number }) {
    return this.postsRepository.deletePost(body);
  }

  updatePost(body: { postID: number; post: string; title: string }) {
    return this.postsRepository.updatePost(body);
  }

  getUserPost(params: { id: number }) {
    return this.postsRepository.getUserPost(params);
  }

  createPost(body: { userID: number; post: string; title: string }) {
    return this.postsRepository.createPost(body);
  }
}
