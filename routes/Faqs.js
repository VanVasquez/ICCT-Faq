const express = require("express");
const Faqs = require("./../models/faqs");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("faqs/new", { faqs: new Faqs() });
});

router.post("/", async (req, res) => {
  let faq = new Faqs({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    faq = await faq.save();
    res.redirect("/");
  } catch (e) {
    res.render("faqs/new", { faqs: faq });
  }
});
router.delete("/:id", async (req, res) => {
  await Faqs.findByIdAndDelete(req.params.id);
  res.redirect("/");
});
module.exports = router;
