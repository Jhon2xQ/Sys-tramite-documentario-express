import Joi from "joi";

export const userLoginSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});
