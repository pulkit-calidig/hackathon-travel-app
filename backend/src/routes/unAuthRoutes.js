import { Router } from "express"
import prisma from "../prismaClient.js"

const router = Router()

// get packages
router.get("/packages", async (req, res) => {
  const { country } = req.body
  try {
    const packages = await prisma.package
      .findMany
      // { where: { country } }
      ()
    res.json({ packages })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

// get destinations
router.get("/destinations", async (req, res) => {
  try {
    const destinations = await prisma.destination.findMany()
    res.json({ destinations })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

export default router
