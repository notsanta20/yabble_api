const database = require("../database/databaseQueries");
const validateInputs = require("../config/validateInputs");
const encryptPass = require("../config/encryptPass");
const { ZodError } = require("zod");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function login(req, res) {
  const { username, password } = req.body;

  if (req.auth) {
    res.status(403).json({
      status: "failed",
      message: "you are already logged in.",
      auth: req.auth,
    });
    return;
  }

  if (typeof username === "undefined" || typeof password === "undefined") {
    res.status(400).json({
      status: "failed",
      message: "received invalid credentials",
      data: null,
      auth: req.auth,
    });
    return;
  }

  try {
    const isValidInput = validateInputs.validateLogin({
      username,
      password,
    });

    if (isValidInput) {
      throw isValidInput;
    }
    const userData = await database.getLoginUser(username);

    if (!userData) {
      res.status(401).json({
        status: "failed",
        message: "username does not exits",
        data: null,
        auth: req.auth,
      });

      return;
    }

    const isValidPass = encryptPass.validateHash(
      username,
      password,
      userData.salt,
      userData.hash
    );

    if (!isValidPass) {
      res.status(401).json({
        status: "failed",
        message: "password is not matching",
        data: null,
        auth: req.auth,
      });

      return;
    }

    const tokenData = {
      id: userData.id,
      username: userData.username,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    await database.setOnline(userData.id);

    jwt.sign(
      { user: tokenData },
      secret,
      { expiresIn: "1d" },
      (error, data) => {
        if (error) {
          res.status(500).json({
            status: "failed",
            message: "Internal server error in generating token",
            token: null,
            auth: req.auth,
          });
          return;
        }

        res.json({
          status: "success",
          message: "logged in successfully",
          token: data,
          auth: req.auth,
        });
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        status: "failed",
        message: "invalid credentials",
        data: error.issues,
        auth: req.auth,
      });
      return;
    }

    res.status(503).json({
      status: "failed",
      message: "Internal server error",
      data: null,
      auth: req.auth,
    });
  }
}

module.exports = login;
