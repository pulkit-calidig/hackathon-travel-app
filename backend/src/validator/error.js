export function validationError(res, error) {
  return res.status(400).json({
    message: "Validation Error !",
    details: error.details.map((detail) => detail.message),
  })
}
