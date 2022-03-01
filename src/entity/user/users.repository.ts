import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  Req,
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
  async createUser(
    authCredentialsDto: AuthCredentialsDto,
    refreshToken: string,
    accessToken: string
  ) {
    const { email, password, firstName, lastName } = authCredentialsDto;
    const encryptedPassword = await bcrypt.hash(password, 12);

    const user = this.create({
      email,
      firstName,
      lastName,
      encryptedPassword,
      refreshToken,
    });

    try {
      await this.save(user);
      return {
        id: user.id,
        firstName,
        lastName,
        email,
        accessToken,
        refreshToken,
      };
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

  async updateUser(authCredentialsDto: AuthCredentialsDto) {
    const { userID, email, lastName, firstName } = authCredentialsDto;

    const user = await User.findOne(userID);

    if (!user) {
      throw new ConflictException("This user does not exist.");
    }

    try {
      await User.merge(user, { email, lastName, firstName }).save();
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("This email already exists");
      }
      throw new InternalServerErrorException();
    }

    return {
      status: "success",
      email,
      lastName,
      firstName,
    };
  }

  logout() {
    // TODO add logic later
    // response.clearCookie('jwtAccessToken');
    // response.clearCookie('jwtRefreshToken');

    return {
      status: "success",
    };
  }
}
