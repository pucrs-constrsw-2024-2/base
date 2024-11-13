// middlewares/authMiddleware.js
import axios from 'axios';
const middlewareUrl = `${process.env.OAUTH_INTERNAL_PROTOCOL}://${process.env.OAUTH_INTERNAL_HOST}:${process.env.OAUTH_INTERNAL_PORT}` || `http://oauth:3000/logged`;

export async function checkLoggedIn(req, res, next) {
  try {
    const response = await axios.get(middlewareUrl);

    if (response.status === 200) {
      return next();
    } else {
      res.status(401).send("Not authenticated");
    }
  } catch (error) {
    console.error("Error verifying authentication:", error);
    res.status(500).send("Internal server error");
  }
}
