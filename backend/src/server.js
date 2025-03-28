import express, { json } from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import unAuthRoutes from "./routes/unAuthRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js"
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
// TODO: Make payment api
// TODO: Keep id in destination and package related
// TODO: Change status from string to int
// TODO: Change package json to new table
// TODO: Validation in all apis
// : Review only when trip has ended : DONE
// TODO: Delete columns from user table
// : Only book a trip if startDate is not in past : DONE
