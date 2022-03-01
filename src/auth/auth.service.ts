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

  generateRefreshToken(email: string) {
    return this.jwtService.sign(
      { email },
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        secret: process.env.JWT_REFRESH_SECRET,
      }
    );
  }

  generateAccessToken(email: string) {
    return this.jwtService.sign(
      { email },
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        secret: process.env.JWT_ACCESS_SECRET,
      }
    );
  }

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
    _refreshToken: string,
    _accessToken: string
  ) {
    const { email } = authCredentialsDto;
    const refreshToken = this.generateRefreshToken(email);
    const accessToken = this.generateAccessToken(email);
    return this.usersRepository.createUser(
      authCredentialsDto,
      refreshToken,
      accessToken
    );
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ email });
    if (user && (await bcrypt.compare(password, user.encryptedPassword))) {
      const accessToken = this.jwtService.sign(
        { email },
        {
          expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
          secret: process.env.JWT_ACCESS_SECRET,
        }
      );
      const refreshToken = this.jwtService.sign(
        { email },
        {
          expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
          secret: process.env.JWT_REFRESH_SECRET,
        }
      );
      const { firstName, lastName, id } = user;
      return {
        firstName,
        lastName,
        email,
        id,
        accessToken,
        refreshToken,
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

  refreshToken(authCredentialsDto: AuthCredentialsDto) {
    const { email } = authCredentialsDto;
    const accessToken = this.generateAccessToken(email);
    return { accessToken };
  }
}
