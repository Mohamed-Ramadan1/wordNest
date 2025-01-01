import {
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  ValidateIf,
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from "class-validator";

// Create a custom decorator for password matching
function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: "match",
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
      },
    });
  };
}

export class ChangePasswordDTO {
  @IsNotEmpty({ message: "Current password must not be empty." })
  @IsString({ message: "Current password must be a string." })
  currentPassword: string;

  @IsNotEmpty({ message: "New password must not be empty." })
  @IsString({ message: "New password must be a string." })
  @MinLength(8, { message: "New password must be at least 8 characters long." })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "New password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.",
    }
  )
  newPassword: string;

  @IsNotEmpty({ message: "Confirm password must not be empty." })
  @IsString({ message: "Confirm password must be a string." })
  @Match("newPassword", {
    message: "Confirm password must match the new password.",
  })
  newPasswordConfirmation: string;

  constructor(
    currentPassword: string,
    newPassword: string,
    newPasswordConfirmation: string
  ) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
    this.newPasswordConfirmation = newPasswordConfirmation;
  }
}
