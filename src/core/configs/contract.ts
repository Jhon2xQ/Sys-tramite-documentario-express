import { JsonRpcProvider, Contract, Wallet } from "ethers";
import { CONTRACT_ADDRESS, PRIVATE_KEY, SEPOLIA_RPC } from "./config.js";
import { contractABI } from "../utils/contractABI.js";

const provider = new JsonRpcProvider(SEPOLIA_RPC);
const wallet = new Wallet(PRIVATE_KEY, provider);
export const TRAMITE_CONTRACT: Contract = new Contract(CONTRACT_ADDRESS, contractABI, wallet);
