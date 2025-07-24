import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

export const COOKIE_TTL = 20 * 60 * 60 * 1000; // (in milisecond) (20 hours)
export const USER_TOKEN_TTL = 20 * 60 * 60; // (in second) (20 hours)
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret";
