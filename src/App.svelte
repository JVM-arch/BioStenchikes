<script>
  import Header from './lib/Header.svelte';
  import CodeEditor from './lib/CodeEditor.svelte';
  import Skills from './lib/Skills.svelte';
  import Weather from './lib/Weather.svelte';
  import Snow from './lib/Snow.svelte';
  import AdminPanel from './lib/AdminPanel.svelte';
  import { onMount } from 'svelte';

  const animationOptions = {
    nick: [
      'none','pulse','glitch','slide','fade','rise','neon','bounce','tilt','blur',
      'pop','wobble','flicker','scan','wave','spark','shadow','zoom','flow','swirl'
    ],
    avatar: [
      'none','pulse','glow','float','rotate','tilt','wiggle','bounce','pop','flip',
      'scan','flicker','shadow','zoom','orbit','drift','wobble','spark','shimmer','sway'
    ],
    tagline: [
      'none','fade','slide','rise','glow','type','wave','bounce','tilt','blur',
      'flicker','underline','highlight','shadow','pulse','scan','spark','shimmer','pop','glitch'
    ],
    background: [
      'bg-none','bg-aurora','bg-grid','bg-lines','bg-waves','bg-pulse','bg-stars','bg-drift','bg-rings','bg-noise',
      'bg-radial','bg-glow','bg-diag','bg-mesh','bg-lights','bg-scan','bg-sparks','bg-stripes','bg-dots','bg-orbit'
    ]
  };

  const themeOptions = ['dark', 'midnight', 'apple-light', 'apple-dark', 'slate'];

  const defaultProfile = {
    nickname: 'Stenchikes',
    tagline: 'VFX Artist & Developer',
    status: 'Online',
    bannerSrc: '/src/assets/willow-banner.jpg',
    avatarSrc: '/src/assets/avatar.jpg',
    nickAnim: 'glitch',
    avatarAnim: 'none',
    taglineAnim: 'fade',
    backgroundAnim: 'bg-aurora',
    theme: 'dark',
    backgroundImage: '',
    bgPlacement: 'center',
    socials: [
      { label: 'GitHub', url: 'https://github.com' },
      { label: 'Telegram', url: 'https://t.me' }
    ],
    skills: [
      {
        icon: '🧩',
        name: 'Minecraft',
        color: 'green',
        skills: [
          { name: 'Plugin Dev', level: 4.5 },
          { name: 'Spigot API', level: 4 },
          { name: 'Server Core', level: 3.5 }
        ]
      },
      {
        icon: '💻',
        name: 'Coding',
        color: 'orange',
        skills: [
          { name: 'Java', level: 1.5 },
          { name: 'OOP', level: 1 },
          { name: 'Basics', level: 2 }
        ]
      },
      {
        icon: '🎨',
        name: 'Design',
        color: 'pink',
        skills: [
          { name: 'Figma', level: 4 },
          { name: 'Photoshop', level: 4 },
          { name: 'Cinema 4D', level: 3.5 }
        ]
      },
      {
        icon: '🌐',
        name: 'Languages',
        color: 'blue',
        skills: [
          { name: 'English', level: 3 }
        ]
      }
    ]
  };

  let profile = { ...defaultProfile };

  const STORAGE_KEY = 'bio-admin-profile';

  onMount(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        profile = { ...defaultProfile, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load profile from storage', e);
    }
  });

  $: persistProfile(profile);
  $: applyTheme(profile.theme);

  function persistProfile(value) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (e) {
      console.warn('Failed to persist profile', e);
    }
  }

  function handleProfileUpdate(event) {
    profile = { ...profile, ...event.detail };
  }

  function applyTheme(theme) {
    if (typeof document === 'undefined') return;
    document.body.classList.remove('theme-dark','theme-midnight','theme-apple-light','theme-apple-dark','theme-slate');
    document.body.classList.add(`theme-${theme}`);
  }

  onMount(() => {
    // Create particles
    const container = document.createElement('div');
    container.className = 'particles';
    document.body.appendChild(container);

    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 5 + 's';
      p.style.animationDuration = (3 + Math.random() * 4) + 's';
      container.appendChild(p);
    }
  });
</script>

