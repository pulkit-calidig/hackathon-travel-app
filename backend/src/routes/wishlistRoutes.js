import { Router } from "express"
import prisma from "../prismaClient.js"

const router = Router()

router.post("/add", async (req, res) => {
  try {
    const { userId, destinationId } = req.body

    if (!userId || !destinationId) {
      return res
        .status(401)
        .json({ message: "UserId and destinationId are required !!" })
    }

    await prisma.wishlist.create({
      data: {
        userId,
        destinationId,
      },
    })

    res.json({ message: "Destination has been added to wishlist" })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

export default router
