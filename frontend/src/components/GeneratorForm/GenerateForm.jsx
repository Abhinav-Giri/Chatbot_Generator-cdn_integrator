import React, { useState } from "react";
import styles from "./GeneratorForm.module.css";
import { generateChatbot } from "../../api/client";

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

export default function GeneratorForm({ onGenerated }) {
  const [email, setEmail] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    const trimmedWebsite = websiteUrl.trim();

    if (!trimmedEmail || !trimmedWebsite) {
      setError("Email and Website URL are required.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isValidUrl(trimmedWebsite)) {
      setError("Please enter a valid website URL (http or https).");
      return;
    }

    setLoading(true);

    try {
      const data = await generateChatbot({
        email: trimmedEmail,
        websiteUrl: trimmedWebsite,
      });
      if (onGenerated) {
        onGenerated(data);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate chatbot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.formTitle}>1. Enter your project details</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.fieldGroup}>
          <div className={styles.labelRow}>
            <label className={styles.label} htmlFor="email">
              Email<span className={styles.required}>*</span>
            </label>
            <span className={styles.hint}>Used for identification only.</span>
          </div>
          <input
            id="email"
            type="email"
            className={styles.input}
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.fieldGroup}>
          <div className={styles.labelRow}>
            <label className={styles.label} htmlFor="website">
              Website URL<span className={styles.required}>*</span>
            </label>
            <span className={styles.hint}>Where you’ll embed the script.</span>
          </div>
          <input
            id="website"
            type="url"
            className={styles.input}
            placeholder="https://yourwebsite.com"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.footerRow}>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
          <span className={styles.status}>
            {loading
              ? "Talking to server..."
              : "You’ll get SDN token + script below."}
          </span>
        </div>
      </form>
    </div>
  );
}
