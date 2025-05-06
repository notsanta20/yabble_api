const { z } = require("zod");

const loginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "username must be at least 3 characters" })
    .max(15, { message: "username must not be more than 15 characters" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" })
    .max(30, { message: "password should not be more than 30 characters" }),
  email: z
    .string()
    .min(1, { message: "email not be empty" })
    .email({ message: "enter a valid email" }),
});

const dataSchema = z.object({
  data: z.string(),
});

function validateCredentials(data) {
  try {
    loginSchema.parse(data);
    return;
  } catch (error) {
    return error;
  }
}

function validateData(data) {
  try {
    dataSchema.parse(data);
    return;
  } catch (error) {
    return error;
  }
}

module.exports = { validateCredentials, validateData };
