<script>
  export let tabs = [];
  export let activeTab = '';
  
  function handleTabClick(tabId) {
    dispatch('tabChange', tabId);
  }
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="tab-navigation">
  {#each tabs as tab}
    <button
      class="tab"
      class:active={activeTab === tab.id}
      on:click={() => handleTabClick(tab.id)}
    >
      {tab.label}
    </button>
  {/each}
</div>

<style>
  .tab-navigation {
    display: flex;
    gap: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    margin-bottom: 24px;
  }
  
  .tab {
    background: none;
    border: none;
    padding: 12px 20px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 200ms;
    position: relative;
    bottom: -1px;
  }
  
  .tab:hover {
    color: #ffffff;
  }
  
  .tab.active {
    color: #3a7bef;
    border-bottom-color: #3a7bef;
  }
</style>

