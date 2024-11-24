/** @type {import("axios").Axios} **/
const axios = require("axios");
const middlewareUrl =
    `${process.env.OAUTH_INTERNAL_PROTOCOL}://${process.env.OAUTH_INTERNAL_HOST}:${process.env.OAUTH_INTERNAL_PORT}/auth/validate-token` ||
    `http://localhost:3000/auth/validate-token`;

/**
  * @param {string} method
  * @param {import("express").Request} req
  * @param {import("express").Response} res
  * @param {import("express").NextFunction} next
**/
async function checkLoggedIn(req, res, next) {
    const { Authorization, Resource } = req.headers;

    if (!Authorization || !Resource) {
        res.status(400).send("Bad request");
        return;
    }

    try {
        console.log(middlewareUrl);
        const response = await axios.get(middlewareUrl, {
            headers: {
                Authorization,
                Resource,
                Method: req.method
            }
        });

        if (response.status === 200) {
            return next();
        } else if (response.status === 403) {
            res.status(403).send("Forbidden resource");
        } else {
            res.status(401).send("Not authenticated");
        }
    } catch (error) {
        console.error("Error verifying authentication:", error);
        res.status(500).send("Internal server error");
    }
}

module.exports = { checkLoggedIn };
