"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  // -----------------------------
  // ANALYZE PIPELINE FUNCTION
  // -----------------------------
  const handleAnalyze = async () => {
    if (!repoUrl) return;

    setLoading(true);
    setResult("⏳ Running full pipeline...\nCloning → Scanning → Summarizing...");

    try {
      const res = await fetch("https://autodev-analyst.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl }),
      });

      const data = await res.json();
      if (data.error) {
        setResult("❌ ERROR:\n" + data.error);
      } else {
        const sampleFiles = data.cline_output.files
          .slice(0, 5)
          .map((f: any) => `• ${f.path}`)
          .join("\n");

        setResult(
          `
🚀 Analysis Complete!

📦 Repository: ${data.repo}

📊 Files Analyzed: ${data.cline_output.files.length}
📝 Summary: ${data.cline_output.summary}

⚙️ Kestra Workflow:
${data.kestra_summary}

🧠 Oumi Score:
${data.oumi_score}

📂 Sample Files:
${sampleFiles}
          `
        );
      }
    } catch (err: any) {
      setResult("❌ Network error: " + err.message);
    }

    setLoading(false);
  };

  // -----------------------------
  // FLOATING PARTICLES BACKGROUND
  // -----------------------------
  useEffect(() => {
    const canvas = document.getElementById("particles") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    const particles: any[] = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create 60 floating dots
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.7,
        speedY: (Math.random() - 0.5) * 0.7,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Floating Particles Canvas */}
      <canvas
        id="particles"
        className="absolute inset-0 z-0 opacity-40"
      ></canvas>

      {/* Gradient Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      <div className="absolute w-[700px] h-[700px] bg-blue-600/20 blur-3xl rounded-full -top-40 -left-40"></div>
      <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-3xl rounded-full bottom-0 right-0"></div>

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-10 border border-white/20 animate-fadeIn">

        <h1 className="text-6xl font-extrabold text-center text-blue-400 mb-10 drop-shadow-xl tracking-wide animate-slideDown">
          AutoDev Analyst
        </h1>

        {/* INPUT */}
        <input
          className="border border-white/30 bg-black/30 text-white placeholder-gray-300 px-5 py-3 rounded-xl w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
          placeholder="Paste GitHub Repository URL…"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        {/* BUTTON WITH LOADING ANIMATION */}
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold text-lg shadow-lg transition-all
          ${loading ? "bg-blue-500/50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
          flex items-center justify-center gap-3`}
        >
          {loading ? (
            <>
              <span className="loader h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Analyzing…
            </>
          ) : (
            "Analyze Repo"
          )}
        </button>

        {/* OUTPUT */}
        <pre className="mt-8 bg-black/40 p-6 rounded-xl text-gray-200 text-sm whitespace-pre-wrap border border-white/10 shadow-inner animate-fadeInSlow">
          {result}
        </pre>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.9s ease-out;
        }

        @keyframes fadeInSlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInSlow {
          animation: fadeInSlow 1.2s ease-out;
        }
      `}</style>
    </main>
  );
}
