// app.js
const express = require('express');
const app = express();jbjbb/jlb/l
const port = process.env.PORT || 3000;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Beautiful Animated Landing</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<style>
  /* Google-style system font stack fallback; no external fonts required */
  :root{
    --bg1: #0f172a;
    --accent1: #7c3aed;
    --accent2: #06b6d4;
    --glass: rgba(255,255,255,0.06);
    --muted: rgba(255,255,255,0.7);
  }
  *{box-sizing:border-box}
  html,body,#root{height:100%}
  body{
    margin:0;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: linear-gradient(135deg,var(--bg1) 0%, #071024 100%);
    color: white;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    overflow-x:hidden;
  }

  /* particle canvas sits behind */
  canvas#particles {
    position:fixed;
    inset:0;
    z-index:0;
    pointer-events:none;
  }

  /* Hero layout */
  .hero{
    position:relative;
    min-height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:4rem 2rem;
    z-index:1;
    overflow:hidden;
    text-align:center;
  }

  .container{
    max-width:1100px;
    width:100%;
    display:grid;
    grid-template-columns: 1fr;
    gap:2rem;
    align-items:center;
  }

  .card {
    background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
    border-radius:18px;
    padding:2rem;
    box-shadow: 0 10px 30px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
    backdrop-filter: blur(6px) saturate(120%);
    border: 1px solid rgba(255,255,255,0.04);
  }

  .row{
    display:flex;
    gap:2rem;
    flex-wrap:wrap;
    justify-content:center;
  }

  h1{
    margin:0 0 .5rem 0;
    font-size: clamp(1.8rem, 4.8vw, 3.4rem);
    letter-spacing:-0.02em;
    line-height:1.02;
    text-shadow: 0 6px 30px rgba(124,58,237,0.18);
  }
jlb
  .subtitle{
    margin:0 auto 1.4rem auto;
    color:var(--muted);
    max-width:750px;ljbjllb
    font-size: clamp(1rem, 1.9vw, 1.125rem);
  }

  .cta{
    display:inline-flex;
    gap:.75rem;
    align-items:center;
    background:linear-gradient(90deg,var(--accent1),var(--accent2));
    border:none;
    color:white;
    padding:.9rem 1.25rem;
    border-radius:12px;
    font-weight:600;
    cursor:pointer;
    box-shadow: 0 8px 30px rgba(12,7,59,0.45);
    transform: translateY(0);
    transition: transform .18s ease, box-shadow .18s ease, opacity .12s;
  }
  .cta:hover{ transform: translateY(-4px); box-shadow: 0 18px 40px rgba(12,7,59,0.55); }

  .ghost {
    background:transparent;
    border:1px solid rgba(255,255,255,0.06);
    color:var(--muted);
    padding:.75rem 1rem;
    border-radius:10px;
    cursor:pointer;
  }

  /* Animated floating blobs */
  .blobs{
    position:absolute;
    inset: -10% -10% auto auto;
    width:100%;
    height:100%;
    pointer-events:none;
    z-index:0;
    overflow:visible;
  }
  .blob{
    position:absolute;
    filter: blur(40px) saturate(120%);
    opacity:.9;
    mix-blend-mode:screen;
    transform-origin:center;
    will-change:transform;
  }

  /* cards section */
  .features{
    display:grid;
    grid-template-columns: repeat(auto-fit,minmax(220px,1fr));
    gap:1.2rem;
    margin-top: 1.5rem;
  }
  .feature{
    padding:1.2rem;
    border-radius:14px;
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    transition: transform .24s cubic-bezier(.2,.9,.3,1), box-shadow .24s;
    border:1px solid rgba(255,255,255,0.03);
  }
  .feature:hover{ transform: translateY(-10px) rotate(-0.4deg); box-shadow: 0 20px 40px rgba(2,6,23,0.6); }

  .feature h3{ margin:.2rem 0 .6rem 0; font-size:1.05rem; }
  .feature p{ margin:0; color:var(--muted); font-size:.95rem; line-height:1.4; }

  /* footer */
  footer{
    margin-top:1.8rem;
    color:rgba(255,255,255,0.5);
    font-size:.9rem;
    text-align:center;
  }

  /* decorated hero image */
  .hero-decor{
    display:flex;
    justify-content:center;
    align-items:center;
    gap:1rem;
  }

  /* tiny typewriter */
  .typewriter{
    display:inline-block;
    position:relative;
    overflow:hidden;
    white-space:nowrap;
    border-right: 2px solid rgba(255,255,255,0.12);
    animation: blink 1s infinite step-end;
  }
  @keyframes blink{ 50% { border-color: transparent } }

  /* responsive */
  @media (min-width:900px){
    .container{ grid-template-columns: 1fr 420px; align-items:center; text-align:left; }
    .hero{ padding:6rem; }
    .card{ padding:3rem; border-radius:22px; }
  }

  /* subtle entrance */
  .reveal{ opacity:0; transform: translateY(12px) scale(.998); animation: reveal .9s forwards cubic-bezier(.16,.82,.24,1); }
  .reveal.delay1{ animation-delay:.12s }
  .reveal.delay2{ animation-delay:.24s }
  @keyframes reveal { to { opacity:1; transform:none } }

  /* confetti pieces */
  .confetti-piece {
    position:fixed;
    width:10px;
    height:14px;
    opacity:0.95;
    pointer-events:none;
    transform-origin:center;
    z-index:9999;
    border-radius:2px;
  }

