const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()

// Connect to Mongo Atlas database
let connectionURL = "mongodb://127.0.0.1:27017";

if ("PORT" in process.env) {
  connectionURL = "mongodb+srv://<username>:<password>@cluster0.5yn7s.mongodb.net/Snacks%20in%20a%20Van?retryWrites=true&w=majority"; 
  connectionURL = connectionURL.replace("<username>",process.env.MONGO_USERNAME).replace("<password>",process.env.MONGO_PASSWORD);
}

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  dbName: "SnacksInAVan",
});

const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to Mongo");
});