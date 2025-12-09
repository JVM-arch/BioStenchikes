<script>
  export let label = '';
  export let type = 'text';
  export let value = '';
  export let placeholder = '';
  export let error = '';
  export let maxlength = null;
  
  function handleInput(e) {
    value = e.target.value;
    dispatch('change', value);
  }
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="form-input">
  {#if label}
    <label class="input-label">{label}</label>
  {/if}
  <input
    type={type}
    class="input"
    class:error
    value={value}
    placeholder={placeholder}
    maxlength={maxlength}
    on:input={handleInput}
  />
  {#if error}
    <span class="error-message">{error}</span>
  {/if}
</div>

<style>
  .form-input {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .input-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
  }
  
  .input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 12px 16px;
    color: #ffffff;
    font-size: 14px;
    outline: none;
    transition: all 200ms;
    font-family: inherit;
  }
  
  .input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  .input:focus {
    border-color: #3a7bef;
    box-shadow: 0 0 0 3px rgba(58, 123, 239, 0.1);
  }
  
  .input.error {
    border-color: #ef4444;
  }
  
  .error-message {
    font-size: 12px;
    color: #ef4444;
  }
</style>

