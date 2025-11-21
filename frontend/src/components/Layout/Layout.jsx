import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>Chatbot Embed Script Generator</h1>
        <p className={styles.subtitle}>
          Enter your email and website URL, and we’ll generate a unique SDN
          token, CDN embed script, and <code>embed.js</code> content for you.
        </p>
      </header>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
