<script>
  export let label = '';
  export let value = '';
  export let options = [];
  export let placeholder = 'Select...';
  
  let open = false;
  
  function toggle() {
    open = !open;
  }
  
  function select(option) {
    value = option.value;
    open = false;
    dispatch('change', value);
  }
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  function handleClickOutside(node) {
    function handleClick(event) {
      if (!node.contains(event.target)) {
        open = false;
      }
    }
    document.addEventListener('click', handleClick);
    return {
      destroy() {
        document.removeEventListener('click', handleClick);
      }
    };
  }
  
  $: selectedLabel = options.find(o => o.value === value)?.label || placeholder;
</script>

<div class="dropdown" use:handleClickOutside>
  {#if label}
    <label class="dropdown-label">{label}</label>
  {/if}
  <button class="dropdown-trigger" class:open on:click={toggle}>
    <span class="dropdown-value">{selectedLabel}</span>
    <span class="dropdown-chevron" class:open>▼</span>
  </button>
  {#if open}
    <div class="dropdown-menu">
      {#each options as option}
        <button
          class="dropdown-option"
          class:active={value === option.value}
          on:click={() => select(option)}
        >
          {#if option.icon}
            <span class="option-icon">{option.icon}</span>
          {/if}
          <span class="option-label">{option.label}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .dropdown {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .dropdown-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
  }
  
  .dropdown-trigger {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 12px 16px;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 200ms;
    text-align: left;
  }
  
  .dropdown-trigger:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  .dropdown-trigger.open {
    border-color: #3a7bef;
    box-shadow: 0 0 0 3px rgba(58, 123, 239, 0.1);
  }
  
  .dropdown-value {
    flex: 1;
  }
  
  .dropdown-chevron {
    transition: transform 200ms;
    font-size: 12px;
    opacity: 0.6;
  }
  
  .dropdown-chevron.open {
    transform: rotate(180deg);
  }
  
  .dropdown-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: rgba(20, 20, 20, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 8px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(20px);
    animation: fadeIn 200ms;
  }
  
  .dropdown-option {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    border-radius: 8px;
    transition: all 200ms;
    text-align: left;
    font-size: 14px;
  }
  
  .dropdown-option:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
  }
  
  .dropdown-option.active {
    background: rgba(58, 123, 239, 0.2);
    color: #3a7bef;
  }
  
  .option-icon {
    font-size: 18px;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

