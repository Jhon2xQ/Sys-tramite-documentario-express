import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
export const IPFS_CLUSTER_API_URL = process.env.IPFS_CLUSTER_API_URL || "http://127.0.0.1:9094";
export const IPFS_KUBO_GATEWAY_URL = process.env.IPFS_KUBO_GATEWAY_URL || "http://localhost:8080/ipfs/";

export const COOKIE_TTL = 20 * 60 * 60 * 1000; // (in milisecond) (20 hours)
export const USER_TOKEN_TTL = 20 * 60 * 60; // (in second) (20 hours)
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret";

export const SEPOLIA_RPC = process.env.SEPOLIA_RPC;
export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;
export const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
