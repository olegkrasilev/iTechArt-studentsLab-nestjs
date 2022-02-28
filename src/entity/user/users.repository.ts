import { JwtService } from "@nestjs/jwt";
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  Res,
} from "@nestjs/common";
import { AuthCredentialsDto } from "../../auth/dto/auth-credentials.dto";
import { User } from ".";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";

export interface Auth {
  status: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto) {
    const { email, password, firstName, lastName } = authCredentialsDto;
    const encryptedPassword = await bcrypt.hash(password, 12);

    const user = this.create({ email, firstName, lastName, encryptedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Username already exists");
      }
      throw new InternalServerErrorException();
    }
  }

  async getAllUsers(page: string) {
    const POST_TO_TAKE = 5;
    const REQUESTED_PAGE = Number(page);
    const POST_TO_SKIP = (REQUESTED_PAGE - 1) * POST_TO_TAKE;

    const [users, total] = await User.findAndCount({
      select: ["id", "email", "firstName", "lastName"],
      take: POST_TO_TAKE,
      skip: POST_TO_SKIP,
    });

    return {
      status: "Success",
      total,
      users,
    };
  }
}
