require("dotenv").config();
const app = require("./app");

app.listen(process.env.LOCAL_PORT, () => {
  console.log(`Server started at port ${process.env.LOCAL_PORT}`);
});
