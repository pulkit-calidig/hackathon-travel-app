import { Router } from "express"
import { wishlistValidation } from "../validator/validatons.js"
import { validationError } from "../validator/error.js"
import prisma from "../prismaClient.js"

const router = Router()

router.post("/add", async (req, res) => {
  try {
    const { error, value } = wishlistValidation.validate(req.body)

    if (error) {
      return validationError(res, error)
    }

    const { userId, destinationId } = value

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
