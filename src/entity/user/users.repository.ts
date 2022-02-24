import { ConfigService } from "@nestjs/config";
import { AuthCredentialsDto } from "../../auth/dto/auth-credentials.dto";
import { User } from ".";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from "bcrypt";

export interface AuthCreateUser {
  status: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<AuthCreateUser> {
    const { firstName, lastName, email, password } = authCredentialsDto;

    const encryptedPassword = await bcrypt.hash(password, 12);

    const user = this.create({ firstName, lastName, email, encryptedPassword });
    await this.save(user);
    return {
      status: "Success",
      id: 5,
      firstName,
      lastName,
      email,
      accessToken: "Token",
      refreshToken: "Token",
    };
  }
}
