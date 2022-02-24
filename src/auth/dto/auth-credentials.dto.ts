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
  @Matches(/[$-/:-?{-~!"^_`\[\]]/, {
    message: "Please use only letters and numbers",
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/[$-/:-?{-~!"^_`\[\]]/, {
    message: "Please use only letters and numbers",
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/[$-/:-?{-~!"^_`\[\]]/, {
    message: "Please use only letters and numbers",
  })
  lastName: string;
}
