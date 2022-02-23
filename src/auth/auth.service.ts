import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCreateUser, UserRepository } from "../entity/user";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<AuthCreateUser> {
    return this.usersRepository.createUser(authCredentialsDto);
  }
}
