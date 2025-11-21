import crypto from "crypto";

function generateSdnToken() {
  const random = crypto.randomBytes(4).toString("hex");
  return `sdn_${random}`;
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, websiteUrl } = req.body || {};

  if (!email || !websiteUrl) {
    return res.status(400).json({
      error: "Email and Website URL are required",
    });
  }

  const trimmedEmail = email.trim();
  const trimmedWebsite = websiteUrl.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  try {
    new URL(trimmedWebsite);
  } catch {
    return res.status(400).json({ error: "Invalid Website URL" });
  }

  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const sdnToken = generateSdnToken();

  const CDN_URL = process.env.CDN_URL || "https://your-app.vercel.app";
  const WIDGET_URL = CDN_URL;

  const embedScript = `<script src="${CDN_URL}/embed.js" data-sdn="${sdnToken}" async></script>`;

  const embedJsContent = `(function () {
  const sdn = document.currentScript.getAttribute("data-sdn");
  const iframe = document.createElement("iframe");
  iframe.src = "${WIDGET_URL}/chat?sdn=" + encodeURIComponent(sdn);
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

  return res.status(200).json({
    sdnToken,
    embedScript,
    embedJsContent,
    widgetPreviewUrl: `${WIDGET_URL}/chat?sdn=${sdnToken}`,
  });
}
