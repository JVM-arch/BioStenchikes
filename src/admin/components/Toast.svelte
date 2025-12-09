<script>
  import { toast } from '../stores/toast.js';
  import { fade } from 'svelte/transition';
  
  let toasts = [];
  
  toast.subscribe(value => {
    toasts = value;
  });
</script>

<div class="toast-container">
  {#each toasts as t (t.id)}
    <div class="toast toast-{t.type}" transition:fade>
      <div class="toast-icon">
        {#if t.type === 'success'}✓
        {:else if t.type === 'error'}✕
        {:else if t.type === 'warning'}⚠
        {:else}ℹ{/if}
      </div>
      <div class="toast-message">{t.message}</div>
      <button class="toast-close" on:click={() => toast.remove(t.id)}>×</button>
    </div>
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 12px;
    pointer-events: none;
  }
  
  .toast {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 18px;
    background: rgba(20, 20, 20, 0.95);
    border: 1px solid;
    border-radius: 12px;
    min-width: 300px;
    max-width: 400px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(20px);
    pointer-events: auto;
    animation: slideIn 300ms ease-out;
  }
  
  .toast-success {
    border-color: #10b981;
    background: rgba(16, 185, 129, 0.1);
  }
  
  .toast-error {
    border-color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
  }
  
  .toast-warning {
    border-color: #f59e0b;
    background: rgba(245, 158, 11, 0.1);
  }
  
  .toast-info {
    border-color: #06b6d4;
    background: rgba(6, 182, 212, 0.1);
  }
  
  .toast-icon {
    font-size: 20px;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  .toast-message {
    flex: 1;
    font-size: 14px;
    color: #ffffff;
  }
  
  .toast-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 200ms;
  }
  
  .toast-close:hover {
    color: #ffffff;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>

