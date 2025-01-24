import express from "express";
import router from "./routes/url.routes.js";
import path from "path";
import { connectDb } from "./db/connect.js";
import { Url } from "./model/url.model.js";
import statiRoute from "./routes/static.route.js"
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb().then(() => {
  console.log("MongoDb Connected!!!");
});
app.use("/", statiRoute)
app.use("/api/url", router);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const entry = await Url.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!entry) {
      return res.status(404).send("URL not found");
    }

    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error finding or updating URL:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/test/home", (req, res) => {
  return res.render("home",{
    vari: "hello from server"
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
