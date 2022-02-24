import { Res } from "@nestjs/common";
import { AuthCredentialsDto } from "../../auth/dto/auth-credentials.dto";
import { User } from ".";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { createRefreshAccessToken } from "src/utils/jwt";
import { Response } from "express";

export interface AuthCreateUser {
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
  ): Promise<AuthCreateUser> {
    const { firstName, lastName, email, password } = authCredentialsDto;

    const encryptedPassword = await bcrypt.hash(password, 12);

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
  }
}
