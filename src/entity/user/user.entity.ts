import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";

// import { Comments } from "./Comment";
import { Posts } from "../posts";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  encryptedPassword: string;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => Posts, (posts: Posts) => posts.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  posts: Posts[];

  // @OneToMany(() => Comments, (comments: Comments) => comments.user, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // })
  // comments: Comments[];
}
