import React from "react";
import styles from "./ResultPanel.module.css";
import CopyButton from "../CopyButton/CopyButton";

export default function ResultPanel({ result }) {
  const hasResult = !!result;

  const sdnToken = result?.sdnToken || "";
  const embedScript = result?.embedScript || "";
  const embedJsContent = result?.embedJsContent || "";

  return (
    <div className={styles.card}>
      <h2 className={styles.sectionTitle}>2. Use the generated scripts</h2>
      <p className={styles.sectionSubtitle}>
        Paste the CDN script into your website’s HTML. The <code>embed.js</code>{" "}
        will load a chatbot widget iframe automatically.
      </p>

      {!hasResult && (
        <p className={styles.placeholder}>
          Once you generate, your SDN token, embed snippet, and{" "}
          <code>embed.js</code> code will appear here.
        </p>
      )}

      {hasResult && (
        <>
          {/* SDN Token */}
          <div style={{ marginBottom: "12px" }}>
            <div className={styles.codeHeader}>
              <span className={styles.badge}>SDN Token</span>
            </div>
            <div className={styles.codeBlock}>
              <span className={styles.tokenValue}>{sdnToken}</span>
            </div>
          </div>

          {/* Embed Script */}
          <div style={{ marginBottom: "12px" }}>
            <div className={styles.codeHeader}>
              <span className={styles.badge}>CDN Embed Script</span>
              <CopyButton text={embedScript} />
            </div>
            <div className={styles.codeBlock}>
              <code>{embedScript}</code>
            </div>
          </div>

          {/* embed.js content */}
          <div>
            <div className={styles.codeHeader}>
              <span className={styles.badge}>embed.js content</span>
              <CopyButton text={embedJsContent} />
            </div>
            <div className={styles.codeBlock}>
              <code>{embedJsContent}</code>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
