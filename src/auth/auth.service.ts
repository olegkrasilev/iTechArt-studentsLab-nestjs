import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { Injectable, Res, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../entity/user";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.encryptedPassword))) {
      const payload = { email };
      const accessToken = this.jwtService.sign(payload);
      const { firstName, lastName, id } = user;
      return {
        firstName,
        lastName,
        email,
        id,
        accessToken,
      };
    }
    throw new UnauthorizedException("PLease check your login credentials");
  }

  getAllUsers(page: string) {
    return this.usersRepository.getAllUsers(page);
  }

  updateUser(authCredentialsDto: AuthCredentialsDto) {
    return this.usersRepository.updateUser(authCredentialsDto);
  }

  logout() {
    return this.usersRepository.logout();
  }
}
