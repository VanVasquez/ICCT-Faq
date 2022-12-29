require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Faqs = require("./models/faqs");
const faqsRouter = require("./routes/Faqs");
const app = express();

mongoose.set("strictQuery", true);
mongoose.connect(process.env.LOCALHOST);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.get("/", async (req, res) => {
  const faq = await Faqs.find().sort({ createdAt: "desc" });
  res.render("faqs/index", { faqs: faq });
});

app.use("/faqs", faqsRouter);
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/img", express.static(__dirname + "/public/img"));
app.listen(5000);
