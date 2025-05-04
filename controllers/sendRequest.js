const { PrismaClient } = require("../prisma/generated/prisma/client");
const prisma = new PrismaClient();

async function sendRequest(req, res) {
  const { requestId } = req.body;

  try {
    const data = await prisma.requests.create({
      data: {
        userAID: "29702e8f-5b0d-4cd0-9c52-24005008d084",
        userBID: requestId,
      },
    });

    res.json({ message: "all users", data: data });
  } catch (error) {
    res.status(503).json({ error: "Internal server error" });
  }
}

module.exports = sendRequest;
