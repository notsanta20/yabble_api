const { PrismaClient } = require("../prisma/generated/prisma/client");
const prisma = new PrismaClient();

async function sendRequest(req, res) {
  const { requestId } = req.body;
  const id1 = "1af38ddf-b90f-4816-b0c3-594300b31ae8";

  try {
    const data = await prisma.requests.create({
      data: {
        userAID: id1,
        userBID: requestId,
      },
    });

    res.json({ message: "all users", data: data });
  } catch (error) {
    res.status(503).json({ error: "Internal server error" });
  }
}

module.exports = sendRequest;
