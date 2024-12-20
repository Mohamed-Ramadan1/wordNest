import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDTO {
  @IsEmail({}, { message: "Invalid email format" })
  email: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;

  constructor(email: string = "", password: string = "") {
    this.email = email;
    this.password = password;
  }
}
