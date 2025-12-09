<script>
  export let open = false;
  export let title = '';
  export let size = 'medium'; // small, medium, large
  
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      close();
    }
  }
  
  import { createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  const dispatch = createEventDispatcher();
  
  function close() {
    open = false;
    dispatch('close');
  }
</script>

{#if open}
  <div class="modal-overlay" on:click={handleBackdropClick} transition:fade>
    <div class="modal modal-{size}" transition:scale>
      <div class="modal-header">
        <h3 class="modal-title">{title}</h3>
        <button class="modal-close" on:click={close}>×</button>
      </div>
      <div class="modal-content">
        <slot />
      </div>
      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(20px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  
  .modal {
    background: rgba(20, 20, 20, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(20px);
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .modal-small {
    width: 400px;
  }
  
  .modal-medium {
    width: 600px;
  }
  
  .modal-large {
    width: 900px;
  }
  
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .modal-title {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
  }
  
  .modal-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    font-size: 32px;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    transition: all 200ms;
  }
  
  .modal-close:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }
  
  .modal-content {
    padding: 24px;
    overflow-y: auto;
    flex: 1;
  }
  
  .modal-footer {
    padding: 20px 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }
  
  @media (max-width: 768px) {
    .modal {
      width: 100%;
      max-width: 100%;
      max-height: 100vh;
      border-radius: 0;
    }
  }
</style>

