import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { Auth } from "../entity/user";

@Controller("users")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("/signup")
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<Auth> {
    return this.authService.signUp(authCredentialsDto, response);
  }

  @Post("/login")
  login(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<Auth> {
    return this.authService.login(authCredentialsDto, response);
  }
}
