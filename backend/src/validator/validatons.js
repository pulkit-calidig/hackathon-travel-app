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

export const registerValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).options({ abortEarly: false })

export const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).options({ abortEarly: false })

export const itineraryValidation = Joi.object({
  bookingId: Joi.number().integer().required,
  userId: Joi.number().integer().required,
  departure: Joi.date().iso().required,
  arrival: Joi.date().iso().required,
  days: Joi.required(),
}).options({ abortEarly: false })

export const paymentValidation = Joi.object({
  bookingId: Joi.number().integer().required,
}).options({ abortEarly: false })

export const reviewValidation = Joi.object({
  userId: Joi.number().integer().required,
  bookingId: Joi.number().integer().required,
  rating: Joi.number().required,
  comment: Joi.string().required,
}).options({ abortEarly: false })

export const stopValidation = Joi.object({
  name: Joi.number().required,
  description: Joi.string().required,
  latitude: Joi.number().integer().required,
  longitude: Joi.number().integer().required,
  order: Joi.number().integer().required,
}).options({ abortEarly: false })

export const wishlistValidation = Joi.object({
  userId: Joi.number().integer().required,
  destinationId: Joi.number().integer().required,
}).options({ abortEarly: false })
