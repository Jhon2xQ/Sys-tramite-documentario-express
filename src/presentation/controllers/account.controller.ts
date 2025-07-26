import { Request, Response } from "express";
import CustomError from "../../core/exceptions/custom.error.js";
import AccountService from "../../application/services/account.service.js";
import { injectable, inject } from "inversify";
import { TYPES } from "../../core/IoC/ioc.types.js";
import { COOKIE_TTL } from "../../core/configs/config.js";

@injectable()
export class AccountController {
  constructor(@inject(TYPES.AccountService) private accountService: AccountService) {}

  profile = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const foundUser = await this.accountService.getProfile(req.user.username);
    if (!foundUser) throw new CustomError("Error al acceder a la cuenta", 401);
    return res.status(200).json({ success: true, data: foundUser });
  };

  login = async (req: Request, res: Response): Promise<Response<unknown>> => {
    const jwtToken = await this.accountService.userLogin(req.body);
    if (!jwtToken) throw new CustomError("Usuario o contrasenia invalido", 404);
    this.createCookie(res, jwtToken);
    return res.status(200).json({ success: true, message: "Usuario logueado con exito" });
  };

  logout = (req: Request, res: Response) => {
    res.clearCookie("token");
    res.json({ success: true, message: "Sesión cerrada" });
  };

  createCookie = (res: Response, jwtToken: string): void => {
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false, //true in production
      sameSite: "strict",
      maxAge: COOKIE_TTL,
    });
  };
}
