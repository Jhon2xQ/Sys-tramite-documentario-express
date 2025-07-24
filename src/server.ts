import express from "express";
import errorHandler from "./core/middlewares/error.handler.middleware";
import accountRouter from "./routes/account.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import { FRONTEND_URL, PORT } from "./core/configs/config";
import documentRouter from "./routes/document.route";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

app.use("/auth", accountRouter);
app.use("/documents", documentRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
