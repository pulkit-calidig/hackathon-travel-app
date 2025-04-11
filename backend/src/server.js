import express, { json } from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import unAuthRoutes from "./routes/unAuthRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import itineraryRoutes from "./routes/itineraryRoutes.js"
import stopRoutes from "./routes/stopRoutes.js"
import middleware from "./middleware/middleware.js"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 2104

// middleware
app.use(json())

// cors
app.use(
  cors({
    origin: "http://localhost:5173", // url where project will run
    methods: ["GET, POST, PUT, DELETE"],
  })
)

// routes
app.use("/auth", authRoutes)
app.use("/", unAuthRoutes)
app.use("/booking", middleware, bookingRoutes)
app.use("/review", middleware, reviewRoutes)
app.use("/wishlist", middleware, wishlistRoutes)
app.use("/payment", middleware, paymentRoutes)
app.use("/itinerary", middleware, itineraryRoutes)
app.use("/stops", middleware, stopRoutes)

// starter
app.listen(PORT, (req, res) => {
  console.info(`Server is running on ${PORT}`)
})

// : Setup prisma and docker ASAP to start working on apis : DONE
// : Add destinations and packages to db : DONE
// : Make destination and package apis : DONE
// : Make booking api : DONE
// : Make review api : DONE
// : Make wishlist api : DONE
// : Change schema for booking and set isDeleted when user delets a booking : DONE
// : Make completed CRUD apis for booking : DONE
// : Edit package ids so each type has a separate id : DONE
// : Manage guests while booking : DONE
// : Make changes to payment api : DONE
// : Make changes to booking api : DONE
// : Keep id in destination and package related : DONE
// : Change status from string to int : DONE
// : Change package json to new table : DONE
// TODO: Validation in all apis
// TODO: Related destination to city
// : Review only when trip has ended : DONE
// : Delete columns from user table : NOT NEEDED
// : Only book a trip if startDate is not in past : DONE
// : Make itinerary api : DONE
// : Make itineraryDay table and save day details : DONE
// : Update itineraryDay model on edit : DONE
// : Make stop api for a booking : DONE
