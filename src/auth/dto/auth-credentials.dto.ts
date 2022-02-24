import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsString,
  Matches,
} from "class-validator";

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: "Password is too short",
  })
  @MaxLength(50, {
    message: "Password is too long",
  })
  @Matches(/^[a-zA-Z0-9_.-]*$/, {
    message: "Password should use only letters and numbers",
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9_.-]*$/, {
    message: "Firstname should use only letters and numbers",
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9_.-]*$/, {
    message: "Lastname should use only letters and numbers",
  })
  lastName: string;
}
