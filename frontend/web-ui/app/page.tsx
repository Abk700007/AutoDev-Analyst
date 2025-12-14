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

      {/* 1️⃣ BACKGROUND GRADIENT (z-0 lowest) */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 z-0"></div>

      {/* 2️⃣ PARTICLES (z-10) */}
      <canvas
        id="particles"
        className="absolute inset-0 z-10 opacity-40"
      ></canvas>

      {/* 3️⃣ AI WAVES (z-20) */}
      <div className="absolute inset-0 z-20 overflow-hidden opacity-40 pointer-events-none">
        <svg className="absolute bottom-0 w-[300%] animate-waveSlow" viewBox="0 0 1200 120">
          <path
            d="M0,0 C150,100 450,-100 600,0 C750,100 1050,-100 1200,0 L1200,120 L0,120 Z"
            fill="url(#grad1)"
            opacity="0.35"
          ></path>
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Glow blobs */}
      <div className="absolute w-[700px] h-[700px] bg-blue-600/20 blur-3xl rounded-full -top-40 -left-40 z-0"></div>
      <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-3xl rounded-full bottom-0 right-0 z-0"></div>

      {/* 4️⃣ MAIN CARD (z-30 top) */}
      <div className="relative z-30 w-full max-w-3xl bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-10 border border-white/20 animate-fadeIn">

        <h1 className="text-6xl font-extrabold text-center text-blue-400 mb-10 drop-shadow-xl tracking-wide animate-slideDown">
          AutoDev Analyst
        </h1>

        <input
          className="border border-white/30 bg-black/30 text-white placeholder-gray-300 px-5 py-3 rounded-xl w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
          placeholder="Paste GitHub Repository URL…"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

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

        <pre className="mt-8 bg-black/40 p-6 rounded-xl text-gray-200 text-sm whitespace-pre-wrap border border-white/10 shadow-inner animate-fadeInSlow">
          {result}
        </pre>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.9s ease-out; }

        @keyframes fadeInSlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInSlow { animation: fadeInSlow 1.2s ease-out; }

        @keyframes waveSlow {
          from { transform: translateX(0); }
          to { transform: translateX(-33.3%); }
        }
        .animate-waveSlow { animation: waveSlow 12s linear infinite; }
      `}</style>
    </main>
  );
}
