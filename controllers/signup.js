const database = require("../database/databaseQueries");
const validateInputs = require("../config/validateInputs");
const encryptPass = require("../config/encryptPass");
const { ZodError } = require("zod");

async function signup(req, res) {
  const { username, password, email } = req.body;

  if (req.auth) {
    res.status(403).json({
      status: "failed",
      message: "you are already logged in.",
      auth: req.auth,
    });
    return;
  }

  if (
    typeof username === "undefined" ||
    typeof password === "undefined" ||
    typeof email === "undefined"
  ) {
    res.status(400).json({
      status: "failed",
      message: "received invalid credentials",
      data: null,
      auth: req.auth,
    });
    return;
  }

  try {
    const isValidInput = validateInputs.validateSignup({
      username,
      password,
      email,
    });

    if (isValidInput) {
      throw isValidInput;
    }

    const userData = await database.getLoginUser(username);

    if (userData) {
      res.status(401).json({
        status: "failed",
        message: "username already exits",
        data: null,
        auth: req.auth,
      });

      return;
    }

    const { salt, hash } = encryptPass.getHash(username, password);

    const data = await database.createUser(username, email, salt, hash);

    res.json({
      status: "success",
      message: "Signed in successfully",
      data: null,
      auth: req.auth,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        status: "failed",
        message: "invalid credentials",
        data: error.issues,
        auth: req.auth,
      });
    }
  }
}

module.exports = signup;
