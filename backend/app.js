// Imports
const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const socketIo = require("socket.io");
const http = require("http");
const vanRoute = require("./routes/api/van/van.route");
const menuRouter = require("./routes/api/customer/menu.router");
const accountRoute = require("./routes/api/customer/account.route");
const globalsRoute = require("./routes/api/globals.route");
require("./models");
const logger = require("./middleware/logger");
const authenticateSocket = require("./middleware/authenticate.socket");
const origins = [
  "http://localhost:5000",
  "https://snacks-in-a-van.netlify.app",
  /https:\/\/.*snacks-in-a-van\.netlify\.app/,
  "http://localhost:3000",
  "http://localhost:3006",
];

const app = express();
dotenv.config();
// Allow access from the appropriate front end sites
const corsOptions = {
  origin: origins,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;
// Use middleware
app.use(logger);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
// Allows all html / css files in frontend to be used as a path
app.use(express.static(path.join(__dirname, "client/build")));

// Routes (Note orders are handled by socket connection below)
app.use("/api/menu", menuRouter);
app.use("/api/van", vanRoute);
app.use("/api/auth", accountRoute);
app.use("/api/globals", globalsRoute);

// Set up a socket for live updating
// Based on tutorial from:
// https://www.valentinog.com/blog/socket-react/

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: origins,
  },
});
io.use(authenticateSocket);
require("./controllers/order.socket.controller.js")(io);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

server.listen(PORT, () => {
  console.log(`Snacks in a Van app is listening on port ${PORT}`);
});

module.exports = app;
