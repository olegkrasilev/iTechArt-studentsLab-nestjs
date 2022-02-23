import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { AuthCreateUser } from "../entity/user";

@Controller("users")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("/signup")
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto
  ): Promise<AuthCreateUser> {
    return this.authService.signUp(authCredentialsDto);
  }
}
