import Joi from '@hapi/joi';

export const loginValidator = Joi.object({
   email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
   password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*\d).{6,30}$/).label('Password').messages({
      "string.pattern.base": "Wrong password!",
   }),
});