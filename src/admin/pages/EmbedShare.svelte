<script>
  import TabNavigation from '../components/TabNavigation.svelte';
  import Card from '../components/Card.svelte';
  import FormInput from '../components/FormInput.svelte';
  import ColorPicker from '../components/ColorPicker.svelte';
  import Toggle from '../components/Toggle.svelte';
  import { profileStore } from '../stores/profile.js';
  import { toast } from '../stores/toast.js';
  
  let activeSubTab = 'embed';
  let profile = {};
  let embedCode = '';
  let embedSettings = {
    showUsername: true,
    showAvatar: true,
    showBadges: true,
    showTags: true,
    showLinks: true,
    showTracks: true,
    theme: 'Dark',
    width: 400,
    height: 800
  };
  
  profileStore.subscribe(value => {
    profile = value;
    generateEmbedCode();
  });
  
  const subTabs = [
    { id: 'embed', label: 'Profile Embed' },
    { id: 'customize', label: 'Customize Embed' },
    { id: 'preview', label: 'Preview' }
  ];
  
  const themeOptions = [
    { value: 'Dark', label: 'Dark' },
    { value: 'Light', label: 'Light' },
    { value: 'Auto', label: 'Auto' }
  ];
  
  function generateEmbedCode() {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      username: embedSettings.showUsername ? '1' : '0',
      avatar: embedSettings.showAvatar ? '1' : '0',
      badges: embedSettings.showBadges ? '1' : '0',
      tags: embedSettings.showTags ? '1' : '0',
      links: embedSettings.showLinks ? '1' : '0',
      tracks: embedSettings.showTracks ? '1' : '0',
      theme: embedSettings.theme.toLowerCase(),
      width: embedSettings.width,
      height: embedSettings.height
    });
    
    embedCode = `<iframe src="${baseUrl}/embed?${params.toString()}" width="${embedSettings.width}" height="${embedSettings.height}" frameborder="0" allowtransparency="true"></iframe>`;
  }
  
  function copyCode() {
    navigator.clipboard.writeText(embedCode);
    toast.success('Code copied to clipboard!');
  }
  
  function viewEmbed() {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      username: embedSettings.showUsername ? '1' : '0',
      avatar: embedSettings.showAvatar ? '1' : '0',
      badges: embedSettings.showBadges ? '1' : '0',
      tags: embedSettings.showTags ? '1' : '0',
      links: embedSettings.showLinks ? '1' : '0',
      tracks: embedSettings.showTracks ? '1' : '0',
      theme: embedSettings.theme.toLowerCase(),
      width: embedSettings.width,
      height: embedSettings.height
    });
    window.open(`${baseUrl}/embed?${params.toString()}`, '_blank');
  }
  
  $: generateEmbedCode();
</script>

<div class="embed-share-page">
  <TabNavigation tabs={subTabs} activeTab={activeSubTab} on:tabChange={(e) => activeSubTab = e.detail} />
  
  {#if activeSubTab === 'embed'}
    <Card title="Profile Embed Code">
      <label class="code-label">Embed Code</label>
      <textarea
        class="embed-code"
        readonly
        value={embedCode}
        rows="6"
      ></textarea>
      <div class="code-actions">
        <button class="btn-primary" on:click={copyCode}>
          📋 Copy Code
        </button>
        <button class="btn-secondary" on:click={viewEmbed}>
          👁️ View Embed
        </button>
      </div>
      <p class="code-hint">
        Copy this code and paste it into your website's HTML to embed your profile.
      </p>
    </Card>
    
  {:else if activeSubTab === 'customize'}
    <div class="grid">
      <Card title="Display Options">
        <Toggle
          label="Show Username"
          value={embedSettings.showUsername}
          on:change={(e) => { embedSettings.showUsername = e.detail; generateEmbedCode(); }}
        />
        <Toggle
          label="Show Avatar"
          value={embedSettings.showAvatar}
          on:change={(e) => { embedSettings.showAvatar = e.detail; generateEmbedCode(); }}
        />
        <Toggle
          label="Show Badges"
          value={embedSettings.showBadges}
          on:change={(e) => { embedSettings.showBadges = e.detail; generateEmbedCode(); }}
        />
        <Toggle
          label="Show Tags"
          value={embedSettings.showTags}
          on:change={(e) => { embedSettings.showTags = e.detail; generateEmbedCode(); }}
        />
        <Toggle
          label="Show Links"
          value={embedSettings.showLinks}
          on:change={(e) => { embedSettings.showLinks = e.detail; generateEmbedCode(); }}
        />
        <Toggle
          label="Show Tracks"
          value={embedSettings.showTracks}
          on:change={(e) => { embedSettings.showTracks = e.detail; generateEmbedCode(); }}
        />
      </Card>
      
      <Card title="Appearance">
        <Dropdown
          label="Theme"
          value={embedSettings.theme}
          options={themeOptions}
          on:change={(e) => { embedSettings.theme = e.detail; generateEmbedCode(); }}
        />
        <FormInput
          label="Width"
          type="number"
          value={embedSettings.width}
          on:change={(e) => { embedSettings.width = parseInt(e.detail) || 400; generateEmbedCode(); }}
          placeholder="400"
        />
        <FormInput
          label="Height"
          type="number"
          value={embedSettings.height}
          on:change={(e) => { embedSettings.height = parseInt(e.detail) || 800; generateEmbedCode(); }}
          placeholder="800"
        />
      </Card>
    </div>
    
  {:else if activeSubTab === 'preview'}
    <Card title="Live Preview">
      <div class="embed-preview-container">
        <iframe
          src="/embed?username={embedSettings.showUsername ? '1' : '0'}&avatar={embedSettings.showAvatar ? '1' : '0'}&badges={embedSettings.showBadges ? '1' : '0'}&tags={embedSettings.showTags ? '1' : '0'}&links={embedSettings.showLinks ? '1' : '0'}&tracks={embedSettings.showTracks ? '1' : '0'}&theme={embedSettings.theme.toLowerCase()}&width={embedSettings.width}&height={embedSettings.height}"
          width={embedSettings.width}
          height={embedSettings.height}
          frameborder="0"
          class="embed-preview-frame"
        ></iframe>
      </div>
      <p class="preview-hint">
        This is how your embedded profile will look on other websites.
      </p>
    </Card>
  {/if}
</div>

<style>
  .embed-share-page {
    padding: 24px 0;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 24px;
  }
  
  .code-label {
    display: block;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .embed-code {
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 16px;
    color: #ffffff;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    resize: vertical;
    outline: none;
  }
  
  .code-actions {
    display: flex;
    gap: 12px;
    margin-top: 16px;
  }
  
  .code-hint {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 16px;
  }
  
  .embed-preview-container {
    display: flex;
    justify-content: center;
    padding: 24px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    overflow: auto;
  }
  
  .embed-preview-frame {
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  
  .preview-hint {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 16px;
    text-align: center;
  }
</style>

