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
}
