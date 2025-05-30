import { Router } from "express"
import prisma from "../prismaClient.js"

const router = Router()

// get packages
router.get("/packages", async (req, res) => {
  const { cityId } = req.body
  try {
    const packages = await prisma.package.findMany({
      where: { cityId },
    })
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

// get flights
// router.get("/flights", async (req, res) => {
//   const options = {
//     method: "GET",
//     url: `https://api.aviationstack.com/v1/flightsFuture?access_key=${process.env.FLIGHT_APIKEY}`,
//     params: {
//       iataCode: "JFK",
//       type: "departure",
//       date: new Date(startDate).toISOString().split("T")[0],
//     },
//   }

//   const flightResponse = await axios.request(options)

//   console.log(flightResponse)
// })

export default router
