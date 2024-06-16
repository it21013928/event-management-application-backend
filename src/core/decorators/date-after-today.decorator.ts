import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string' && !(value instanceof Date))
            return false;
          const dateValue = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0); // Ignore time part
          return dateValue.getDate() > today.getDate(); // Strictly future date
        },
        defaultMessage(args: ValidationArguments) {
          return 'Date must be a future date (today or past dates are not allowed)';
        },
      },
    });
  };
}
