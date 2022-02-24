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
import { createRefreshAccessToken } from "src/utils/jwt";
import { Response } from "express";

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
    @Res({ passthrough: true }) response: Response
  ): Promise<Auth> {
    const { firstName, lastName, email, password } = authCredentialsDto;

    const encryptedPassword = await bcrypt.hash(password, 12);
    try {
      const newUser = await User.create({
        email,
        firstName,
        lastName,
        encryptedPassword,
      }).save();

      const { refreshToken, accessToken } = createRefreshAccessToken(
        newUser.id,
        response
      );
      return {
        status: "Success",
        id: newUser.id,
        firstName,
        lastName,
        email,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("User already exists");
      }
      throw new InternalServerErrorException();
    }
  }

  async login(
    authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<Auth> {
    const { email, password } = authCredentialsDto;

    try {
      const isUserExists = await User.findOne({ email });

      if (!isUserExists) {
        throw new NotFoundException("This user does not exists");
      }

      const { lastName, firstName, encryptedPassword, id } = isUserExists;

      const isPasswordCorrect = await bcrypt.compare(
        password,
        encryptedPassword
      );

      if (!isPasswordCorrect) {
        throw new ConflictException("Wrong password");
      }
      const { accessToken, refreshToken } = createRefreshAccessToken(
        id,
        response
      );
      return {
        status: "Success",
        id,
        firstName,
        lastName,
        email,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
