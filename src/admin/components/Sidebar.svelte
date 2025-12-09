<script>
  export let currentTab = 'appearance';
  export let profile = {};
  
  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'media', label: 'Media', icon: '🖼️' },
    { id: 'box', label: 'Box & Layout', icon: '📦' },
    { id: 'embeds', label: 'Embeds', icon: '🔗' },
    { id: 'badges', label: 'Badges & Tags', icon: '🏷️' },
    { id: 'links', label: 'Links', icon: '🔗' },
    { id: 'tracks', label: 'Tracks', icon: '🎵' },
    { id: 'embed-share', label: 'Embed & Share', icon: '📤' },
    { id: 'reveal', label: 'Reveal Screen', icon: '👁️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];
  
  const footerLinks = [
    { id: 'help', label: 'Help', icon: '❓' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'logout', label: 'Logout', icon: '🚪' }
  ];
  
  function handleTabClick(tabId) {
    dispatch('tabChange', tabId);
  }
  
  function handleFooterClick(linkId) {
    if (linkId === 'logout') {
      if (confirm('Are you sure you want to logout?')) {
        dispatch('logout');
      }
    } else {
      dispatch('footerClick', linkId);
    }
  }
  
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  $: statusColor = profile.status === 'Online' ? '#10b981' 
    : profile.status === 'Away' ? '#f59e0b' 
    : '#ef4444';
</script>

<div class="sidebar">
  <div class="sidebar-header">
    <div class="user-block">
      <img src={profile.avatarSrc || '/src/assets/avatar.jpg'} alt="Avatar" class="user-avatar" />
      <div class="user-info">
        <div class="user-name">{profile.nickname || 'User'}</div>
        <div class="user-status">
          <span class="status-dot" style="background-color: {statusColor};"></span>
          {profile.status || 'Online'}
        </div>
      </div>
    </div>
  </div>
  
  <nav class="sidebar-nav">
    {#each tabs as tab}
      <button
        class="nav-item"
        class:active={currentTab === tab.id}
        on:click={() => handleTabClick(tab.id)}
      >
        <span class="nav-icon">{tab.icon}</span>
        <span class="nav-label">{tab.label}</span>
      </button>
    {/each}
  </nav>
  
  <div class="sidebar-footer">
    {#each footerLinks as link}
      <button class="footer-link" on:click={() => handleFooterClick(link.id)}>
        <span>{link.icon}</span>
        <span>{link.label}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .sidebar {
    width: 280px;
    height: 100vh;
    background: linear-gradient(180deg, #1a1a1a 0%, #141414 100%);
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  }
  
  .sidebar-header {
    padding: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .user-block {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.1);
  }
  
  .user-info {
    flex: 1;
  }
  
  .user-name {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 4px;
  }
  
  .user-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }
  
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  
  .sidebar-nav {
    flex: 1;
    padding: 16px 0;
    overflow-y: auto;
  }
  
  .nav-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 24px;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    transition: all 200ms;
    text-align: left;
    border-left: 4px solid transparent;
  }
  
  .nav-item:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
  }
  
  .nav-item.active {
    background: rgba(58, 123, 239, 0.1);
    color: #3a7bef;
    border-left-color: #3a7bef;
  }
  
  .nav-icon {
    font-size: 20px;
  }
  
  .nav-label {
    font-size: 14px;
    font-weight: 500;
  }
  
  .sidebar-footer {
    padding: 16px 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .footer-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
    border-radius: 8px;
    transition: all 200ms;
    text-align: left;
    font-size: 14px;
  }
  
  .footer-link:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
  }
  
  @media (max-width: 1024px) {
    .sidebar {
      transform: translateX(-100%);
      transition: transform 300ms;
    }
    
    .sidebar.open {
      transform: translateX(0);
    }
  }
</style>

