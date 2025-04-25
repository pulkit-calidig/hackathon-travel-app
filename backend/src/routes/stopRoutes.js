import { Router } from "express"
import { stopValidation } from "../validator/validatons.js"
import { validationError } from "../validator/error.js"
import prisma from "../prismaClient.js"

const router = Router()

router.post("/add/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { error, value } = stopValidation.validate(req.body)

    if (error) {
      return validationError(res, error)
    }

    const { name, description, location, latitude, longitude, order } = value

    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
    })

    if (!booking)
      return res
        .status(404)
        .json({ message: "No booking found with this id !!" })

    const stop = await prisma.stop.findFirst({ where: { name } })

    if (stop)
      return res
        .status(401)
        .json({ message: "Stop for this location is already there !!" })

    const addStop = await prisma.stop.create({
      data: {
        bookingId: parseInt(id),
        name,
        description,
        location,
        latitude,
        longitude,
        order,
      },
    })

    if (!addStop || !addStop.id)
      return res.status(401).json({ message: "Failed to create a stop !!" })

    res.json({ message: "Stop has been added for the trip" })
  } catch (err) {
    console.error(err.message)
    res.status(503).json({ message: "Something went wrong !!" })
  }
})

export default router
