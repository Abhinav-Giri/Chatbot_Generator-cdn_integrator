const express = require("express");
const router = express.Router();
const { generateSdnToken } = require("../utils/token");

function isValidEmail(email) {
  if (!email) return false;
  const trimmed = email.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(trimmed);
}

function isValidUrl(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

router.post("/generate-chatbot", (req, res) => {
  try {
    const { email, websiteUrl } = req.body || {};

    if (!email || !websiteUrl) {
      return res.status(400).json({
        error: "Email and Website URL are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    if (!isValidUrl(websiteUrl)) {
      return res.status(400).json({
        error: "Invalid website URL",
      });
    }

    const sdnToken = generateSdnToken();

    const CDN_BASE_URL =
      process.env.CDN_BASE_URL || "http://localhost:4000";
    const WIDGET_BASE_URL =
      process.env.WIDGET_BASE_URL || "http://localhost:4000";

    const embedScript = `<script src="${CDN_BASE_URL}/embed.js" data-sdn="${sdnToken}" async></script>`;

    const embedJsContent = `(function () {
  const sdn = document.currentScript.getAttribute("data-sdn");
  const iframe = document.createElement("iframe");
  iframe.src = "${WIDGET_BASE_URL}/chat?sdn=" + encodeURIComponent(sdn);
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "360px";
  iframe.style.height = "520px";
  iframe.style.border = "none";
  iframe.style.zIndex = "999999";
  iframe.style.borderRadius = "12px";
  document.body.appendChild(iframe);
})();`;

    // Could store email + website + sdn in DB here for tracking

    return res.status(200).json({
      sdnToken,
      embedScript,
      embedJsContent,
      widgetPreviewUrl: `${WIDGET_BASE_URL}/chat?sdn=${encodeURIComponent(
        sdnToken
      )}`,
    });
  } catch (err) {
    console.error("Error in /generate-chatbot:", err);
    return res.status(500).json({
      error: "Internal server error. Please try again later.",
    });
  }
});

module.exports = router;
