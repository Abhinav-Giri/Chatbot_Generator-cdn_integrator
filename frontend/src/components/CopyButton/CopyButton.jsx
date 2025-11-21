import React, { useState } from "react";
import styles from "./CopyButton.module.css";

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleCopy = async () => {
    setError("");
    if (!text) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        setError("Clipboard not available. Please copy manually.");
      }
    } catch (e) {
      console.error(e);
      setError("Failed to copy. Please copy manually.");
    }
  };

  return (
    <div>
      <button
        type="button"
        className={styles.copyBtn}
        onClick={handleCopy}
        disabled={!text}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      {error && (
        <div style={{ fontSize: "11px", color: "#f97316", marginTop: "4px" }}>
          {error}
        </div>
      )}
    </div>
  );
}
