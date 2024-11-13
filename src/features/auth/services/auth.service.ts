// Models imports
import { UserModel } from "@features/users";

// utils imports
import { AppError } from "@utils/index";

export default class AuthService {
  static async registerWithEmail(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ) {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new AppError("Email already in use", 409);
    }

    const user = await UserModel.create({
      email,
      firstName,
      lastName,

      password,
    });

    return user;
  }
}
