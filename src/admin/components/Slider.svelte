<script>
  export let value = 50;
  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let label = '';
  export let unit = '';
  export let showValue = true;
  
  function handleInput(e) {
    value = parseFloat(e.target.value);
    dispatch('change', value);
  }
  
  function handleKeydown(e) {
    if (e.key === 'ArrowLeft') {
      value = Math.max(min, value - step);
      dispatch('change', value);
    } else if (e.key === 'ArrowRight') {
      value = Math.min(max, value + step);
      dispatch('change', value);
    }
  }
  
  $: percentage = ((value - min) / (max - min)) * 100;
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="slider-container">
  {#if label}
    <div class="slider-header">
      <label class="slider-label">{label}</label>
      {#if showValue}
        <span class="slider-value">{value}{unit}</span>
      {/if}
    </div>
  {/if}
  <div class="slider-wrapper">
    <input
      type="range"
      class="slider"
      min={min}
      max={max}
      step={step}
      value={value}
      on:input={handleInput}
      on:keydown={handleKeydown}
      style="--percentage: {percentage}%"
    />
    <div class="slider-range">
      <span class="slider-min">{min}{unit}</span>
      <span class="slider-max">{max}{unit}</span>
    </div>
  </div>
</div>

<style>
  .slider-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .slider-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .slider-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
  }
  
  .slider-value {
    font-size: 14px;
    color: #ffffff;
    font-weight: 600;
    font-family: 'JetBrains Mono', monospace;
  }
  
  .slider-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .slider {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.1);
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
  }
  
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3a7bef;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(58, 123, 239, 0.4);
    transition: all 200ms;
  }
  
  .slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(58, 123, 239, 0.6);
  }
  
  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3a7bef;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 8px rgba(58, 123, 239, 0.4);
    transition: all 200ms;
  }
  
  .slider::-moz-range-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(58, 123, 239, 0.6);
  }
  
  .slider::-moz-range-track {
    background: rgba(255, 255, 255, 0.1);
    height: 8px;
    border-radius: 4px;
  }
  
  .slider::-moz-range-progress {
    background: #3a7bef;
    height: 8px;
    border-radius: 4px;
  }
  
  .slider-range {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
  }
</style>

