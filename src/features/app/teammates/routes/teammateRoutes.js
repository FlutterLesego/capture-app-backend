import express from "express";
import { Teammate } from "../model/teammateModel.js";

const router = express.Router();

// GET all teammates
router.get("/", async (req, res, next) => {
  try {
    const teammates = await Teammate.findAll();
    res.json(teammates);
  } catch (err) {
    next(err);
  }
});

// GET teammate by ID
router.get("/:id", async (req, res, next) => {
  try {
    const teammate = await Teammate.findByPk(req.params.id);
    if (!teammate) return res.status(404).json({ error: "Not found" });
    res.json(teammate);
  } catch (err) {
    next(err);
  }
});

// POST create teammate
router.post("/", async (req, res, next) => {
  try {
    const teammate = await Teammate.create(req.body);
    res.status(201).json(teammate);
  } catch (err) {
    next(err);
  }
});

// PUT update teammate
router.put("/:id", async (req, res, next) => {
  try {
    const teammate = await Teammate.findByPk(req.params.id);
    if (!teammate) return res.status(404).json({ error: "Not found" });

    await teammate.update(req.body);
    res.json(teammate);
  } catch (err) {
    next(err);
  }
});

// DELETE teammate
router.delete("/:id", async (req, res, next) => {
  try {
    const teammate = await Teammate.findByPk(req.params.id);
    if (!teammate) return res.status(404).json({ error: "Not found" });

    await teammate.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
