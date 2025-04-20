import { Router } from "express"
import { registerValidation, loginValidation } from "../validator/validatons.js"
import { validationError } from "../validator/error.js"
import bcrypt from "bcryptjs"
import prisma from "../prismaClient.js"
import jwt from "jsonwebtoken"

const router = Router()

// sign up
router.post("/register", async (req, res) => {
  try {
    const { error, value } = registerValidation.validate(req.body)

    if (error) {
      return validationError(res, error)
    }
    const { username, email, password } = value

    if (!username || !email || !password)
      return res
        .status(404)
        .send({ message: "Username, email and password are required" })

    const existingUser = await prisma.users.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(403).json({
        message:
          "User already exists with this email. Please login with this email",
      })
    }

    // hashing pswrd to store in db
    const hashedPswrd = bcrypt.hashSync(password, 8)

    const user = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPswrd,
      },
    })

    if (!user || !user.id)
      return res.status(403).json({ message: "Failed to create user !!" })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    })

    res.json({ token })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

// sign in
router.post("/login", async (req, res) => {
  try {
    const { error, value } = loginValidation.validate(req.body)

    if (error) {
      return res.status(400).json({
        message: "Validation Error",
        details: error.details.map((detail) => detail.message),
      })
    }
    const { email, password } = value

    if (!email || !password)
      return res
        .status(404)
        .json({ message: "All fields are required to login !!" })

    const user = await prisma.users.findUnique({
      where: { email },
    })

    if (!user)
      return res
        .status(404)
        .json({ message: "No user found associated with this email !!" })

    // checking if entered pswrd is same as stored in db
    const pswrdIsValid = bcrypt.compareSync(password, user.password)

    if (!pswrdIsValid)
      return res.status(401).json({ message: "Password didn't match" })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "12h",
    })

    res.json({ token })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

export default router
