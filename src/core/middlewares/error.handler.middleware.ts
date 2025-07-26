import { Request, Response, NextFunction } from "express";
import CustomError from "../exceptions/custom.error.js";
import CustomResponse from "../exceptions/custom.response.js";
import PlainDto from "../exceptions/plain.dto.js";
import ResponseErrorDto from "../exceptions/response.error.dto.js";

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (!(err instanceof CustomError)) {
    const response: CustomResponse<PlainDto> = {
      success: false,
      message: process.env.NODE_ENV === "development" ? err.message : "Server error, please try again later",
    };

    res.status(500).json(response);
    return;
  } else {
    const customError = err as CustomError;

    let response = {
      message: customError.message,
    } as ResponseErrorDto;

    // Check if there is more info to return.
    if (customError.additionalInfo) {
      response.additionalInfo = customError.additionalInfo;
    }

    const jsonResponse: CustomResponse<PlainDto> = {
      success: false,
      message: response.message,
      errors: response.additionalInfo ? [response.additionalInfo] : undefined,
    };

    res.status(customError.status).json(jsonResponse);
    return;
  }
}
