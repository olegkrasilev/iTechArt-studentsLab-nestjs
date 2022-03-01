import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("/signup")
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
    refreshToken: string,
    accessToken: string
  ) {
    return this.authService.signUp(
      authCredentialsDto,
      refreshToken,
      accessToken
    );
  }

  @Post("/login")
  signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto);
  }

  @Get("/getAllUsers/:page")
  @UseGuards(AuthGuard("JWT-access-token"))
  getAllUsers(@Param("page") page: string) {
    return this.authService.getAllUsers(page);
  }

  @Patch("/updateUser")
  @UseGuards(AuthGuard("JWT-access-token"))
  updateUser(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.updateUser(authCredentialsDto);
  }

  @Post("logout")
  @UseGuards(AuthGuard("JWT-access-token"))
  logout() {
    return this.authService.logout();
  }

  @Post("/refresh")
  @UseGuards(AuthGuard("JWT-refresh-token"))
  refreshToken(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.refreshToken(authCredentialsDto);
  }
}