<div class={`bg-gradient ${profile.backgroundAnim}`} style={`background-image:${profile.backgroundImage ? `url(${profile.backgroundImage})` : 'none'}`}></div>
{#if profile.backgroundImage}
  <div class={`bg-photo ${profile.bgPlacement}`} style={`background-image:url(${profile.backgroundImage})`}></div>
{/if}
<Snow />

<main class="container">
  <Header
    nickname={profile.nickname}
    tagline={profile.tagline}
    status={profile.status}
    bannerSrc={profile.bannerSrc}
    avatarSrc={profile.avatarSrc}
    nickAnim={profile.nickAnim}
    avatarAnim={profile.avatarAnim}
    taglineAnim={profile.taglineAnim}
    skills={profile.skills}
    socials={profile.socials}
  />
  <CodeEditor />
  <Weather />
  <Skills skills={profile.skills} />
</main>

<AdminPanel
  {profile}
  {animationOptions}
  {themeOptions}
  on:update={handleProfileUpdate}
/>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(:root) {
    --bg-primary: #000000;
    --bg-secondary: #050505;
    --bg-card: rgba(10, 10, 10, 0.6); /* Semi-transparent for glass effect */
    --accent: #6366f1;
    --accent-glow: rgba(99, 102, 241, 0.12);
    --text-primary: #ffffff;
    --text-secondary: #888888;
    --text-muted: #555555;
    --border-color: rgba(255, 255, 255, 0.1); /* Lighter border for glass edge */
  }

  :global(body.theme-dark) {
    --bg-primary: #000;
    --bg-secondary: #050505;
    --bg-card: rgba(10,10,10,0.6);
    --accent: #6366f1;
    --accent-glow: rgba(99,102,241,0.12);
    --text-primary: #fff;
    --text-secondary: #a0a0a0;
    --text-muted: #666;
    --border-color: rgba(255,255,255,0.1);
  }

  :global(body.theme-midnight) {
    --bg-primary: #0b0f1a;
    --bg-secondary: #0f1424;
    --bg-card: rgba(12, 18, 32, 0.72);
    --accent: #7dd3fc;
    --accent-glow: rgba(125, 211, 252, 0.15);
    --text-primary: #e5f0ff;
    --text-secondary: #9bb4d1;
    --text-muted: #6c7b92;
    --border-color: rgba(255, 255, 255, 0.08);
  }

  :global(body.theme-apple-light) {
    --bg-primary: #f5f5f7;
    --bg-secondary: #ffffff;
    --bg-card: rgba(255, 255, 255, 0.8);
    --accent: #0071e3;
    --accent-glow: rgba(0, 113, 227, 0.12);
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --text-muted: #94a3b8;
    --border-color: rgba(15, 23, 42, 0.08);
  }

  :global(body.theme-apple-dark) {
    --bg-primary: #0d0d0f;
    --bg-secondary: #111114;
    --bg-card: rgba(22, 22, 26, 0.75);
    --accent: #0a84ff;
    --accent-glow: rgba(10, 132, 255, 0.14);
    --text-primary: #f5f5f7;
    --text-secondary: #c1c4cb;
    --text-muted: #7d7f87;
    --border-color: rgba(255, 255, 255, 0.08);
  }

  :global(body.theme-slate) {
    --bg-primary: #0f172a;
    --bg-secondary: #111827;
    --bg-card: rgba(17, 24, 39, 0.8);
    --accent: #22d3ee;
    --accent-glow: rgba(34, 211, 238, 0.14);
    --text-primary: #e2e8f0;
    --text-secondary: #a5b4fc;
    --text-muted: #64748b;
    --border-color: rgba(148, 163, 184, 0.12);
  }

  :global(body) {
    font-family: 'Inter', sans-serif;
    background: var(--bg-primary);
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 30px 16px;
    color: var(--text-primary);
    overflow-x: hidden;
    transition: background 0.3s ease, color 0.3s ease;
  }

  /* Blue and black gradient background with glitch effect */
  .bg-gradient {
    position: fixed;
    inset: 0;
    background: 
      radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 80%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
      #000000;
    animation: gradientMove 20s ease-in-out infinite;
    pointer-events: none;
    z-index: -1;
  }

  .bg-gradient::before {
    content: '';
    position: fixed;
    inset: 0;
    background: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(99, 102, 241, 0.03) 2px,
        rgba(99, 102, 241, 0.03) 4px
      );
    animation: glitchBackground 8s linear infinite;
    pointer-events: none;
    z-index: -1;
  }

  .bg-gradient::after {
    content: '';
    position: fixed;
    inset: 0;
    background: 
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 2px,
        rgba(255, 0, 64, 0.02) 2px,
        rgba(255, 0, 64, 0.02) 4px
      );
    animation: glitchBackground 6s linear infinite reverse;
    pointer-events: none;
    z-index: -1;
  }

  /* Background variants (20 incl none) */
  .bg-gradient.bg-aurora {
    background:
      radial-gradient(ellipse at 20% 30%, rgba(99,102,241,0.12), transparent 45%),
      radial-gradient(ellipse at 80% 70%, rgba(236,72,153,0.12), transparent 45%),
      #020202;
  }

  .bg-gradient.bg-grid::before {
    background:
      linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 24px 24px, 24px 24px;
    animation: floatGrid 18s linear infinite;
  }

  .bg-gradient.bg-lines::after {
    background: repeating-linear-gradient(120deg, rgba(99,102,241,0.1), rgba(99,102,241,0.1) 2px, transparent 4px, transparent 10px);
    animation: driftLines 14s linear infinite;
  }

  .bg-gradient.bg-waves::before {
    background: radial-gradient(circle at 50% 50%, rgba(99,102,241,0.12), transparent 45%);
    animation: wavePulse 12s ease-in-out infinite;
  }

  .bg-gradient.bg-pulse { animation: bgPulse 12s ease-in-out infinite; }

  .bg-gradient.bg-stars::before {
    background: radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.8), transparent),
                radial-gradient(1px 1px at 30% 80%, rgba(255,255,255,0.7), transparent),
                radial-gradient(1.5px 1.5px at 70% 40%, rgba(255,255,255,0.9), transparent);
    animation: twinkleBg 8s linear infinite;
  }

  .bg-gradient.bg-drift::after {
    background: radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.04), transparent 60%);
    animation: drift 20s linear infinite;
  }

  .bg-gradient.bg-rings::before {
    background:
      radial-gradient(circle at 50% 50%, rgba(99,102,241,0.16) 0, transparent 30%),
      radial-gradient(circle at 50% 50%, transparent 28%, rgba(99,102,241,0.12) 32%, transparent 36%);
    animation: rotate 20s linear infinite;
  }

  .bg-gradient.bg-noise::after {
    background: repeating-linear-gradient(0deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 2px, transparent 4px, transparent 6px);
    mix-blend-mode: overlay;
    animation: noise 2s steps(6) infinite;
  }

  .bg-gradient.bg-radial {
    background:
      radial-gradient(circle at 50% 30%, rgba(59,130,246,0.2), transparent 45%),
      radial-gradient(circle at 30% 70%, rgba(236,72,153,0.15), transparent 45%),
      #010101;
  }

  .bg-gradient.bg-glow::before {
    background: radial-gradient(circle at 60% 40%, rgba(255,255,255,0.08), transparent 55%);
    animation: glow 10s ease-in-out infinite;
  }

  .bg-gradient.bg-diag::after {
    background: repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 2px, transparent 8px, transparent 14px);
    animation: driftLines 16s linear infinite;
  }

  .bg-gradient.bg-mesh {
    background:
      radial-gradient(ellipse at 20% 20%, rgba(34,197,94,0.12), transparent 40%),
      radial-gradient(ellipse at 80% 30%, rgba(59,130,246,0.14), transparent 40%),
      radial-gradient(ellipse at 50% 80%, rgba(236,72,153,0.14), transparent 40%),
      #020202;
  }

  .bg-gradient.bg-lights::before {
    background: radial-gradient(circle at 25% 30%, rgba(255,255,255,0.15), transparent 35%);
    animation: moveLights 14s ease-in-out infinite;
  }

  .bg-gradient.bg-scan::after {
    background: linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.12) 50%, transparent 100%);
    animation: scanlineVert 6s linear infinite;
  }

  .bg-gradient.bg-sparks::before {
    background:
      radial-gradient(2px 2px at 20% 20%, rgba(255,255,255,0.9), transparent),
      radial-gradient(2px 2px at 60% 50%, rgba(255,255,255,0.9), transparent),
      radial-gradient(2px 2px at 80% 80%, rgba(255,255,255,0.9), transparent);
    animation: sparkle 3s ease-in-out infinite;
  }

  .bg-gradient.bg-stripes::after {
    background: repeating-linear-gradient(90deg, rgba(99,102,241,0.08) 0 6px, transparent 6px 14px);
    animation: moveStripes 10s linear infinite;
  }

  .bg-gradient.bg-dots::before {
    background: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    animation: drift 18s linear infinite;
  }

  .bg-gradient.bg-orbit::before {
    background:
      radial-gradient(circle at 50% 50%, rgba(99,102,241,0.15) 0, transparent 35%),
      radial-gradient(circle at 50% 50%, transparent 33%, rgba(99,102,241,0.1) 36%, transparent 40%);
    animation: rotate 24s linear infinite;
  }

  .bg-gradient.bg-none::before,
  .bg-gradient.bg-none::after {
    display: none;
    animation: none;
  }

  .bg-photo {
    position: fixed;
    width: 320px;
    height: 320px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.55;
    filter: saturate(0.95) contrast(1.05);
    mix-blend-mode: screen;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.45);
    z-index: 0;
    pointer-events: none;
  }

  .bg-photo.top-left { top: 32px; left: 32px; }
  .bg-photo.top-right { top: 32px; right: 32px; }
  .bg-photo.bottom-left { bottom: 32px; left: 32px; }
  .bg-photo.bottom-right { bottom: 32px; right: 32px; }
  .bg-photo.center { top: 50%; left: 50%; transform: translate(-50%, -50%); }

  @keyframes gradientMove {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes glitchBackground {
    0% { transform: translateX(0); opacity: 0.5; }
    50% { transform: translateX(2px); opacity: 0.8; }
    100% { transform: translateX(0); opacity: 0.5; }
  }

  @keyframes floatGrid { from { background-position: 0 0, 0 0; } to { background-position: 40px 30px, 30px 40px; } }
  @keyframes driftLines { from { background-position: 0 0; } to { background-position: 200px 200px; } }
  @keyframes wavePulse { 0%,100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.05); opacity: 0.85; } }
  @keyframes bgPulse { 0%,100% { filter: brightness(1); } 50% { filter: brightness(1.08); } }
  @keyframes twinkleBg { 0%,100% { opacity: 0.4; } 50% { opacity: 0.9; } }
  @keyframes noise { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(10deg); } }
  @keyframes glow { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
  @keyframes moveLights { 0%,100% { transform: translate(0,0); } 50% { transform: translate(8px, -6px); } }
  @keyframes scanlineVert { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
  @keyframes sparkle { 0%,100% { opacity: 0.2; } 50% { opacity: 0.8; } }
  @keyframes moveStripes { from { background-position: 0 0; } to { background-position: 200px 0; } }

  .container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 720px;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  :global(.card) {
    background: var(--bg-card);
    backdrop-filter: blur(12px); /* Glass blur effect */
    -webkit-backdrop-filter: blur(12px);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    overflow: hidden;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  }

  /* Floating particles */
  :global(.particles) {
    position: fixed;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  :global(.particle) {
    position: absolute;
    width: 1px;
    height: 1px;
    background: #6366f1;
    border-radius: 50%;
    opacity: 0;
    animation: twinkle 4s ease-in-out infinite;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0; transform: scale(0.5); }
    50% { opacity: 0.5; transform: scale(1.2); }
  }

  @media (max-width: 480px) {
    :global(body) {
      padding: 16px 12px;
    }
    .container {
      gap: 12px;
    }
    .side-badge {
      bottom: 12px;
      right: 12px;
    }
    .est-text {
      font-size: 0.5rem;
    }
    .est-year {
      font-size: 1.8rem;
    }
    .est-copy {
      font-size: 0.7rem;
    }
  }
</style>
