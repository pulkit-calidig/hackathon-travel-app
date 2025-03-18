import { Router } from "express"

const router = Router()

router.post("/register", (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password)
    return res
      .status(404)
      .json({ message: "All required fields are necessary for registration" })
})

export default router
