import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PostsModule } from './posts/posts.module';
import config from "./config/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    AuthModule,
    TypeOrmModule.forRoot(),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
