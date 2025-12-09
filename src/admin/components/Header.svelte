<script>
  export let breadcrumbs = [];
  export let title = '';
  export let profile = {};
  
  let searchValue = '';
  let showUserMenu = false;
  
  function handleSearch(e) {
    searchValue = e.target.value;
    dispatch('search', searchValue);
  }
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<header class="admin-header">
  <div class="header-left">
    <nav class="breadcrumbs">
      {#each breadcrumbs as crumb, i}
        <span class="breadcrumb">
          {#if i > 0}<span class="separator">/</span>{/if}
          <a href="#" on:click|preventDefault={() => dispatch('breadcrumb', crumb)}>{crumb}</a>
        </span>
      {/each}
    </nav>
  </div>
  
  <div class="header-center">
    <h1 class="header-title">{title}</h1>
  </div>
  
  <div class="header-right">
    <div class="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        on:input={handleSearch}
        class="search-input"
      />
      <span class="search-icon">🔍</span>
    </div>
    
    <button class="notifications-btn" aria-label="Notifications">
      🔔
    </button>
    
    <div class="user-menu-wrapper">
      <button
        class="user-menu-trigger"
        on:click={() => showUserMenu = !showUserMenu}
      >
        <img
          src={profile.avatarSrc || '/src/assets/avatar.jpg'}
          alt="User"
          class="user-avatar-small"
        />
      </button>
      
      {#if showUserMenu}
        <div class="user-menu">
          <a href="#" class="menu-item">Profile</a>
          <a href="#" class="menu-item">Settings</a>
          <div class="menu-divider"></div>
          <a href="#" class="menu-item" on:click|preventDefault={() => dispatch('logout')}>Logout</a>
        </div>
      {/if}
    </div>
  </div>
</header>

<style>
  .admin-header {
    position: fixed;
    top: 0;
    left: 280px;
    right: 0;
    height: 64px;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    z-index: 90;
  }
  
  .header-left {
    flex: 1;
  }
  
  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
  }
  
  .breadcrumb {
    display: flex;
    align-items: center;
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
  
  .header-center {
    flex: 1;
    text-align: center;
  }
  
  .header-title {
    font-size: 20px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
  }
  
  .header-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
  }
  
  .search-bar {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .search-input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 8px 36px 8px 16px;
    color: #ffffff;
    font-size: 14px;
    width: 240px;
    outline: none;
    transition: all 200ms;
  }
  
  .search-input:focus {
    border-color: #3a7bef;
    box-shadow: 0 0 0 3px rgba(58, 123, 239, 0.1);
  }
  
  .search-icon {
    position: absolute;
    right: 12px;
    pointer-events: none;
    opacity: 0.6;
  }
  
  .notifications-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: background 200ms;
  }
  
  .notifications-btn:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .user-menu-wrapper {
    position: relative;
  }
  
  .user-menu-trigger {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  
  .user-avatar-small {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.1);
  }
  
  .user-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: rgba(20, 20, 20, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 8px;
    min-width: 180px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(20px);
  }
  
  .menu-item {
    display: block;
    padding: 10px 16px;
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    border-radius: 8px;
    transition: all 200ms;
    font-size: 14px;
  }
  
  .menu-item:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
  }
  
  .menu-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
    margin: 8px 0;
  }
  
  @media (max-width: 1024px) {
    .admin-header {
      left: 0;
    }
    
    .search-input {
      width: 180px;
    }
  }
</style>

