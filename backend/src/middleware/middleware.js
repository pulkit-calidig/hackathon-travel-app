import jwt from "jsonwebtoken"

function middleware(req, res, next) {
  const token = req.headers["authorization"]

  if (!token) return res.status(404).json({ message: "Token not provided" })

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token provided" })

    req.userId = decoded.id

    next()
  })
}

export default middleware
