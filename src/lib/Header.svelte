<script>
  import { onMount } from 'svelte';
  
  // Configurable sources (can be overridden by parent/admin panel)
  export let avatarSrc = '/src/assets/avatar.jpg';
  export let bannerSrc = '/src/assets/willow-banner.jpg';
  export let nickname = 'Stenchikes';
  export let tagline = 'VFX Artist & Developer';
  export let status = 'Online';
  export let nickAnim = 'glitch';
  export let avatarAnim = 'glow';
  export let taglineAnim = 'fade';
  export let socials = [];

  let showSmoke = false;
  let smokeParticles = [];

  function handleAvatarClick() {
    showSmoke = true;
    createSmokeParticles();
    setTimeout(() => {
      showSmoke = false;
    }, 3000);
  }

  function createSmokeParticles() {
    smokeParticles = [];
    for (let i = 0; i < 45; i++) {
      smokeParticles.push({
        id: i,
        left: 50 + (Math.random() - 0.5) * 15 + '%',
        top: 40 + Math.random() * 10 + '%', // Start from upper center (mouth area)
        delay: Math.random() * 0.8,
        duration: 2.8 + Math.random() * 1.8,
        size: 26 + Math.random() * 42,
        opacity: 0.35 + Math.random() * 0.45,
        drift: (Math.random() - 0.5) * 140,
        twist: (Math.random() - 0.5) * 40
      });
    }
  }
</script>

