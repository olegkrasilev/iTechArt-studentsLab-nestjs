import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { Auth } from "../entity/user";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("/signup")
  signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post("/login")
  signIp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post("/test")
  @UseGuards(AuthGuard())
  test(@Req() request) {
    console.log(request);
  }
}
