<script>
  import { onMount } from 'svelte';

  let snowflakes = [];

  onMount(() => {
    // Create 50 snowflakes
    snowflakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      animationDuration: Math.random() * 3 + 2 + 's', // 2-5s
      animationDelay: Math.random() * 5 + 's',
      opacity: Math.random() * 0.5 + 0.3,
      size: Math.random() * 5 + 2 + 'px'
    }));
  });
</script>

<div class="snow-container">
  {#each snowflakes as flake (flake.id)}
    <div
      class="snowflake"
      style="
        left: {flake.left};
        animation-duration: {flake.animationDuration};
        animation-delay: {flake.animationDelay};
        opacity: {flake.opacity};
        width: {flake.size};
        height: {flake.size};
      "
    ></div>
  {/each}
</div>

<style>
  .snow-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0; /* Behind content */
    overflow: hidden;
  }

  .snowflake {
    position: absolute;
    top: -10px;
    background: white;
    border-radius: 50%;
    filter: blur(1px);
    animation: fall linear infinite;
  }

  @keyframes fall {
    0% {
      transform: translateY(-10px) translateX(0);
    }
    100% {
      transform: translateY(100vh) translateX(20px);
    }
  }
</style>
