import { Router } from "express"
import prisma from "../prismaClient.js"

const router = Router()

// create
router.post("/make", async (req, res) => {
  try {
    const { userId, startDate, endDate, packageId, destinationId, guests } =
      req.body

    if (
      !userId ||
      !startDate ||
      !endDate ||
      !packageId ||
      !destinationId ||
      !guests
    )
      return res
        .status(404)
        .json({ message: "All fields are required for make a booking" })

    // check destination and package is of same place
    const [checkDestination, checkPackage] = await Promise.all([
      prisma.destination.findFirst({ where: { id: destinationId } }),
      prisma.package.findUnique({ where: { id: packageId } }),
    ])

    if (!checkDestination || !checkPackage) {
      return res
        .status(404)
        .json({ message: "Invalid destination or package!" })
    }

    const checkCity = await prisma.city.findUnique({
      where: { id: checkPackage.cityId },
    })

    if (!checkCity || checkDestination.name !== checkCity.name)
      return res
        .status(404)
        .json({ message: "Destination doesn't match with selected package !!" })

    // startDate needs to be in future
    if (startDate < new Date().toISOString())
      return res
        .status(401)
        .json({ message: "Starting date cannot be in the past !!" })

    if (req.userId !== parseInt(userId))
      return res.status(403).json({ message: "Unauthorized. Forbidden Access" })

    // check if user alrdy has booking for same place
    const userBookings = await prisma.booking.findMany({
      where: { userId },
    })

    const upcomingBooking = userBookings.some(
      (booking) =>
        booking.destinationId === destinationId &&
        new Date(booking.startDate) > new Date()
    )

    if (upcomingBooking)
      return res.status(401).json({
        message:
          `You already have a trip planned, ID: ${userBookings[0].id}. Please cancel it to make a new one !!`,
      })

    await prisma.booking.create({
      data: {
        userId,
        startDate,
        endDate,
        packageId,
        destinationId,
        guests,
      },
    })

    res.json({ message: "Booking made" })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

// read
router.get("/getBookings", async (req, res) => {
  try {
    const { userId } = req.query

    if (!userId)
      return res
        .status(404)
        .json({ message: "User id is required to get bookings" })

    if (req.userId !== parseInt(userId))
      return res.status(403).json({ message: "Unauthorized. Forbidden Access" })

    const bookings = await prisma.booking.findMany({
      where: { userId: parseInt(userId) },
    })

    res.json({ bookings })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

// update
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { packageId, destinationId, status, startDate, endDate, guests } =
      req.body

    if (
      !packageId ||
      !destinationId ||
      !status ||
      !startDate ||
      !endDate ||
      !guests
    )
      return res.status(404).json({ message: "All fields are requierd !!" })

    if (startDate < Date.now())
      return res
        .status(401)
        .json({ message: "Starting date cannot be in the past !!" })

    await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        packageId,
        destinationId,
        status,
        startDate,
        endDate,
        guests,
      },
    })

    res.json({ message: "Booking has been updated" })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

// delete
router.put("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params

    await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        status: 2,
        deletedAt: new Date(Date.now()),
      },
    })
    res.json({ message: "Booking has been canceled !!" })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

export default router
