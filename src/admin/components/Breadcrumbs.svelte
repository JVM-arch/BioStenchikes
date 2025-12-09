<script>
  export let items = [];
</script>

<nav class="breadcrumbs">
  {#each items as item, i}
    <span class="breadcrumb">
      {#if i > 0}<span class="separator">/</span>{/if}
      <a href="#" on:click|preventDefault>{item}</a>
    </span>
  {/each}
</nav>

<style>
  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
  }
  
  .breadcrumb a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: color 200ms;
  }
  
  .breadcrumb a:hover {
    color: #ffffff;
  }
  
  .separator {
    color: rgba(255, 255, 255, 0.3);
    margin: 0 8px;
  }
</style>

