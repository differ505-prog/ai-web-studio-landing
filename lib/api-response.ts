import { NextResponse } from "next/server";

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: Record<string, string[]>;
  timestamp: string;
};

export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR"
  | "BAD_REQUEST";

interface ApiErrorOptions {
  code: ApiErrorCode;
  message: string;
  status: number;
  details?: Record<string, string[]>;
}

export class ApiError extends Error {
  code: ApiErrorCode;
  status: number;
  details?: Record<string, string[]>;

  constructor(options: ApiErrorOptions) {
    super(options.message);
    this.name = "ApiError";
    this.code = options.code;
    this.status = options.status;
    this.details = options.details;
  }
}

export function successResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}

export function createdResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    },
    { status: 201 }
  );
}

export function errorResponse(error: unknown, status = 500): NextResponse<ApiResponse> {
  if (error instanceof ApiError) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.code,
        message: error.message,
        details: error.details,
        timestamp: new Date().toISOString(),
      },
      { status: error.status }
    );
  }

  const message = error instanceof Error ? error.message : "伺服器內部錯誤";
  const code = status >= 500 ? "INTERNAL_ERROR" : "BAD_REQUEST";

  return NextResponse.json<ApiResponse>(
    {
      success: false,
      error: code,
      message,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

export function unauthorizedResponse(message = "未經授權"): NextResponse<ApiResponse> {
  return errorResponse(new ApiError({
    code: "UNAUTHORIZED",
    message,
    status: 401,
  }), 401);
}

export function notFoundResponse(message = "資源不存在"): NextResponse<ApiResponse> {
  return errorResponse(new ApiError({
    code: "NOT_FOUND",
    message,
    status: 404,
  }), 404);
}

export function validationErrorResponse(
  message: string,
  details?: Record<string, string[]>
): NextResponse<ApiResponse> {
  return errorResponse(new ApiError({
    code: "VALIDATION_ERROR",
    message,
    status: 422,
    details,
  }), 422);
}

export function rateLimitResponse(message = "請求太頻繁，請稍後再試"): NextResponse<ApiResponse> {
  return errorResponse(new ApiError({
    code: "RATE_LIMITED",
    message,
    status: 429,
  }), 429);
}
