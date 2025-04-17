const express = require("express");
const mercury = require("@postlight/mercury-parser");

const app = express();

app.get("/parser", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing URL");

  try {
    const result = await mercury.parse(url);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("🚀 Mercury API running at http://localhost:3000/parser?url=...");
});
0
