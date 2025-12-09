<script>
  export let value = '#3a7bef';
  export let label = '';
  export let showPresets = true;
  
  const presets = [
    '#3a7bef', '#ef4444', '#10b981', '#f59e0b',
    '#8b5cf6', '#ec4899', '#06b6d4', '#ffffff'
  ];
  
  function handleInput(e) {
    value = e.target.value;
    dispatch('change', value);
  }
  
  function handlePresetClick(color) {
    value = color;
    dispatch('change', value);
  }
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="color-picker">
  {#if label}
    <label class="color-label">{label}</label>
  {/if}
  <div class="color-picker-row">
    <div class="color-square" style="background-color: {value};" />
    <input
      type="text"
      class="color-hex"
      value={value}
      on:input={handleInput}
      placeholder="#000000"
      maxlength="7"
    />
    <input
      type="color"
      class="color-input"
      value={value}
      on:input={handleInput}
    />
  </div>
  {#if showPresets}
    <div class="color-presets">
      {#each presets as preset}
        <button
          class="color-preset"
          style="background-color: {preset};"
          on:click={() => handlePresetClick(preset)}
          class:active={preset === value}
        />
      {/each}
    </div>
  {/if}
</div>

<style>
  .color-picker {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .color-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
  }
  
  .color-picker-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .color-square {
    width: 120px;
    height: 120px;
    border-radius: 12px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    flex-shrink: 0;
  }
  
  .color-hex {
    flex: 1;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 12px 16px;
    color: #ffffff;
    font-size: 14px;
    font-family: 'JetBrains Mono', monospace;
    outline: none;
    transition: all 200ms;
  }
  
  .color-hex:focus {
    border-color: #3a7bef;
    box-shadow: 0 0 0 3px rgba(58, 123, 239, 0.1);
  }
  
  .color-input {
    width: 60px;
    height: 60px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    cursor: pointer;
    background: none;
    padding: 0;
  }
  
  .color-presets {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  
  .color-preset {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: all 200ms;
    padding: 0;
  }
  
  .color-preset:hover {
    transform: scale(1.1);
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  .color-preset.active {
    border-color: #3a7bef;
    box-shadow: 0 0 0 2px rgba(58, 123, 239, 0.3);
  }
</style>

