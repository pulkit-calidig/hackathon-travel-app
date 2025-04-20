import { Router } from "express"
import { bookingValidation } from "../validator/validatons.js"
import { validationError } from "../validator/error.js"
import axios from "axios"
import dotenv from "dotenv"
import prisma from "../prismaClient.js"

const router = Router()
dotenv.config()

// create
router.post("/make", async (req, res) => {
  try {
    const { error, value } = bookingValidation.validate(req.body)

    if (error) {
      return validationError(res, error)
    }

    const {
      userId,
      startDate,
      endDate,
      packageId,
      originId,
      destinationId,
      guests,
    } = value

    if (
      !userId ||
      !startDate ||
      !endDate ||
      !packageId ||
      !originId ||
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
        .json({ message: "Invalid destination or package !!" })
    }

    const checkCity = await prisma.city.findUnique({
      where: { id: checkPackage.cityId },
    })

    if (!checkCity || checkDestination.name !== checkCity.name)
      return res
        .status(404)
        .json({ message: "Destination doesn't match with selected package !!" })

    // dates need to be correct
    if (startDate < new Date().toISOString() || startDate > endDate)
      return res.status(401).json({ message: "Please enter correct dates !!" })

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
        message: `You already have a trip planned, ID: ${userBookings[0].id}. Please cancel it to make a new one !!`,
      })

    const origin = await prisma.origin.findUnique({ where: { id: originId } })
    const destination = await prisma.destination.findUnique({
      where: { id: destinationId },
    })

    // flight api
    try {
      const options = {
        method: "GET",
        url: `https://api.aviationstack.com/v1/flightsFuture?access_key=${process.env.FLIGHT_APIKEY}`,
        params: {
          iataCode: origin.iataCode,
          type: "departure",
          date: new Date(startDate).toISOString().split("T")[0],
        },
      }

      const flightResponse = await axios.request(options)

      if (!flightResponse.data || !flightResponse.data.data) {
        return res.status(404).json({ message: "No flights found !!" })
      }

      const allFlights = flightResponse.data.data
      const destinationIata = destination.iataCode

      const filteredFlights = allFlights.filter(
        (flight) =>
          flight.arrival &&
          flight.arrival.iataCode &&
          flight.arrival.iataCode.toUpperCase() === destinationIata
      )

      if (filteredFlights.length > 0) {
        const flight = filteredFlights[0]

        const booking = await prisma.booking.create({
          data: {
            userId,
            startDate,
            endDate,
            packageId,
            originId,
            destinationId,
            guests,
          },
        })

        await prisma.flight.create({
          data: {
            bookingId: booking.id,
            departureDate: booking.startDate,
            departureIataCode: flight.departure.iataCode,
            arrivalIataCode: flight.arrival.iataCode,
            scheduledDeparture: flight.departure.scheduledTime,
            scheduledArrival: flight.arrival.scheduledTime,
          },
        })

        return res.json({ message: "Booking Made !!" })
      }

      return res.status(404).json({ message: "No matching flights found !!" })
    } catch (err) {
      console.error(err)
      return res.status(404).json({ message: "No flights found !!" })
    }
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

// read
router.get("/getBookings/:userId", async (req, res) => {
  try {
    const { userId } = req.params

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
router.put("/cancel/:id", async (req, res) => {
  try {
    const { id } = req.params

    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
    })

    if (!booking)
      return res
        .status(404)
        .json({ message: "No booking found with this id !!" })

    if (booking.status === 2)
      return res
        .status(401)
        .json({ message: "This booking has already been cancelled !!" })

    await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        status: 2,
        deletedAt: new Date(Date.now()),
      },
    })

    await prisma.flight.update({
      where: { bookingId: parseInt(id) },
      data: {
        status: 2,
        deletedAt: new Date(Date.now()),
      },
    })

    await prisma.itinerary.update({
      where: { bookingId: parseInt(id) },
      data: {
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
