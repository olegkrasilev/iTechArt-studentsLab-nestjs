import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
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

  @Get("/getAllUsers/:page")
  @UseGuards(AuthGuard())
  getAllUsers(@Param("page") page: string) {
    return this.authService.getAllUsers(page);
  }

  @Patch("/updateUser")
  @UseGuards(AuthGuard())
  updateUser(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.updateUser(authCredentialsDto);
  }

  @Post("logout")
  @UseGuards(AuthGuard())
  logout() {
    return this.authService.logout();
  }
}
