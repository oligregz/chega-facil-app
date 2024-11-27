import { AppError } from 'src/errors/AppError';
import { ERROR } from 'src/errors/errors';

export function validateOriginIsDiferentDestination(
  origin: string,
  destination: string,
): boolean {
  if (origin !== destination) return true;

  throw new AppError(
    ERROR.CODE_DESCRIPTION_STATUS.INVALID_DATA.CODE,
    ERROR.CODE_DESCRIPTION_STATUS.INVALID_DATA.DESCRIPTION,
    ERROR.CODE_DESCRIPTION_STATUS.INVALID_DATA.STATUS,
  );
}
