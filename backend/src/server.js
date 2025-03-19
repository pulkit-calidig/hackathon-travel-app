import express, { json } from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import unAuthRoutes from "./routes/unAuthRoutes.js"
import middleware from "./middleware/middleware.js"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 2104

// middleware
app.use(json())

app.use(
  cors({
    origin: "http://localhost:5173", // url where project will run
    methods: ["GET, POST, PUT, DELETE"],
  })
)

// routes
app.use("/auth", authRoutes)
app.use("/", unAuthRoutes)

app.listen(PORT, (req, res) => {
  console.info(`Server is running on ${PORT}`)
})

// : Setup prisma and docker ASAP to start working on apis : DONE
