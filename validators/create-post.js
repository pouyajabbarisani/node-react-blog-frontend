import Joi from '@hapi/joi'

export const createPostValidator = Joi.object({
   slug: Joi.string().required().label('Slug'),
   title: Joi.string().required().label('Title'),
   content: Joi.string().required().label('Content'),
   categories: Joi.array().items(Joi.string()).label('Categories'),
   featuredImage: Joi.string().label('Featured image')
});