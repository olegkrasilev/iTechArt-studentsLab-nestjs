import { Posts } from ".";
import { EntityRepository, Repository } from "typeorm";
import { ConflictException } from "@nestjs/common";

@EntityRepository(Posts)
export class PostsRepository extends Repository<Posts> {
  async getAllPosts(page: string) {
    const POST_TO_TAKE = 5;
    const REQUESTED_PAGE = Number(page);
    const POST_TO_SKIP = (REQUESTED_PAGE - 1) * POST_TO_TAKE;

    const [posts, total] = await Posts.findAndCount({
      select: ["post", "postCreationTime", "title", "id"],
      relations: ["user"],
      take: POST_TO_TAKE,
      skip: POST_TO_SKIP,
    });

    const selectPostFields = posts.map((data) => {
      const { title, post, postCreationTime, user, id } = data;
      const { firstName, lastName } = user;

      return { title, post, postCreationTime, firstName, lastName, postID: id };
    });

    return {
      status: "Success",
      total,
      posts: selectPostFields,
    };
  }

  async getUserPosts(params: { id: string; page: string }) {
    const { id, page } = params;
    const userID = id;

    const POST_TO_TAKE = 5;
    const REQUESTED_PAGE = Number(page);
    const POST_TO_SKIP = (REQUESTED_PAGE - 1) * POST_TO_TAKE;

    if (!userID) {
      throw new ConflictException("This user does not exist");
    }

    const [posts, total] = await Posts.findAndCount({
      select: ["post", "title", "id", "postCreationTime"],
      relations: ["user"],
      where: {
        user: {
          id: userID,
        },
      },
      take: POST_TO_TAKE,
      skip: POST_TO_SKIP,
    });

    const selectPostFields = posts.map((userPost) => {
      const { title, post, postCreationTime, id } = userPost;

      return {
        title,
        post,
        postCreationTime,
        id,
      };
    });

    return {
      total,
      posts: selectPostFields,
    };
  }

  async deletePost(postID: number) {
    const existingPost = await Posts.findOne(postID);

    if (!existingPost) {
      throw new ConflictException("This Post does not exist");
    }

    await Posts.delete(postID);
  }

  async updatePost(body: { postID: number; post: string; title: string }) {
    const { postID, post, title } = body;

    const existingPost = await Posts.findOne(postID);

    if (!existingPost) {
      throw new ConflictException("This Post does not exist");
    }

    await Posts.merge(existingPost, { post, title }).save();

    return {
      data: {
        post,
        title,
        postID,
      },
    };
  }
}
