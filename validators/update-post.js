import Joi from '@hapi/joi'

export const updatePostValidator = Joi.object({
   slug: Joi.string().required().label('Slug'),
   updatedSlug: Joi.string().label('Updated Slug'),
   updatedTitle: Joi.string().label('Updated Title'),
   updatedContent: Joi.string().label('Updated Content'),
   updatedCategories: Joi.array().items(Joi.string()).label('Updated Categories'),
   updatedFeaturedImage: Joi.allow(null).label('Updated Featured image')
});