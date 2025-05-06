const validateInputs = require("./validateInputs");

describe("Test validate Inputs", () => {
  const credentials = {
    username: "user",
    password: "password",
    email: "user@odin.com",
  };

  const wrongCredentials = {
    username: "GTA VI",
    password: "trailer 2",
    email: "rockstar.com",
  };

  const randomData = {
    data: "cat",
  };

  test("should return undefined", () => {
    expect(validateInputs.validateCredentials(credentials)).toBeUndefined();
  });

  test("should return error in array", () => {
    expect(validateInputs.validateCredentials(wrongCredentials)).toBeDefined();
  });

  test("should return undefined", () => {
    expect(validateInputs.validateData(randomData)).toBeUndefined();
  });
});
