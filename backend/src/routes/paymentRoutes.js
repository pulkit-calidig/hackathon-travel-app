import { Router } from "express"
import { paymentValidation } from "../validator/validatons.js"
import { validationError } from "../validator/error.js"
import prisma from "../prismaClient.js"

const router = Router()

router.post("/pay", async (req, res) => {
  try {
    const { error, value } = paymentValidation.validate(req.body)
    if (error) {
      return validationError(res, error)
    }
    const { bookingId } = value

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    })

    if (!booking)
      return res
        .status(404)
        .json({ message: "No booking found with this id !!" })

    if (booking.status !== 0)
      return res.status(400).json({
        message:
          "Cannot accept payment for this booking. Either cancelled or already paid !!",
      })

    try {
      const packagePrice = await prisma.package.findUnique({
        where: { id: booking.packageId },
      })
      const totalGuests = booking.guests
      const amount = packagePrice.price * totalGuests

      const payment = await prisma.payment.create({
        data: {
          bookingId,
          amount,
          status: 2,
        },
      })

      if (payment) {
        await prisma.booking.update({
          where: { id: bookingId },
          data: {
            status: 1,
          },
        })
        await prisma.flight.update({
          where: { bookingId },
          data: {
            status: 1,
          },
        })
      }

      res.json({
        success: "Payment Received. Enjoy the trip to the fullest !!",
      })
    } catch (err) {
      console.error("Error processing payment ", err.message)
      return res.status(500).json({ message: "Internal server error !!" })
    }
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

export default router
