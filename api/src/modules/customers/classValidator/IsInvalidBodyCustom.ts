import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isNotEmpty,
} from 'class-validator';

export function IsInvalidBodyCustom(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsInvalidBodyCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isNotEmpty(value);
        },
        defaultMessage() {
          return 'INVALID_DATA]|[Os dados fornecidos no corpo da requisição são inválidos';
        },
      },
    });
  };
}
