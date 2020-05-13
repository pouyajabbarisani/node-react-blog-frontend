import Joi from '@hapi/joi';

export const createCategoryValidator = Joi.object({
   title: Joi.string().required().label('Title'),
   slug: Joi.string().required().label('Slug')
});