import { Router } from "express"
import prisma from "../prismaClient.js"

const router = Router()

router.post("/book", async (req, res) => {
  try {
    const { userId, startDate, endDate, packageId, destinationId, status } =
      req.body

    await prisma.booking.create({
      data: {
        userId,
        startDate,
        endDate,
        packageId,
        destinationId,
        status,
      },
    })

    res.json({ message: "Booking made" })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

export default router
