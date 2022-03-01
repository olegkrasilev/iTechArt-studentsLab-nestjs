import { ConfigModule } from "@nestjs/config";
import { UserRepository } from "../entity/user/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtAccessStrategy } from "./jwt.access-strategy";
import { JwtRefreshStrategy } from "./jwt.refresh-strategy";
import config from "../config/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({}),
    JwtModule.register({}),
  ],
  providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
  exports: [JwtAccessStrategy, PassportModule, JwtRefreshStrategy],
})
export class AuthModule {}
