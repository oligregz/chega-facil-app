import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isNotEmpty,
} from 'class-validator';
import { ERROR } from '../../../errors/errors';

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
          return `${ERROR.CODE.INVALID_DATA}]|[${ERROR.DESCRIPTION.INVALID_DATA}`;
        },
      },
    });
  };
}
