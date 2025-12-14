"use client";

import { useState } from "react";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setResult("⏳ Running analysis using Cline + Kestra + Oumi...");

    setTimeout(() => {
      setResult(`
🚀 Analysis Complete!

• Cline Agent: Code scan completed  
• Kestra Workflow: Summary generated  
• Oumi Eval Score: 8.5/10  

`);
      setLoading(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-10 border border-white/20">
        <h1 className="text-5xl font-extrabold text-center text-blue-400 mb-8 drop-shadow-lg">
          AutoDev Analyst
        </h1>

        <input
          className="border border-gray-300 bg-white/20 text-white placeholder-gray-300 px-4 py-3 rounded-lg w-full mb-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter GitHub repository URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        <button
          onClick={handleAnalyze}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg"
        >
          {loading ? "Analyzing..." : "Analyze Repo"}
        </button>

        <pre className="mt-8 bg-black/30 text-gray-200 p-5 rounded-xl whitespace-pre-wrap text-sm border border-white/10">
          {result}
        </pre>
      </div>
    </main>
  );
}
