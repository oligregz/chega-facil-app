import { AppError } from 'src/errors/AppError';
import { ERROR } from '../../../errors/errors';
import { validate } from 'uuid';

export function validateId(id: string, entity: string): boolean {
  const customerIdIsValid: boolean = !!id && id.length > 0 && id !== undefined;
  const driverIdIsValid: boolean = id !== undefined || validate(id);

  if (entity === 'customer') {
    if (!customerIdIsValid)
      throw new AppError(
        ERROR.CODE_DESCRIPTION_STATUS.INVALID_DATA.CODE,
        ERROR.CODE_DESCRIPTION_STATUS.INVALID_DATA.DESCRIPTION,
        ERROR.CODE_DESCRIPTION_STATUS.INVALID_DATA.STATUS,
      );

    if (!driverIdIsValid)
      throw new AppError(
        ERROR.CODE_DESCRIPTION_STATUS.INVALID_DATA.CODE,
        ERROR.CODE_DESCRIPTION_STATUS.INVALID_DATA.DESCRIPTION,
        ERROR.CODE_DESCRIPTION_STATUS.INVALID_DATA.STATUS,
      );
  }

  return true;
}
