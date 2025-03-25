import { Router } from "express"
import prisma from "../prismaClient.js"

const router = Router()

router.post("/post", async (req, res) => {
  try {
    const { userId, packageId, rating, comment } = req.body

    if (!rating || !comment) {
      return res
        .status(404)
        .json({ message: "Rating and comment are required for a review" })
    }

    const review = await prisma.review.create({
      data: {
        userId,
        packageId,
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
