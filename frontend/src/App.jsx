import React, { useState } from "react";
import styles from "./App.module.css";
import Layout from "./components/Layout/Layout";
import GeneratorForm from "./components/GeneratorForm/GenerateForm";
import ResultPanel from "./components/ResultPanel/ResultPanel";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className={styles.appRoot}>
      <div className={styles.appContainer}>
        <Layout>
          <GeneratorForm onGenerated={setResult} />
          <ResultPanel result={result} />
        </Layout>
      </div>
    </div>
  );
}

export default App;
