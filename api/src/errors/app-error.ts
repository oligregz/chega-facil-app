export class AppError extends Error {
  constructor(
    public error_code: string,
    public error_description: string,
    public statusCode: number = 400,
  ) {
    super(error_description);
  }
}
