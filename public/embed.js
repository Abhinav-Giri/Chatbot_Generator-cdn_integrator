(function () {
  const current = document.currentScript;
  if (!current) return;

  const sdn = current.getAttribute("data-sdn");
  if (!sdn) {
    console.warn("[Chatbot] Missing data-sdn attribute on embed script.");
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src = "http://localhost:4000/chat?sdn=" + encodeURIComponent(sdn);
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "360px";
  iframe.style.height = "520px";
  iframe.style.border = "none";
  iframe.style.zIndex = "999999";
  iframe.style.borderRadius = "12px";

  document.body.appendChild(iframe);
})();
