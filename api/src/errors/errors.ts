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
    DRIVERS_AVAILABE_DISTANCE_NOT_FOUND: {
      CODE: 'DRIVERS_AVAILABE_DISTANCE_NOT_FOUND',
      DESCRIPTION:
        'Motoristas com disponibilidade de distancia mínima para o trajeto passado, não encontrados',
      STATUS: 404,
    },
    INVALID_API_KEY: {
      CODE: 'INVALID_API_KEY',
      DESCRIPTION: 'Chave da api não configurada no .env',
      STATUS: 400,
    },
    GOOGLE_API_ERROR: {
      CODE: 'GOOGLE_API_ERROR',
      DESCRIPTION: 'Erro na api',
      STATUS: 400,
    },
    ROUTE_CALCULATION_ERROR: {
      CODE: 'ROUTE_CALCULATION_ERROR',
      DESCRIPTION: 'Erro no cálculo da rota',
      STATUS: 400,
    },
    BAD_DISTANCE_CALCULATION: {
      CODE: 'BAD_DISTANCE_CALCULATION',
      DESCRIPTION: 'Não foi possível calcular a distância',
      STATUS: 400,
    },
    INVALID_COORDINATES: {
      CODE: 'INVALID_COORDINATES',
      DESCRIPTION: 'Coordenadas de origem ou destino inválidas',
      STATUS: 400,
    },
    COORDINATES_NOT_FOUND: {
      CODE: 'COORDINATES_NOT_FOUND',
      DESCRIPTION: 'Coordenadas não encontradas',
      STATUS: 400,
    },
    BAD_RIDE_UPDATION: {
      CODE: 'BAD_RIDE_UPDATION',
      DESCRIPTION: 'Falha ao atualizar a corrida',
      STATUS: 400,
    },
  },
};
