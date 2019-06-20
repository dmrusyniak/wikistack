const express = require("express");
const router = express.Router();
const wikipage = require("../views/wikipage");
const { db, User, Page } = require("../models");
const addPage = require("../views/addPage");

const slugger = title => {
  return title.replace(/\s+/g, "_").replace(/\W/g, "");
};

router.get("/", (req, res) => res.send(wikipage("")));

router.post("/", async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    slug: slugger(req.body.title)
  });

  console.log(req.body);
  console.log(slugger(req.body.title));

  try {
    await page.save();
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res) => res.send(addPage()));

module.exports = router;
