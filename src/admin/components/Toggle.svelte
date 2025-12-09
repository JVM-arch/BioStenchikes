<script>
  export let value = false;
  export let label = '';
  
  function toggle() {
    value = !value;
    dispatch('change', value);
  }
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="toggle-container">
  {#if label}
    <label class="toggle-label">{label}</label>
  {/if}
  <button
    class="toggle"
    class:active={value}
    on:click={toggle}
    role="switch"
    aria-checked={value}
  >
    <span class="toggle-thumb"></span>
  </button>
</div>

<style>
  .toggle-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  
  .toggle-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
  }
  
  .toggle {
    width: 48px;
    height: 28px;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 14px;
    cursor: pointer;
    padding: 2px;
    transition: all 250ms;
    position: relative;
  }
  
  .toggle.active {
    background: #3a7bef;
  }
  
  .toggle-thumb {
    display: block;
    width: 24px;
    height: 24px;
    background: #ffffff;
    border-radius: 50%;
    transition: transform 250ms;
    transform: translateX(0);
  }
  
  .toggle.active .toggle-thumb {
    transform: translateX(20px);
  }
</style>

