import { Posts } from ".";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../user";

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
}
