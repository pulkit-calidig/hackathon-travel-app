import { Router } from "express"
import { reviewValidation } from "../validator/validatons.js"
import { validationError } from "../validator/error.js"
import prisma from "../prismaClient.js"

const router = Router()

router.post("/post", async (req, res) => {
  try {
    const { error, value } = reviewValidation.validate(req.body)

    if (error) {
      return validationError(res, error)
    }

    const { userId, bookingId, rating, comment } = value

    if (!rating || !comment || !bookingId) {
      return res.status(404).json({
        message: "Rating, comment and bookingId are required for a review",
      })
    }

    const findBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
    })

    if (!findBooking)
      return res.status(404).json({
        message: "No booking found with this id. Cannot post the review !",
      })

    if (findBooking.endDate > Date.now())
      return res.status(401).json({
        message:
          "The trip has not ended yet. Cannot post review before that !!",
      })

    const review = await prisma.review.create({
      data: {
        userId,
        bookingId,
        rating,
        comment,
      },
    })

    res.json({ review: review.comment })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

export default router
