import { Router } from "express"
import prisma from "../prismaClient.js"

const router = Router()

router.post("/pay", async (req, res) => {
  try {
    const { bookingId, amount } = req.body

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    })

    if (!booking)
      return res
        .status(404)
        .json({ message: "No booking found with this id !!" })

    try {
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
            status: 2,
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
