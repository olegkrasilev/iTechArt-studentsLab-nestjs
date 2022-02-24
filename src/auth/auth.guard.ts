import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import jwt, { JwtPayload } from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { jwtAccessToken, jwtRefreshToken } = request.cookies;

    if (!(jwtAccessToken && jwtRefreshToken)) {
      return false;
    }

    // TODO

    return true;
  }
}