<div class="header-container">
  <!-- Banner -->
  <div class="banner">
    {#if /\.(mp4|webm)$/i.test(bannerSrc)}
      <video
        class="banner-content"
        src={bannerSrc}
        autoplay
        muted
        loop
        playsinline
      ></video>
    {:else}
      <div class="banner-content" style={`background-image: url(${bannerSrc});`}></div>
    {/if}
    <!-- Logo centered below banner -->
    <div class="logo-container">
      <div class="logo">👁</div>
    </div>
  </div>

  <!-- Avatar with smoke effect -->
  <div class={`avatar-wrapper anim-${avatarAnim}`}>
    <div class="avatar-placeholder" role="button" tabindex="0" on:click={handleAvatarClick} on:keydown={(e) => e.key === 'Enter' && handleAvatarClick()}>
      <img src={avatarSrc} alt="Avatar" class="avatar-image" />
      {#if showSmoke}
        <div class="smoke-container">
          {#each smokeParticles as particle}
            <div 
              class="smoke-particle"
              style="left: {particle.left}; top: {particle.top}; animation-delay: {particle.delay}s; animation-duration: {particle.duration}s; width: {particle.size}px; height: {particle.size}px; opacity: {particle.opacity}; --drift: {particle.drift}px; --twist: {particle.twist}deg;"
            ></div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- Info & Socials -->
  <div class="info-section">
    <h1 class={`nickname anim-${nickAnim}`} data-text={nickname}>
      {nickname}
    </h1>
    <p class={`tagline anim-${taglineAnim}`}>{tagline}</p>
    <p class="status">{status}</p>

    <!-- Social Icons -->
    {#if socials?.length}
      <div class="social-icons">
        {#each socials as social (social.label + social.url)}
          <a href={social.url} target="_blank" rel="noopener noreferrer" class="social-icon" aria-label={social.label}>
            <span>{social.label}</span>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .header-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-bottom: 20px;
  }

  .banner {
    width: 100%;
    height: 320px;
    border-radius: 16px;
    overflow: visible;
    position: relative;
    background: #111;
    border: 1px solid var(--border-color);
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    margin-bottom: 90px;
  }

  .banner-content {
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #0f0f0f, #1a1a1a);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    filter: contrast(1.05) saturate(1.1);
    object-fit: cover;
  }

  /* Logo centered below banner */
  .logo-container {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
  }

  .logo {
    font-size: 3rem;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(10, 10, 10, 0.9);
    border: 2px solid var(--border-color);
    border-radius: 50%;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    animation: pulse 3s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  /* Glitchy Banner Effect */
  .banner-content::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.7));
    mix-blend-mode: multiply;
    pointer-events: none;
  }

  .banner-content::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      repeating-linear-gradient(
        transparent 0,
        transparent 2px,
        rgba(99, 102, 241, 0.06) 3px,
        transparent 4px
      );
    background-size: 100% 4px;
    animation: scanline 8s linear infinite;
  }

  @keyframes scanline {
    0% { background-position: 0 0; }
    100% { background-position: 0 100%; }
  }

  /* Avatar with smoke effect */
  .avatar-wrapper {
    margin-top: -190px; /* Overlap banner more */
    z-index: 4;
    padding: 6px;
    background: var(--bg-primary);
    border-radius: 50%;
  }

  .avatar-placeholder {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    background: #0a0a0a;
    border: 3px solid #6366f1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: visible;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .avatar-placeholder:hover {
    transform: scale(1.05);
    box-shadow: 0 0 40px rgba(99, 102, 241, 0.6);
  }

  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .avatar-emoji {
    font-size: 60px;
  }

  .smoke-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10;
  }

  .smoke-particle {
    position: absolute;
    background:
      radial-gradient(circle at 30% 35%, rgba(215, 215, 215, 0.7) 0%, rgba(170, 170, 170, 0.38) 38%, transparent 70%),
      radial-gradient(circle at 70% 60%, rgba(185, 185, 185, 0.32) 0%, rgba(130, 130, 130, 0.18) 42%, transparent 75%);
    border-radius: 50%;
    animation: smokeRise linear forwards;
    filter: blur(11px) contrast(1.05) saturate(0.9);
    mix-blend-mode: screen;
    mask-image: radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.55) 55%, transparent 100%);
    backdrop-filter: blur(1px);
  }

  @keyframes smokeRise {
    0% {
      transform: translate(0, 0) scale(0.35) rotate(calc(var(--twist) * 0.1));
      opacity: 0.9;
    }
    30% {
      transform: translate(calc(var(--drift) * 0.3), -70px) scale(0.85) rotate(calc(var(--twist) * 0.4));
      opacity: 0.75;
    }
    60% {
      transform: translate(calc(var(--drift) * 0.7), -140px) scale(1.35) rotate(calc(var(--twist) * 0.7));
      opacity: 0.45;
    }
    100% {
      transform: translate(calc(var(--drift)), -220px) scale(1.85) rotate(calc(var(--twist)));
      opacity: 0;
    }
  }

  /* Info Section */
  .info-section {
    text-align: center;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .nickname {
    font-size: 2.2rem;
    font-weight: 800;
    color: var(--text-primary);
    position: relative;
    text-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    letter-spacing: -1px;
    margin: 0;
  }

  .nickname::before,
  .nickname::after {
    display: none;
  }

  .tagline {
    color: var(--text-secondary);
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  .status {
    color: #7be889;
    font-size: 0.85rem;
    letter-spacing: 0.6px;
    margin-top: -2px;
    opacity: 0.85;
  }

  /* Social Icons */
  .social-icons {
    display: flex;
    gap: 20px;
    margin-top: 16px;
  }

  .social-icon {
    min-width: 64px;
    height: 36px;
    padding: 0 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #fff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    filter: brightness(1.2);
    text-decoration: none;
    font-size: 0.78rem;
    letter-spacing: 0.3px;
  }

  .social-icon:hover {
    transform: translateY(-3px);
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow: 0 8px 24px rgba(0,0,0,0.35);
    background: rgba(255, 255, 255, 0.12);
  }

  /* Glitch Animations */
  @keyframes glitch {
    0%, 90%, 100% { transform: translateX(0); }
    92% { transform: translateX(-2px); }
    94% { transform: translateX(2px); }
    96% { transform: translateX(-1px); }
    98% { transform: translateX(1px); }
  }

  @keyframes glitchLeft {
    0%, 85%, 100% { transform: translateX(0); opacity: 0; }
    86% { transform: translateX(-4px); opacity: 0.8; }
    88% { transform: translateX(3px); opacity: 0.5; }
    90% { transform: translateX(-2px); opacity: 0; }
  }

  @keyframes glitchRight {
    0%, 80%, 100% { transform: translateX(0); opacity: 0; }
    82% { transform: translateX(4px); opacity: 0.8; }
    84% { transform: translateX(-3px); opacity: 0.5; }
    86% { transform: translateX(2px); opacity: 0; }
  }

  /* Animation palette (20 options) */
  .anim-none { animation: none !important; filter: none !important; }

  /* Nickname animations */
  .anim-pulse { animation: pulse 3s ease-in-out infinite; }
  .anim-glitch {
    animation: glitch 3s infinite;
  }
  .anim-glitch::before,
  .anim-glitch::after {
    display: block;
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  .anim-glitch::before {
    color: #ff0040;
    animation: glitchLeft 2s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    opacity: 0.7;
  }
  .anim-glitch::after {
    color: #00ffff;
    animation: glitchRight 2.5s infinite;
    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
    opacity: 0.7;
  }
  .anim-slide { animation: slideIn 2s ease both; }
  .anim-fade { animation: fadeIn 2.4s ease both; }
  .anim-rise { animation: rise 2s ease both; }
  .anim-neon { text-shadow: 0 0 12px #6a7bff, 0 0 24px #6a7bff; }
  .anim-bounce { animation: bounce 2s ease infinite; }
  .anim-tilt { animation: tilt 3s ease-in-out infinite; }
  .anim-blur { animation: blurIn 1.8s ease both; }
  .anim-pop { animation: pop 1.8s ease both; }
  .anim-wobble { animation: wobble 2.6s ease infinite; }
  .anim-flicker { animation: flicker 3s linear infinite; }
  .anim-scan { animation: scan 3s linear infinite; }
  .anim-wave { animation: wave 2.8s ease-in-out infinite; }
  .anim-spark { animation: spark 2.2s ease-in-out infinite; }
  .anim-shadow { text-shadow: 0 6px 18px rgba(0,0,0,0.55); }
  .anim-zoom { animation: zoom 2s ease both; }
  .anim-flow { animation: flow 3s ease-in-out infinite; }
  .anim-swirl { animation: swirl 2.6s ease-in-out infinite; }
  .anim-glow:not(.avatar-wrapper) { text-shadow: 0 0 12px rgba(99,102,241,0.6), 0 0 24px rgba(99,102,241,0.4); }
  .anim-highlight { background: linear-gradient(90deg, rgba(99,102,241,0.18), transparent); padding: 2px 6px; border-radius: 6px; }

  /* Avatar animations */
  .avatar-wrapper.anim-glow { animation: avatarGlow 3.2s ease-in-out infinite; box-shadow: 0 0 18px rgba(140, 170, 255, 0.28); }
  .anim-float { animation: float 4s ease-in-out infinite; }
  .anim-rotate { animation: rotate 6s linear infinite; }
  .anim-wiggle { animation: wiggle 2.4s ease infinite; }
  .anim-flip { animation: flip 3s ease-in-out infinite; }
  .anim-orbit { animation: orbit 5s linear infinite; }
  .anim-drift { animation: drift 5s ease-in-out infinite; }
  .anim-shimmer { animation: shimmer 2.4s ease-in-out infinite; }
  .anim-sway { animation: sway 3s ease-in-out infinite; }
  .anim-pulse.avatar-wrapper { animation: avatarPulse 3s ease-in-out infinite; }
  .anim-pop.avatar-wrapper { animation: pop 2s ease-in-out infinite; }
  .anim-bounce.avatar-wrapper { animation: bounce 2.4s ease infinite; }
  .anim-tilt.avatar-wrapper { animation: tilt 3s ease-in-out infinite; }
  .anim-spark.avatar-wrapper { box-shadow: 0 0 30px rgba(255,255,255,0.2); }
  .anim-zoom.avatar-wrapper { animation: zoom 2.2s ease-in-out infinite; }
  .anim-wave.avatar-wrapper { animation: wave 3s ease-in-out infinite; }
  .anim-flow.avatar-wrapper { animation: flow 3s ease-in-out infinite; }
  .anim-swirl.avatar-wrapper { animation: swirl 3s ease-in-out infinite; }
  .anim-flicker.avatar-wrapper { animation: flicker 3s linear infinite; }
  .anim-shadow.avatar-wrapper { box-shadow: 0 16px 40px rgba(0,0,0,0.55); }

  /* Tagline animations */
  .anim-type { animation: type 4s steps(40, end) 1 both; overflow: hidden; border-right: 2px solid rgba(255,255,255,0.5); }
  .anim-underline { position: relative; }
  .anim-underline::after {
    content: '';
    position: absolute;
    left: 0; bottom: -4px;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #6366f1, transparent);
    animation: scan 2s linear infinite;
  }
  .anim-highlight { background: linear-gradient(90deg, rgba(99,102,241,0.18), transparent); padding: 2px 6px; border-radius: 6px; }

  /* Keyframes */
  @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes rise { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes tilt { 0%,100% { transform: rotate(-1deg); } 50% { transform: rotate(1deg); } }
  @keyframes blurIn { from { filter: blur(12px); opacity: 0; } to { filter: blur(0); opacity: 1; } }
  @keyframes pop { 0% { transform: scale(0.94); opacity: 0; } 60% { transform: scale(1.04); opacity: 1; } 100% { transform: scale(1); } }
  @keyframes wobble { 0%,100% { transform: rotate(0); } 25% { transform: rotate(-2deg); } 75% { transform: rotate(2deg); } }
  @keyframes flicker { 0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; } 20%, 24%, 55% { opacity: 0.3; } }
  @keyframes scan { 0% { transform: translateX(-10%); opacity: 0.5; } 50% { opacity: 0.9; } 100% { transform: translateX(110%); opacity: 0.4; } }
  @keyframes wave { 0% { transform: translateY(0); } 50% { transform: translateY(-4px); } 100% { transform: translateY(0); } }
  @keyframes spark { 0%,100% { text-shadow: 0 0 6px rgba(255,255,255,0.5); } 50% { text-shadow: 0 0 16px rgba(99,102,241,0.8); } }
  @keyframes zoom { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  @keyframes flow { 0% { transform: translateX(0); } 50% { transform: translateX(3px); } 100% { transform: translateX(0); } }
  @keyframes swirl { 0% { transform: rotate(0deg); } 50% { transform: rotate(1deg); } 100% { transform: rotate(0deg); } }
  @keyframes avatarGlow { 0%,100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); } 50% { box-shadow: 0 0 36px rgba(99,102,241,0.6); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes rotate { to { transform: rotate(360deg); } }
  @keyframes wiggle { 0%,100% { transform: rotate(0); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } }
  @keyframes flip { 0% { transform: perspective(400px) rotateY(0); } 50% { transform: perspective(400px) rotateY(12deg); } 100% { transform: perspective(400px) rotateY(0); } }
  @keyframes orbit { 0% { transform: translateX(0); } 50% { transform: translateX(6px); } 100% { transform: translateX(0); } }
  @keyframes drift { 0% { transform: translate(0,0); } 50% { transform: translate(3px,-5px); } 100% { transform: translate(0,0); } }
  @keyframes shimmer { 0% { filter: brightness(1); } 50% { filter: brightness(1.15); } 100% { filter: brightness(1); } }
  @keyframes sway { 0% { transform: rotate(0); } 50% { transform: rotate(-2deg); } 100% { transform: rotate(0); } }
  @keyframes avatarPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  @keyframes type { from { width: 0; } to { width: 100%; } }
  @keyframes highlight { from { background-position: -100% 0; } to { background-position: 200% 0; } }
  @keyframes underline { from { transform: scaleX(0); } to { transform: scaleX(1); } }

  @media (max-width: 480px) {
    .banner {
      height: 140px;
    }
    .avatar-wrapper {
      margin-top: -50px;
    }
    .avatar-placeholder {
      width: 90px;
      height: 90px;
      font-size: 32px;
    }
    .nickname {
      font-size: 1.8rem;
    }
  }
</style>
