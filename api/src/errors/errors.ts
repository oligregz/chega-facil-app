export const ERROR = {
  CODE_DESCRIPTION_STATUS: {
    INVALID_DATA: {
      CODE: 'INVALID_DATA',
      DESCRIPTION: 'Os dados fornecidos no corpo da requisição são inválidos',
      STATUS: 400,
    },
    DRIVER_NOT_FOUND: {
      CODE: 'DRIVER_NOT_FOUND',
      DESCRIPTION: 'Motorista não encontrado',
      STATUS: 404,
    },
    DRIVER_INVALID_DISTANCE: {
      CODE: 'DRIVER_INVALID_DISTANCE',
      DESCRIPTION: 'Quilometragem inválida para motorista',
      STATUS: 406,
    },
    INVALID_DRIVER: {
      CODE: 'INVALID_DRIVER',
      DESCRIPTION: 'Motorista invalido',
      STATUS: 400,
    },
    CUSTOMER_ALREADY_EXISTS: {
      CODE: 'CUSTOMER_ALREADY_EXISTS',
      DESCRIPTION: 'Cliente já cdastrado',
      STATUS: 409,
    },
    DRIVER_ALREADY_EXISTS: {
      CODE: 'DRIVER_ALREADY_EXISTS',
      DESCRIPTION: 'Motorista já cdastrado',
      STATUS: 409,
    },
    CUSTOMER_NOT_FOUND: {
      CODE: 'CUSTOMER_NOT_FOUND',
      DESCRIPTION: 'Cliente não encontrado',
      STATUS: 404,
    },
  },
};
