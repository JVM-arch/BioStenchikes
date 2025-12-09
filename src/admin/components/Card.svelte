<script>
  export let title = '';
  export let subtitle = '';
</script>

<div class="card">
  {#if title || subtitle}
    <div class="card-header">
      {#if title}
        <h3 class="card-title">{title}</h3>
      {/if}
      {#if subtitle}
        <p class="card-subtitle">{subtitle}</p>
      {/if}
    </div>
  {/if}
  <div class="card-content">
    <slot />
  </div>
</div>

<style>
  .card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 24px;
    transition: all 200ms;
  }
  
  .card:hover {
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
  }
  
  .card-header {
    margin-bottom: 20px;
  }
  
  .card-title {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 4px 0;
  }
  
  .card-subtitle {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }
  
  .card-content {
    color: rgba(255, 255, 255, 0.8);
  }
</style>

