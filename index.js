const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const roomRoute = require("./routes/roomRoute");
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");
const agentRoute = require("./routes/agentRoute");
const happyClientRoute = require("./routes/happyClientRoute");
const handleError = require("./middleware/handleError");
const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGODB_CONNECT_URI, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

// express.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json());
app.use(express.static("uploads")); //direct accessible now
app.use(cors());

app.use(userRoute);
app.use(roomRoute);
app.use(blogRoute);
app.use(agentRoute);
app.use(happyClientRoute);

app.use(handleError);

app.use((req, res) => {
  res.status(404).send({ msg: "resource/page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Listenning to port 8000");
});
