"use client";

import { useState } from "react";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setResult("Running analysis using Cline + Kestra + Oumi...");

    // Simulated result for now (we replace this later)
    setTimeout(() => {
      setResult(`
✅ Repository analyzed successfully  
- Cline Agent: Code scan completed  
- Kestra Workflow: Summary generated  
- Oumi: Evaluation score: 8.5/10  
`);
      setLoading(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">
        AutoDev Analyst
      </h1>

      <input
        className="border px-4 py-2 rounded w-full max-w-xl mb-4"
        placeholder="Enter GitHub repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      <button
        onClick={handleAnalyze}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Analyzing..." : "Analyze Repo"}
      </button>

      <pre className="mt-6 bg-gray-100 p-4 rounded w-full max-w-2xl text-sm whitespace-pre-wrap">
        {result}
      </pre>
    </main>
  );
}