</style>
</head>
<body>
<canvas id="particles"></canvas>

<section class="hero" aria-labelledby="main-title">
  <div class="container">
    <main class="card reveal">
      <h1 id="main-title">Hello from Jenkins — <span style="color:var(--accent1)">Your App</span></h1>
      <p class="subtitle reveal delay1">
        <span class="typewriter" id="typewriter">Fast. Reliable. Beautifully deployed.</span>
      </p>

      <div style="display:flex;gap:1rem;justify-content:center" class="reveal delay2">
        <button class="cta" id="deployBtn" aria-label="Deploy now">
          🚀 Deploy now
        </button>
        <button class="ghost" id="learnBtn">Learn more</button>
      </div>

      <div class="features" style="margin-top:1.5rem" role="list">
        <div class="feature" role="listitem">
          <h3>Instant feedback</h3>
          <p>View logs, live builds and get real-time deployment status integrated with your CI/CD.</p>
        </div>
        <div class="feature" role="listitem">
          <h3>Beautiful UI</h3>
          <p>Smooth animations, responsive design and a pleasant developer experience—made to be loved.</p>
        </div>
        <div class="feature" role="listitem">
          <h3>Secure by default</h3>
          <p>Credentials, secrets and environment management done the right way for production.</p>
        </div>
      </div>

      <footer>
        <small>Made with ♥ by your friendly CI. Try the deploy button for a burst of confetti ✨</small>
      </footer>
    </main>

    <aside class="card hero-decor reveal delay1" aria-hidden="true">
      <!-- decorative illustration built with SVG -->
      <svg width="360" height="300" viewBox="0 0 360 300" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stop-color="#7c3aed"/>
            <stop offset="1" stop-color="#06b6d4"/>
          </linearGradient>
        </defs>

        <rect x="6" y="10" rx="18" width="320" height="220" fill="url(#g1)" opacity="0.12"></rect>

        <!-- stylized terminal -->
        <g transform="translate(20,20)">
          <rect x="0" y="0" width="260" height="140" rx="12" fill="rgba(3,7,18,0.7)" stroke="rgba(255,255,255,0.04)"/>
          <!-- status lights -->
          <circle cx="12" cy="12" r="4" fill="#ff7b7b" />
          <circle cx="28" cy="12" r="4" fill="#ffd57b" />
          <circle cx="44" cy