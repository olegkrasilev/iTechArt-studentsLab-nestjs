import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get("/getAllPosts/:page")
  // @UseGuards(AuthGuard())
  getAllPosts(@Param() params: { page: string }) {
    return this.postsService.getAllPosts(params);
  }

  @Get("/getUserPosts/:id/:page")
  // @UseGuards(AuthGuard())
  getUserPosts(@Param() params: { id: string; page: string }) {
    return this.postsService.getUserPosts(params);
  }

  @Delete("/deletePost")
  @HttpCode(204)
  // @UseGuards(AuthGuard())
  deletePost(@Body() postID: number) {
    return this.postsService.deletePost(postID);
  }

  @Patch("/updatePost")
  // @UseGuards(AuthGuard())
  updatePost(@Body() body: { postID: number; post: string; title: string }) {
    return this.postsService.updatePost(body);
  }

  @Get("/getUserPost/:id")
  // @UseGuards(AuthGuard())
  getUserPost(@Param() params: { id: number }) {
    return this.postsService.getUserPost(params);
  }

  @Post("/createPost")
  // @UseGuards(AuthGuard())
  createPost(@Body() body: { userID: number; post: string; title: string }) {
    return this.postsService.createPost(body);
  }
}
