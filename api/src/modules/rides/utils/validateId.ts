import { AppError } from 'src/errors/AppError';
import { ERROR } from '../../../errors/errors';
import { validate } from 'uuid';

export function validateId(id: string, entity: string): boolean {
  const customerIdIsValid: boolean =
    !!id && id.length > 0 && id !== undefined && validate(id);
  const driverIdIsValid: boolean =
    (id !== undefined && validate(id)) ||
    (typeof id === 'string' && id.length === 0);

  if (entity === 'customer') {
    if (!customerIdIsValid)
      throw new AppError(
        ERROR.CODE_DESCRIPTION_STATUS.INVALID_DATA.CODE,
        ERROR.CODE_DESCRIPTION_STATUS.INVALID_DATA.DESCRIPTION,
        ERROR.CODE_DESCRIPTION_STATUS.INVALID_DATA.STATUS,
      );
  }
  if (entity === 'driver') {
    console.log('driver_id', typeof id);
    if (!driverIdIsValid)
      throw new AppError(
        ERROR.CODE_DESCRIPTION_STATUS.INVALID_DATA.CODE,
        ERROR.CODE_DESCRIPTION_STATUS.INVALID_DATA.DESCRIPTION,
        ERROR.CODE_DESCRIPTION_STATUS.INVALID_DATA.STATUS,
      );
  }

  return true;
}
