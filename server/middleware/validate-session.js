import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const validateSession = (req, res, next) => {
  /* console.log(" Middleware: validateSession triggered"); */

  const authHeader = req.headers["authorization"];
  /* console.log(" Auth Header:", authHeader); */

  if (!authHeader) {
    /* console.log(" No Authorization header found."); */
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const parts = authHeader.split(" ");
  if (parts.length === 2 && parts[0] === "Bearer") {
    var token = parts[1];
  } else {
    /* console.log(" Invalid Authorization header format."); */
    return res
      .status(401)
      .json({
        error: "Invalid Authorization header format. Expected 'Bearer <token>'",
      });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    /* console.log(" Token verified. Decoded:", decoded); */

    req.user = decoded.user || decoded; // Handle both token formats
    console.log("🔹 req.user set to:", req.user);

    next();
  } catch (error) {
    console.log(" Invalid token:", error.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default validateSession;
