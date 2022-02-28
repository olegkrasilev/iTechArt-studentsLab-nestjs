import { PostsRepository } from "./../entity/posts/posts.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  getAllPosts(page: string) {
    return this.postsRepository.getAllPosts(page);
  }
}
