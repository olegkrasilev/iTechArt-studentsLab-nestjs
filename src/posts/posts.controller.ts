import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get("/getAllPosts/:page")
  @UseGuards(AuthGuard())
  getAllPosts(@Param() page: string) {
    return this.postsService.getAllPosts(page);
  }
}
