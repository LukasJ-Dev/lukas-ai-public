import { NextResponse } from "next/server";
import { z } from "zod";
import { ServerActionLogger } from "./logger";
import AppError from "./app_error";

export function handleError(
  error: unknown,
  serverActionLogger?: ServerActionLogger
) {
  let appError: AppError = new AppError("Something went wrong", 500);

  if (error instanceof z.ZodError)
    appError = new AppError(
      error.errors[0]?.message || "Validation error",
      400
    );
  if (error instanceof Error) appError = new AppError(error.message, 500);
  if (error instanceof AppError) appError = error;

  if (serverActionLogger) serverActionLogger.logError(appError);

  return {
    status: "error" as const,
    error: {
      message: appError.message,
      statusCode: appError.statusCode,
    },
  };
}

export function handleApiError(error: unknown) {
  const appError = handleError(error);

  const statusCode = appError.error.statusCode || 500;
  let message = "Internal Server Error";

  // Only show detailed error messages in production if it's not a 500 error
  if (process.env.NODE_ENV !== "production" || statusCode !== 500) {
    message = appError.error.message;
  }

  return NextResponse.json({ success: false, message }, { status: statusCode });
}
