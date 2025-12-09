<script>
  import { onMount } from 'svelte';
  import Sidebar from './components/Sidebar.svelte';
  import Header from './components/Header.svelte';
  import Toast from './components/Toast.svelte';
  import { profileStore, loadProfile, saveProfile } from './stores/profile.js';
  import Appearance from './pages/Appearance.svelte';
  import Media from './pages/Media.svelte';
  import Box from './pages/Box.svelte';
  import Embeds from './pages/Embeds.svelte';
  import Badges from './pages/Badges.svelte';
  import Links from './pages/Links.svelte';
  import Tracks from './pages/Tracks.svelte';
  import EmbedShare from './pages/EmbedShare.svelte';
  import RevealScreen from './pages/RevealScreen.svelte';
  import Settings from './pages/Settings.svelte';
  
  let currentTab = 'appearance';
  let profile = {};
  let sidebarOpen = false;
  
  profileStore.subscribe(value => {
    profile = value;
  });
  
  onMount(() => {
    loadProfile();
    
    // Auto-save on changes
    const unsubscribe = profileStore.subscribe(value => {
      saveProfile(value);
    });
    
    return unsubscribe;
  });
  
  function handleTabChange(e) {
    currentTab = e.detail;
  }
  
  function getBreadcrumbs() {
    const crumbs = ['Admin', 'Profile'];
    if (currentTab !== 'appearance') {
      crumbs.push(currentTab.charAt(0).toUpperCase() + currentTab.slice(1));
    }
    return crumbs;
  }
  
  function getTitle() {
    const titles = {
      appearance: 'Appearance',
      media: 'Media',
      box: 'Box & Layout',
      embeds: 'Embeds',
      badges: 'Badges & Tags',
      links: 'Links',
      tracks: 'Tracks',
      'embed-share': 'Embed & Share',
      reveal: 'Reveal Screen',
      settings: 'Settings'
    };
    return titles[currentTab] || 'Admin Panel';
  }
</script>

<div class="admin-panel">
  <Sidebar
    currentTab={currentTab}
    {profile}
    on:tabChange={handleTabChange}
    on:logout={() => console.log('Logout')}
  />
  
  <div class="admin-content">
    <Header
      breadcrumbs={getBreadcrumbs()}
      title={getTitle()}
      {profile}
      on:logout={() => console.log('Logout')}
    />
    
    <main class="content-main">
      {#if currentTab === 'appearance'}
        <Appearance />
      {:else if currentTab === 'media'}
        <Media />
      {:else if currentTab === 'box'}
        <Box />
      {:else if currentTab === 'embeds'}
        <Embeds />
      {:else if currentTab === 'badges'}
        <Badges />
      {:else if currentTab === 'links'}
        <Links />
      {:else if currentTab === 'tracks'}
        <Tracks />
      {:else if currentTab === 'embed-share'}
        <EmbedShare />
      {:else if currentTab === 'reveal'}
        <RevealScreen />
      {:else if currentTab === 'settings'}
        <Settings />
      {/if}
    </main>
  </div>
  
  <Toast />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: #0f0f0f;
    color: #ffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .admin-panel {
    display: flex;
    min-height: 100vh;
    background: #0f0f0f;
  }
  
  .admin-content {
    flex: 1;
    margin-left: 280px;
    display: flex;
    flex-direction: column;
  }
  
  .content-main {
    margin-top: 64px;
    padding: 32px;
    max-width: 1400px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  
  .coming-soon {
    padding: 48px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 18px;
  }
  
  @media (max-width: 1024px) {
    .admin-content {
      margin-left: 0;
    }
    
    .content-main {
      padding: 24px 16px;
    }
  }
</style>

