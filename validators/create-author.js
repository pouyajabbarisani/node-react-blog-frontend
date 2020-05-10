import Joi from '@hapi/joi';

export const createAuthorValidator = Joi.object({
   fullName: Joi.string().required().label('Name and Family'),
   email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
   password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*\d).{6,30}$/).label('Password').messages({
      "string.pattern.base": "Password lengths should between 6 and 30 with letter and number.",
   }),
   username: Joi.string().required().alphanum().label('Username')
});