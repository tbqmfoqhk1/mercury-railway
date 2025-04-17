const express = require("express");
const mercury = require("@postlight/mercury-parser");
const got = require("got");
const app = express();

app.get("/parser", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: true, message: "Missing URL" });

  try {
    // 👇 got으로 HTML 직접 가져오기 (헤더 우회)
    const html = await got(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml"
      },
      timeout: 5000
    }).text();

    // 👇 Mercury에 HTML과 함께 넘겨줘서 파싱
    const result = await mercury.parse(url, { html });

    res.json(result);
  } catch (err) {
    console.error("❌ Failed to fetch article:", err.message);
    res.status(500).json({ error: true, message: err.message });
  }
});

app.listen(3000, () => {
  console.log("✅ Mercury Parser running at http://localhost:3000/parser?url=...");
});

