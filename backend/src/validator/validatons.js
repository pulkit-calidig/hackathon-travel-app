import Joi from "joi"

export const bookingValidation = Joi.object({
  userId: Joi.number().integer().required(),
  startDate: Joi.date().iso().required(), // expecting ISO date string
  endDate: Joi.date().iso().required(),
  packageId: Joi.number().integer().required(),
  originId: Joi.number().integer().required(),
  destinationId: Joi.number().integer().required(),
  guests: Joi.number().integer().min(1).strict().required(),
}).options({ abortEarly: false })
