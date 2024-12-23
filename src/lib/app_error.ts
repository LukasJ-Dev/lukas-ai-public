class AppError extends Error {
  statusCode: number;
  text: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.text = message;
  }
}

export default AppError;
