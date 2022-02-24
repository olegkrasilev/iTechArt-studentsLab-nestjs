import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { Injectable, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { Auth, UserRepository } from "../entity/user";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<Auth> {
    return this.usersRepository.createUser(authCredentialsDto, response);
  }

  async login(
    authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<Auth> {
    return this.usersRepository.login(authCredentialsDto, response);
  }
}
