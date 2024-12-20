import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegistrationDto {
  @IsEmail({}, { message: "Invalid email address" })
  public email!: string;

  @IsNotEmpty({ message: "First name is required" })
  @IsString({ message: "First name must be a string" })
  public firstName!: string;

  @IsNotEmpty({ message: "Last name is required" })
  @IsString({ message: "Last name must be a string" })
  public lastName!: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  public password!: string;
}
