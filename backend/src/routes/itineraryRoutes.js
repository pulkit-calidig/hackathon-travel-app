import { Router } from "express"
import { itineraryValidation } from "../validator/validatons.js"
import { validationError } from "../validator/error.js"
import prisma from "../prismaClient.js"

const router = Router()

// create
router.post("/create", async (req, res) => {
  try {
    const { error, value } = itineraryValidation.validate(req.body)

    if (error) {
      return validationError(req, error)
    }

    const { bookingId, userId, departure, arrival, days } = value

    if (!bookingId || !userId || !departure || !arrival || !days)
      return res.status(404).json({ message: "All fields are required !!" })

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    })

    if (!booking)
      return res
        .status(404)
        .json({ message: "No booking found with this id !!" })

    const itinerary = await prisma.itinerary.create({
      data: {
        bookingId,
        userId,
        departure,
        arrival,
        days: {
          create: days,
        },
      },
    })

    await prisma.booking.update({
      where: { id: bookingId },
      data: { itineraryId: itinerary.id },
    })

    res.json({ message: "Itinerary Created !!" })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

// read
router.get("/getItinerary", async (req, res) => {
  const { userId, bookingId } = req.body

  if (!userId || !bookingId)
    return res.status(404).json({ messag: "All fields are required !!" })

  if (req.userId !== userId)
    return res
      .status(500)
      .json({ message: "Unauthorized. Forbidden access !!" })

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } })

  if (!booking)
    return res.status(404).json({ message: "No booking found with this id !!" })

  const itinerary = await prisma.itinerary.findMany({
    where: { bookingId },
    include: { days: true }, // sending days detail when fetching
  })

  res.json({ itinerary })
})

// update
router.put("/create/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { days } = req.body

    const itinerary = await prisma.itinerary.findUnique({
      where: { id: parseInt(id) },
    })

    if (!itinerary)
      res.status(404).json({ message: "No itinerary found with this id !!" })

    // need to delete the old itinerary first and create a new one with updated data
    await prisma.itineraryDay.deleteMany({
      where: { itineraryId: parseInt(id) },
    })

    await prisma.itineraryDay.createMany({
      data: days.map((day) => ({
        itineraryId: parseInt(id),
        dayNumber: day.dayNumber,
        content: day.content,
      })),
    })

    res.json({ message: "Itinerary Updated !!" })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

export default router
